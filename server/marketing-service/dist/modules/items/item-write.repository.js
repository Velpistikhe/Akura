"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemWriteRepository = void 0;
const quotation_price_js_1 = require("./quotation-price.js");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const contract_history_js_1 = require("../contracts/contract-history.js");
const companyAudit_js_1 = require("../../utils/companyAudit.js");
const catalogAudit_js_1 = require("../../utils/catalogAudit.js");
const item_schemas_js_1 = require("./item.schemas.js");
// One shared lock order for catalog writes and company revision/copy operations.
const write = (branch, action) => db_js_1.prisma.$transaction(async (tx) => {
    await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
    return action(tx);
}, { maxWait: 10000, timeout: 20000 }).catch(error => {
    if (error?.code === 'P2002')
        throw new httpError_js_1.HttpError('An active item, size or price with this key already exists', 409);
    if (error?.code === 'P2025' || error?.code === 'P2034')
        throw new httpError_js_1.HttpError('Data has changed; reload before retrying', 409);
    throw error;
});
const createdBy = (actor) => ({ createdById: actor.id, createdByName: actor.name });
const updatedBy = (actor) => ({ updatedById: actor.id, updatedByName: actor.name, version: { increment: 1 } });
const contractUpdatedBy = (actor) => ({ updatedById: actor.id, version: { increment: 1 } });
const delegates = { ITEM: 'item', ITEM_SIZE: 'itemSize', ITEM_PRICE: 'itemPrice', COMPANY_CONTRACT_PRICE: 'companyContractPrice', COMPANY_CONTRACT: 'companyContract' };
const change = async (tx, branch, entity, before, data, actor, action = 'UPDATE', afterExtra) => {
    const delegate = tx[delegates[entity]];
    const after = await delegate.update({ where: { id: before.id, version: before.version }, data: {
            ...data, ...(entity === 'COMPANY_CONTRACT' ? contractUpdatedBy(actor) : updatedBy(actor)),
        } });
    await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, entity, before, afterExtra ? { ...after, ...afterExtra } : after, actor, action);
    if (entity === 'COMPANY_CONTRACT')
        await (0, contract_history_js_1.recordContractHistory)(tx, before, after, actor, action);
    return after;
};
const itemInBranch = async (tx, id, branch, allowInactiveService = false) => {
    const item = await tx.item.findFirst({ where: { id, officeBranchId: branch }, include: { service: true } });
    if (!item)
        throw new httpError_js_1.HttpError('Item not found', 404);
    if (item.service && item.service.officeBranchId !== branch)
        throw new httpError_js_1.HttpError('Service does not belong to the current branch', 404);
    // A service change may rescue an item whose service was already deactivated.
    if (item.service && !item.service.isActive && !allowInactiveService)
        throw new httpError_js_1.HttpError('Service is inactive', 409);
    if (!item.isActive)
        throw new httpError_js_1.HttpError('Item is inactive', 409);
    return item;
};
const sizeInBranch = async (tx, id, branch) => {
    const size = await tx.itemSize.findFirst({ where: { id, item: { officeBranchId: branch } } });
    if (!size)
        throw new httpError_js_1.HttpError('Item size not found', 404);
    const item = await itemInBranch(tx, size.itemId, branch);
    if (!size.isActive)
        throw new httpError_js_1.HttpError('Item size is inactive', 409);
    return { size, item };
};
const standardPrices = (input, hasMaintenance) => {
    const parsed = item_schemas_js_1.createItemPriceSchema.safeParse(input);
    if (!parsed.success)
        throw new httpError_js_1.HttpError('Primary service price is required and all prices must be nonnegative with at most two decimals', 400);
    if (hasMaintenance && (input.priceMaintenancePrimary == null || input.priceMaintenanceSisterCompany == null)) {
        throw new httpError_js_1.HttpError('Both maintenance prices are required for a service with maintenance', 400);
    }
    return { ...parsed.data, priceServiceSisterCompany: parsed.data.priceServiceSisterCompany ?? null, priceMaintenancePrimary: parsed.data.priceMaintenancePrimary ?? null, priceMaintenanceSisterCompany: parsed.data.priceMaintenanceSisterCompany ?? null };
};
const contractInBranch = async (tx, id, branch, actor) => {
    const contract = await tx.companyContract.findFirst({ where: {
            id,
            isDeleted: false,
            status: { in: ['DRAFT', 'REJECTED', 'SUBMITTED', 'APPROVED'] },
            company: { officeBranchId: branch, revoked: false },
        } });
    if (!contract)
        throw new httpError_js_1.HttpError('Only DRAFT, REJECTED, SUBMITTED or APPROVED contracts can receive or remove prices', 409);
    if (contract.status === 'SUBMITTED' || contract.status === 'APPROVED') {
        if (actor.role !== 'ADMIN' || actor.section !== 'MARKETING')
            throw new httpError_js_1.HttpError('ADMIN role with MARKETING section is required for this contract status', 403);
    }
    else if (actor.section !== 'MARKETING') {
        throw new httpError_js_1.HttpError('Marketing section is required', 403);
    }
    return contract;
};
const contractPrices = (input, hasMaintenance) => {
    const parsed = item_schemas_js_1.createContractPriceSchema.safeParse(input);
    if (!parsed.success)
        throw new httpError_js_1.HttpError('Contract service price is required and prices must be nonnegative with at most two decimals', 400);
    if (hasMaintenance && input.priceMaintenance == null)
        throw new httpError_js_1.HttpError('Contract maintenance price is required', 400);
    return parsed.data;
};
const bumpItem = async (tx, branch, item, actor) => {
    const { service, ...row } = item;
    return change(tx, branch, 'ITEM', row, {}, actor, 'CHILD_UPDATE');
};
const bumpSize = async (tx, branch, size, item, actor) => {
    await change(tx, branch, 'ITEM_SIZE', size, {}, actor, 'PRICE_UPDATE');
    await bumpItem(tx, branch, item, actor);
};
const insertSize = async (tx, branch, item, input, actor) => {
    const { size, priceServicePrimary, priceServiceSisterCompany, priceMaintenancePrimary, priceMaintenanceSisterCompany } = input;
    // Keep direct-price items separate from items with named sizes. Retain this
    // distinction after soft deletion so removing a variant cannot bypass it.
    if (await tx.itemSize.findFirst({ where: { itemId: item.id, size: null, isActive: true } })) {
        throw new httpError_js_1.HttpError('This item uses direct pricing and cannot have additional sizes', 409);
    }
    if (size === null && await tx.itemSize.findFirst({ where: { itemId: item.id, size: { not: null }, isActive: true } })) {
        throw new httpError_js_1.HttpError('An item with named sizes cannot use direct pricing', 409);
    }
    // Empty key is reserved for the single active variant without a size.
    // Named sizes are normalized nonempty strings; null keys release inactive variants.
    const activeKey = size === null ? '' : (0, item_schemas_js_1.referenceKey)(size);
    if (await tx.itemSize.findFirst({ where: { itemId: item.id, isActive: true, OR: [{ activeKey }, { size: { equals: size, mode: 'insensitive' } }] } }))
        throw new httpError_js_1.HttpError('Item size already exists', 409);
    const latest = await tx.itemSize.findFirst({ where: { itemId: item.id, size }, orderBy: { effectiveFrom: 'desc' } });
    const effectiveFrom = new Date(Math.max(Date.now(), latest ? latest.effectiveFrom.getTime() + 1 : 0));
    const row = await tx.itemSize.create({ data: { itemId: item.id, size, activeKey, effectiveFrom, ...createdBy(actor) } });
    await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'ITEM_SIZE', null, row, actor, 'CREATE');
    const hasPrice = priceServicePrimary !== undefined
        || priceServiceSisterCompany !== undefined
        || priceMaintenancePrimary !== undefined
        || priceMaintenanceSisterCompany !== undefined;
    let price = null;
    if (hasPrice) {
        const prices = standardPrices({
            priceServicePrimary,
            priceServiceSisterCompany,
            priceMaintenancePrimary,
            priceMaintenanceSisterCompany,
        }, item.service?.hasMaintenance ?? false);
        price = await tx.itemPrice.create({ data: { itemSizeId: row.id, ...prices, ...createdBy(actor) } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'ITEM_PRICE', null, price, actor, 'CREATE');
    }
    return { ...row, price };
};
// The branch transaction lock also covers contract/Excel writers. Read once, mutate in
// batches, and append one immutable snapshot per changed row in the same transaction.
const closeSizes = async (tx, branch, sizes, actor) => {
    if (!sizes.length)
        return;
    const ids = sizes.map(size => size.id);
    const prices = await tx.itemPrice.findMany({ where: { itemSizeId: { in: ids }, isActive: true } });
    const changedAt = new Date(Math.max(Date.now(), ...[...sizes, ...prices].map(row => row.effectiveFrom.getTime())));
    const metadata = { updatedAt: changedAt, updatedById: actor.id, updatedByName: actor.name };
    const closed = { ...metadata, isActive: false, effectiveUntil: changedAt };
    const rows = (entityType, before, updates, action) => before.map(row => ({
        officeBranchId: branch, entityType, entityId: row.id, version: row.version + 1, action,
        before: JSON.parse(JSON.stringify(row)), after: JSON.parse(JSON.stringify({ ...row, ...updates, version: row.version + 1 })),
        createdById: actor.id, createdByName: actor.name,
    }));
    await tx.itemPrice.updateMany({ where: { id: { in: prices.map(price => price.id) } }, data: { ...closed, version: { increment: 1 } } });
    await tx.itemSize.updateMany({ where: { id: { in: ids } }, data: { ...closed, activeKey: null, version: { increment: 1 } } });
    const audits = [
        ...rows('ITEM_PRICE', prices, closed, 'DEACTIVATE'),
        ...rows('ITEM_SIZE', sizes, { ...closed, activeKey: null }, 'DEACTIVATE'),
    ];
    // Bound each insert's parameter count for large catalogs.
    for (let offset = 0; offset < audits.length; offset += 500)
        await tx.catalogAuditLog.createMany({ data: audits.slice(offset, offset + 500) });
};
const createContract = async (tx, id, data, branch, actor) => {
    const { size, item } = await sizeInBranch(tx, id, branch);
    const contract = await contractInBranch(tx, data.contractId, branch, actor);
    const prices = contractPrices(data, item.service?.hasMaintenance ?? false);
    const existing = await tx.companyContractPrice.findUnique({ where: { contractId_itemSizeId: { contractId: data.contractId, itemSizeId: id } } });
    if (existing?.isActive)
        throw new httpError_js_1.HttpError('An active contract price already exists for this item', 409);
    const result = existing
        ? await change(tx, branch, 'COMPANY_CONTRACT_PRICE', existing, {
            ...prices,
            isActive: true,
            effectiveUntil: null,
            effectiveFrom: new Date(),
        }, actor, 'REACTIVATE')
        : await tx.companyContractPrice.create({ data: { itemSizeId: id, ...prices, catalogSnapshot: (0, quotation_price_js_1.catalogSnapshot)({ ...size, item }), ...createdBy(actor) } });
    if (!existing)
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT_PRICE', null, result, actor, 'CREATE');
    await change(tx, branch, 'COMPANY_CONTRACT', contract, {}, actor, 'PRICE_UPDATE');
    await bumpSize(tx, branch, size, item, actor);
    return result;
};
const changeContract = async (tx, id, data, branch, actor, remove = false) => {
    const before = await tx.companyContractPrice.findFirst({ where: { id, contract: { company: { officeBranchId: branch, revoked: false } } } });
    if (!before)
        throw new httpError_js_1.HttpError('Contract price not found', 404);
    const { size, item } = await sizeInBranch(tx, before.itemSizeId, branch);
    (0, catalogAudit_js_1.requireCatalogVersion)(before, data.version);
    const contract = await contractInBranch(tx, before.contractId, branch, actor);
    const prices = remove ? {} : contractPrices({
        contractId: before.contractId,
        priceService: data.priceService ?? before.priceService.toString(),
        priceMaintenance: data.priceMaintenance === undefined ? before.priceMaintenance?.toString() ?? null : data.priceMaintenance,
    }, item.service?.hasMaintenance ?? false);
    const active = remove ? false : data.isActive ?? before.isActive;
    const result = await change(tx, branch, 'COMPANY_CONTRACT_PRICE', before, {
        ...prices, isActive: active, effectiveUntil: active ? null : new Date(Math.max(Date.now(), before.effectiveFrom.getTime())),
        ...(!before.isActive && active ? { effectiveFrom: new Date() } : {}),
    }, actor, remove ? 'DEACTIVATE' : 'UPDATE');
    await change(tx, branch, 'COMPANY_CONTRACT', contract, {}, actor, 'PRICE_UPDATE');
    await bumpSize(tx, branch, size, item, actor);
    return result;
};
exports.itemWriteRepository = {
    create: (data, branch, actor) => write(branch, async (tx) => {
        const service = data.serviceId
            ? await tx.service.findFirst({ where: { id: data.serviceId, officeBranchId: branch, isActive: true } })
            : null;
        if (data.serviceId && !service)
            throw new httpError_js_1.HttpError('Service is inactive or not found', 409);
        const activeKey = (0, item_schemas_js_1.referenceKey)(data.name);
        if (await tx.item.findFirst({ where: { officeBranchId: branch, serviceId: data.serviceId ?? null, isActive: true, OR: [{ activeKey }, { name: { equals: data.name, mode: 'insensitive' } }] } }))
            throw new httpError_js_1.HttpError('Item already exists', 409);
        const item = await tx.item.create({ data: {
                officeBranchId: branch, serviceId: data.serviceId, name: data.name, uom: data.uom, activeKey, ...createdBy(actor),
                // A standalone item owns inspection scopes only; maintenance scopes belong
                // to a service. The schema rejects the other combinations before this write.
                scopes: { create: data.inspectionScopes.map(scope => ({ type: 'INSPECTION', scope, revoked: false })) },
            }, include: { scopes: true } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'ITEM', null, item, actor, 'CREATE');
        const sizes = [];
        const sizeInputs = data.sizes.length ? data.sizes : [{ size: null }];
        for (const size of sizeInputs)
            sizes.push(await insertSize(tx, branch, { ...item, service }, size, actor));
        return { ...item, sizes };
    }),
    addSize: (data, branch, actor) => write(branch, async (tx) => {
        const item = await itemInBranch(tx, data.itemId, branch);
        (0, catalogAudit_js_1.requireCatalogVersion)(item, data.itemVersion);
        const { itemId, itemVersion, ...input } = data;
        const size = await insertSize(tx, branch, item, input, actor);
        const parent = await bumpItem(tx, branch, item, actor);
        return { ...size, itemVersion: parent.version };
    }),
    addInspectionScopes: (id, data, branch) => write(branch, async (tx) => {
        const item = await tx.item.findFirst({ where: { id, officeBranchId: branch } });
        if (!item)
            throw new httpError_js_1.HttpError('Item not found', 404);
        // A revoked (inactive) item cannot receive new scopes.
        if (!item.isActive)
            throw new httpError_js_1.HttpError('Item is inactive', 409);
        // Only standalone items (serviceId is null) may own scopes.
        if (item.serviceId !== null)
            throw new httpError_js_1.HttpError('Items linked to a service cannot have scopes', 409);
        // Skip scopes that are already active; a revoked row with the same
        // scope text is reactivated to preserve the unique (itemId, type, scope) key.
        const activeScopes = await tx.serviceScope.findMany({ where: { itemId: id, type: 'INSPECTION', revoked: false }, select: { scope: true } });
        const activeKeys = new Set(activeScopes.map(row => (0, item_schemas_js_1.referenceKey)(row.scope)));
        for (const scope of data.inspectionScopes) {
            if (activeKeys.has((0, item_schemas_js_1.referenceKey)(scope)))
                continue;
            const previous = await tx.serviceScope.findFirst({ where: { itemId: id, type: 'INSPECTION', scope } });
            if (previous)
                await tx.serviceScope.update({ where: { id: previous.id }, data: { revoked: false } });
            else
                await tx.serviceScope.create({ data: { itemId: id, type: 'INSPECTION', scope } });
        }
        return tx.item.findUniqueOrThrow({ where: { id }, include: { scopes: { where: { revoked: false }, orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] } } });
    }),
    updateItem: (id, data, branch, actor) => write(branch, async (tx) => {
        const changingService = data.serviceId !== undefined;
        // A service change may rescue an item whose service was already deactivated.
        const item = await itemInBranch(tx, id, branch, changingService);
        (0, catalogAudit_js_1.requireCatalogVersion)(item, data.version);
        const { service, ...before } = item;
        // Unchecked input accepts the raw serviceId foreign key.
        const updates = {};
        if (changingService) {
            const requestedServiceId = data.serviceId ?? null;
            const targetService = requestedServiceId === null ? null : await tx.service.findFirst({
                where: { id: requestedServiceId, officeBranchId: branch, isActive: true },
                select: { id: true, name: true, hasMaintenance: true, isActive: true },
            });
            if (requestedServiceId !== null && !targetService)
                throw new httpError_js_1.HttpError('Service is inactive or not found', 409);
            // Source and target must agree on maintenance: price validation and the
            // quotation subtotal both follow the service maintenance flag.
            if ((service?.hasMaintenance ?? false) !== (targetService?.hasMaintenance ?? false)) {
                throw new httpError_js_1.HttpError('Source and target services must have the same maintenance status', 409);
            }
            if (requestedServiceId !== item.serviceId) {
                // The active name key is unique per service, so the target service must
                // not already hold an active item with the same effective name.
                const activeKey = (0, item_schemas_js_1.referenceKey)(data.name ?? item.name);
                const duplicate = await tx.item.findFirst({ where: {
                        officeBranchId: branch, serviceId: requestedServiceId, activeKey, isActive: true, id: { not: id },
                    }, select: { id: true } });
                if (duplicate)
                    throw new httpError_js_1.HttpError('An active item with this name already exists in the target service', 409);
                updates.serviceId = requestedServiceId;
                // A service-linked item follows the target service scopes. Item-owned
                // scopes are revoked and kept as history instead of being deleted.
                if (requestedServiceId !== null) {
                    await tx.serviceScope.updateMany({ where: { itemId: id, revoked: false }, data: { revoked: true } });
                }
            }
        }
        if (data.name !== undefined) {
            const activeKey = (0, item_schemas_js_1.referenceKey)(data.name);
            if (await tx.item.findFirst({ where: { officeBranchId: branch, serviceId: changingService ? data.serviceId ?? null : item.serviceId, activeKey, isActive: true, id: { not: id } } }))
                throw new httpError_js_1.HttpError('Item already exists in this service', 409);
            updates.name = data.name;
            updates.activeKey = activeKey;
        }
        if (data.uom !== undefined)
            updates.uom = data.uom;
        // Scope rows carry no version or audit trail, so capture them in the ITEM snapshot.
        const scopeSnapshot = await tx.serviceScope.findMany({ where: { itemId: id }, orderBy: { id: 'asc' } });
        const auditedBefore = { ...before, scopes: scopeSnapshot };
        const after = await change(tx, branch, 'ITEM', auditedBefore, updates, actor, 'UPDATE', { scopes: await tx.serviceScope.findMany({ where: { itemId: id }, orderBy: { id: 'asc' } }) });
        return after;
    }),
    removeSize: (id, branch, actor, version) => write(branch, async (tx) => {
        const { size, item } = await sizeInBranch(tx, id, branch);
        (0, catalogAudit_js_1.requireCatalogVersion)(size, version);
        await closeSizes(tx, branch, [size], actor);
        await bumpItem(tx, branch, item, actor);
        return tx.itemSize.findUniqueOrThrow({ where: { id }, include: { price: true } });
    }),
    remove: (id, branch, actor, version) => write(branch, async (tx) => {
        const item = await itemInBranch(tx, id, branch);
        (0, catalogAudit_js_1.requireCatalogVersion)(item, version);
        await closeSizes(tx, branch, await tx.itemSize.findMany({ where: { itemId: id, isActive: true } }), actor);
        const { service, ...before } = item;
        await change(tx, branch, 'ITEM', before, { isActive: false, activeKey: null }, actor, 'DEACTIVATE');
        return tx.item.findUniqueOrThrow({ where: { id }, include: { sizes: { include: { price: true } } } });
    }),
    savePrice: (id, data, branch, actor, create = false) => write(branch, async (tx) => {
        const { item } = await sizeInBranch(tx, id, branch);
        const { version, isActive, ...input } = data;
        const before = await tx.itemPrice.findUnique({ where: { itemSizeId: id } });
        let result;
        if (create) {
            if (before)
                throw new httpError_js_1.HttpError('Price already exists; use PATCH with its version', 409);
            const prices = standardPrices(input, item.service?.hasMaintenance ?? false);
            result = await tx.itemPrice.create({ data: { itemSizeId: id, ...prices, ...createdBy(actor) } });
            await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'ITEM_PRICE', null, result, actor, 'CREATE');
        }
        else {
            if (!before)
                throw new httpError_js_1.HttpError('Item price not found', 404);
            if (!before.isActive && isActive !== true)
                throw new httpError_js_1.HttpError('Inactive price can only be reactivated', 409);
            (0, catalogAudit_js_1.requireCatalogVersion)(before, version, !before.isActive);
            const prices = standardPrices({ priceServicePrimary: before.priceServicePrimary.toString(), priceServiceSisterCompany: before.priceServiceSisterCompany?.toString() ?? null, priceMaintenancePrimary: before.priceMaintenancePrimary?.toString() ?? null, priceMaintenanceSisterCompany: before.priceMaintenanceSisterCompany?.toString() ?? null, ...input }, item.service?.hasMaintenance ?? false);
            result = await change(tx, branch, 'ITEM_PRICE', before, { ...prices, ...(isActive === undefined ? {} : { isActive, effectiveUntil: isActive ? null : new Date(Math.max(Date.now(), before.effectiveFrom.getTime())), ...(!before.isActive && isActive ? { effectiveFrom: new Date() } : {}) }) }, actor);
        }
        // Normal price changes must not invalidate exported ItemSize versions.
        await bumpItem(tx, branch, item, actor);
        return result;
    }),
    createContract: (id, data, branch, actor) => write(branch, tx => createContract(tx, id, data, branch, actor)),
    changeContract: (id, data, branch, actor, remove = false) => write(branch, tx => changeContract(tx, id, data, branch, actor, remove)),
};
//# sourceMappingURL=item-write.repository.js.map