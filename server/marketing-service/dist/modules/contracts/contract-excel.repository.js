"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractExcelRepository = void 0;
const quotation_price_js_1 = require("../items/quotation-price.js");
const node_crypto_1 = require("node:crypto");
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
const companyAudit_js_1 = require("../../utils/companyAudit.js");
const catalogAudit_js_1 = require("../../utils/catalogAudit.js");
const httpError_js_1 = require("../../utils/httpError.js");
const businessDate_js_1 = require("../../utils/businessDate.js");
const contract_excel_schemas_js_1 = require("./contract-excel.schemas.js");
const contract_history_js_1 = require("./contract-history.js");
exports.contractExcelRepository = {
    exportSizes: async (input, branch) => {
        const query = (0, listQuery_js_1.buildListQuery)({ ...input, page: 1, limit: contract_excel_schemas_js_1.MAX_EXCEL_ROWS + 1 }, {
            baseWhere: { isActive: true, item: { officeBranchId: branch, isActive: true, OR: [
                        { serviceId: null }, { service: { officeBranchId: branch, isActive: true } },
                    ] } },
            filters: {
                itemId: value => ({ itemId: value }), notIn: value => ({ id: { notIn: value } }),
                size: value => ({ size: { contains: value, mode: 'insensitive' } }),
                itemName: value => ({ item: { name: { contains: value, mode: 'insensitive' } } }),
                serviceName: value => ({ item: { service: { name: { contains: value, mode: 'insensitive' } } } }),
            }, defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({ size: direction => ({ size: direction }) }),
        });
        // PostgreSQL ASC places missing service names last.
        const sizes = await db_js_1.prisma.itemSize.findMany({ ...query, orderBy: input.sortBy ? [query.orderBy, { id: 'asc' }] : [{ item: { service: { name: 'asc' } } }, { item: { name: 'asc' } }, { size: 'asc' }, { id: 'asc' }], include: {
                item: { include: { service: true } },
                // Only normal/primary prices are read; no sister-company or contract price is exported.
                price: { select: { isActive: true, effectiveFrom: true, effectiveUntil: true, priceServicePrimary: true, priceMaintenancePrimary: true } },
            } });
        if (sizes.length > contract_excel_schemas_js_1.MAX_EXCEL_ROWS)
            throw new httpError_js_1.HttpError(`Export exceeds ${contract_excel_schemas_js_1.MAX_EXCEL_ROWS} sizes; narrow the filters`, 400);
        const ordered = [...sizes].sort((left, right) => {
            const leftService = left.item.service?.name;
            const rightService = right.item.service?.name;
            if (!leftService && rightService)
                return 1;
            if (leftService && !rightService)
                return -1;
            const serviceCompare = (leftService ?? '').localeCompare(rightService ?? '', undefined, { sensitivity: 'base' });
            if (serviceCompare)
                return serviceCompare;
            const itemCompare = left.item.name.localeCompare(right.item.name, undefined, { sensitivity: 'base' });
            if (itemCompare)
                return itemCompare;
            const sizeCompare = (left.size ?? '').localeCompare(right.size ?? '', undefined, { sensitivity: 'base' });
            return sizeCompare || left.id.localeCompare(right.id);
        });
        return ordered;
    },
    importPrices: (contractId, companyId, version, rows, branch, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const requestedContract = await tx.companyContract.findFirst({ where: { id: contractId, companyId, company: { officeBranchId: branch, revoked: false } } });
        if (!requestedContract)
            throw new httpError_js_1.HttpError('Company contract not found in the current branch', 404);
        const now = new Date();
        const today = (0, businessDate_js_1.currentBusinessDate)(now);
        // A requested DRAFT is the explicit upload target. This prevents the old
        // active-contract resolver from silently importing rows into another contract.
        // Keep the APPROVED resolver for existing callers that use the endpoint as a
        // company-level import and for backward compatibility.
        const contract = requestedContract.status === 'DRAFT'
            ? requestedContract
            : await tx.companyContract.findFirst({
                where: { status: 'APPROVED', companyId, effectiveUntil: { gt: today }, company: { officeBranchId: branch, revoked: false }, effectiveFrom: { lte: today } },
                orderBy: [{ effectiveFrom: 'desc' }, { id: 'asc' }],
            }) ?? await tx.companyContract.findFirst({
                where: { status: 'APPROVED', companyId, effectiveUntil: { gt: today }, company: { officeBranchId: branch, revoked: false }, effectiveFrom: { gt: today } },
                orderBy: [{ effectiveFrom: 'asc' }, { id: 'asc' }],
            });
        if (!contract)
            throw new httpError_js_1.HttpError('No active or future contract is available for price imports', 409);
        (0, catalogAudit_js_1.requireCatalogVersion)(contract, version);
        const targetContractId = contract.id;
        const ids = rows.map(row => row.itemSizeId);
        const duplicateRows = new Map();
        for (const row of rows)
            duplicateRows.set(row.itemSizeId, [...(duplicateRows.get(row.itemSizeId) ?? []), row.row]);
        const sizes = await tx.itemSize.findMany({ where: { id: { in: ids }, isActive: true, item: { officeBranchId: branch, isActive: true } }, include: { item: { include: { service: true } } } });
        const byId = new Map(sizes.map(size => [size.id, size]));
        const existing = new Set((await tx.companyContractPrice.findMany({ where: { contractId: targetContractId, itemSizeId: { in: ids } }, select: { itemSizeId: true } })).map(price => price.itemSizeId));
        const errors = [];
        let stale = false;
        for (const row of rows) {
            const size = byId.get(row.itemSizeId);
            const duplicateRowsForItem = duplicateRows.get(row.itemSizeId) ?? [];
            if (duplicateRowsForItem.length > 1)
                errors.push({ row: row.row, message: `Duplicate item in upload; rows ${duplicateRowsForItem.join(', ')} contain the same item` });
            if (!size) {
                errors.push({ row: row.row, message: 'Size is missing, inactive or outside the current branch' });
                continue;
            }
            if (size.version !== row.sizeVersion) {
                stale = true;
                errors.push({ row: row.row, message: 'Size changed after export; download a new template' });
            }
            if (size.item.service?.hasMaintenance && row.priceMaintenance === null)
                errors.push({ row: row.row, field: 'Maintenance Price', message: 'Maintenance price is required for this service' });
            if (existing.has(row.itemSizeId)) {
                stale = true;
                errors.push({ row: row.row, message: 'This size already has a price in this contract; use the contract price PUT endpoint to update it' });
            }
        }
        if (errors.length)
            throw new contract_excel_schemas_js_1.ExcelImportError(errors, stale ? 409 : 400);
        const metadata = { createdAt: now, updatedAt: now, createdById: actor.id, createdByName: actor.name, updatedById: null, updatedByName: null, version: 0 };
        const prices = rows.map(row => ({ id: (0, node_crypto_1.randomUUID)(), contractId: targetContractId, itemSizeId: row.itemSizeId, catalogSnapshot: (0, quotation_price_js_1.catalogSnapshot)(byId.get(row.itemSizeId)),
            priceService: new client_1.Prisma.Decimal(row.priceService), priceMaintenance: row.priceMaintenance === null ? null : new client_1.Prisma.Decimal(row.priceMaintenance),
            isActive: true, effectiveFrom: contract.status === 'DRAFT' ? contract.effectiveFrom : now, effectiveUntil: contract.status === 'DRAFT' ? contract.effectiveUntil : null, ...metadata, }));
        await tx.companyContractPrice.createMany({ data: prices });
        const audit = (entityType, before, after, action) => ({
            officeBranchId: branch, entityType, entityId: after.id, version: after.version, action,
            before: before === null ? client_1.Prisma.DbNull : JSON.parse(JSON.stringify(before)), after: JSON.parse(JSON.stringify(after)),
            createdById: actor.id, createdByName: actor.name,
        });
        await tx.catalogAuditLog.createMany({ data: [
                ...prices.map(price => audit('COMPANY_CONTRACT_PRICE', null, price, 'IMPORT')),
            ] });
        const updated = await tx.companyContract.update({ where: { id: targetContractId, version: contract.version }, data: { updatedAt: now, updatedById: actor.id, version: { increment: 1 } } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', contract, updated, actor, 'IMPORT');
        await (0, contract_history_js_1.recordContractHistory)(tx, contract, updated, actor, 'IMPORT');
        return { companyId, contractId: targetContractId, version: updated.version, imported: prices.length };
    }, { maxWait: 10000, timeout: 30000 }),
};
//# sourceMappingURL=contract-excel.repository.js.map