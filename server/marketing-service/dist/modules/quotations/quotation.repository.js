"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationRepository = exports.buildQuotationListWhere = exports.canEditQuotation = exports.workOrderStatusMirror = exports.approvableStatuses = void 0;
const tax_sync_js_1 = require("../taxes/tax-sync.js");
const companyAudit_js_1 = require("../../utils/companyAudit.js");
const quotation_price_js_1 = require("../items/quotation-price.js");
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const quotation_schemas_js_1 = require("./quotation.schemas.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
const quotation_number_js_1 = require("./quotation-number.js");
const quotation_service_groups_js_1 = require("./quotation-service-groups.js");
const listSelect = {
    id: true, officeBranchId: true, no: true, numberYear: true, date: true,
    subject: true, customerSnapshot: true, companySnapshot: true,
    status: true, subTotal: true, taxAmount: true, total: true,
    workOrderStatus: true,
    version: true, revision: true, isActive: true, hasWorkOrder: true, workOrderId: true,
    createdById: true, createdByName: true, updatedById: true, updatedByName: true,
    createdAt: true, updatedAt: true,
};
const include = { pdfDocument: true, items: { orderBy: { position: 'asc' } } };
const detailInclude = { pdfDocument: true, items: { where: { isActive: true }, orderBy: { position: 'asc' } } };
exports.approvableStatuses = ['SUBMITTED'];
const json = (value) => JSON.parse(JSON.stringify(value));
/**
 * Mirrors a Field Service Work Order status onto the quotation. A canceled Work
 * Order clears the mirror instead of storing a status it does not have, and an
 * unknown status is rejected so the quotation never holds a value that Field
 * Service did not report.
 */
const workOrderStatusMirror = (status) => {
    if (status === 'CANCELED')
        return null;
    if (status === 'DRAFT' || status === 'IN_PROGRESS' || status === 'COMPLETED')
        return status;
    throw new httpError_js_1.HttpError('Unsupported Work Order status', 400);
};
exports.workOrderStatusMirror = workOrderStatusMirror;
const canEditQuotation = (status, actor) => {
    if (actor.section !== 'MARKETING')
        return false;
    if (status === 'CREATED' || status === 'REJECTED')
        return true;
    return status === 'SUBMITTED' && actor.role === 'ADMIN';
};
exports.canEditQuotation = canEditQuotation;
const amount = (value) => {
    const rounded = value.toDecimalPlaces(2);
    if (rounded.greaterThan('9999999999999999.99'))
        throw new httpError_js_1.HttpError('Quotation amount exceeds supported precision', 400);
    return rounded;
};
async function customer(tx, companyId, staffId, officeBranchId) {
    const selectCompany = { id: true, version: true, name: true, type: true, address: true, npwp: true };
    const staff = await tx.companyStaff.findFirst({ where: { id: staffId, revoked: false,
            ...(companyId ? { companyId } : {}), company: { officeBranchId, revoked: false } },
        select: { name: true, title: true, company: { select: selectCompany } } });
    if (!staff)
        throw new httpError_js_1.HttpError('Company staff not found in the selected company and branch', 404);
    return { customerSnapshot: staff.name, companySnapshot: json({ ...staff.company, staffTitle: staff.title }) };
}
async function newItem(tx, input, officeBranchId, actor, position, context, now) {
    const size = await tx.itemSize.findFirst({
        where: { id: input.itemSizeId, item: { officeBranchId } },
        include: {
            ...quotation_price_js_1.quotationSizeInclude,
            // Only the resolved active contract may price this line; never another company's contract rows.
            contractPrices: context.contract ? { where: { contractId: context.contract.id } } : false,
            item: { include: { service: { include: quotation_service_groups_js_1.serviceScopeInclude }, scopes: { where: { revoked: false } } } },
        },
    });
    if (!size)
        throw new httpError_js_1.HttpError('Item size not found', 404);
    const service = size.item.service;
    const scopeSnapshot = service ? (0, quotation_service_groups_js_1.serviceScopeSnapshot)(service) : {
        serviceId: null,
        serviceScopes: size.item.scopes.map(row => row.scope).join(', '),
        inspectionScopes: size.item.scopes.filter(row => row.type === 'INSPECTION').map(row => row.scope).join(', '),
        maintenanceScopes: size.item.scopes.filter(row => row.type === 'MAINTENANCE').map(row => row.scope).join(', '),
    };
    const resolved = (0, quotation_price_js_1.resolveQuotationPrice)(size, context, now);
    const quantityInspection = new client_1.Prisma.Decimal(input.quantityInspection);
    const quantityMaintenance = new client_1.Prisma.Decimal(input.quantityMaintenance);
    if (resolved.priceStatus !== 'AVAILABLE' || resolved.priceService === null)
        throw new httpError_js_1.HttpError('Inspection price is unavailable for this company', 409);
    if (quantityMaintenance.greaterThan(0) && (!resolved.catalogSnapshot.hasMaintenance || resolved.priceMaintenance === null))
        throw new httpError_js_1.HttpError('Maintenance is unavailable for this size and company', 409);
    const priceInspection = resolved.priceService;
    const discount = new client_1.Prisma.Decimal(input.discount ?? '0');
    // Discount is a percentage (0-100) of each unit price: net = price - price * discount / 100.
    // Both steps are rounded to two decimals and the effective price never falls below zero.
    const netUnit = (price) => { const net = amount(price.sub(amount(price.mul(discount).div(100)))); return net.lessThan(0) ? new client_1.Prisma.Decimal(0) : net; };
    const netInspection = netUnit(priceInspection);
    const priceMaintenance = resolved.catalogSnapshot.hasMaintenance ? resolved.priceMaintenance : null;
    const netMaintenance = priceMaintenance === null ? null : netUnit(priceMaintenance);
    return {
        itemSizeId: size.id, position, serviceName: resolved.catalogSnapshot.serviceName,
        serviceType: resolved.catalogSnapshot.serviceType, itemName: resolved.catalogSnapshot.itemName, size: resolved.catalogSnapshot.size,
        note: input.note ?? null,
        priceSelection: json({ ...scopeSnapshot, quantityModel: 'DUAL', priceSource: resolved.priceSource, priceId: resolved.priceId,
            priceVersion: resolved.priceVersion, contractId: resolved.contractId, contractVersion: resolved.contractVersion,
            sizeVersion: resolved.sizeVersion, itemVersion: resolved.itemVersion, serviceVersion: resolved.serviceVersion }),
        quantityInspection, quantityMaintenance, priceInspection, priceMaintenance, discount,
        subTotal: amount(amount(quantityInspection.mul(netInspection)).add(amount(quantityMaintenance.mul(netMaintenance ?? 0)))),
        createdById: actor.id, createdByName: actor.name,
    };
}
const historyFields = [
    ['no', 'Quotation number'], ['numberYear', 'Quotation year'], ['date', 'Quotation date'], ['jobStart', 'Job start'],
    ['inquiryMethod', 'Inquiry method'], ['inquiryDate', 'Inquiry date'], ['subject', 'Subject'], ['termOfPayment', 'Term of payment'],
    ['validity', 'Validity'], ['tax', 'Tax'], ['supplyAkura', 'Akura supply'], ['supplyCustomer', 'Customer supply'],
    ['location', 'Location'], ['accomplished', 'Accomplished'], ['deliveryReports', 'Delivery reports'], ['deliveryInvoice', 'Delivery invoice'],
    ['staffId', 'Staff'], ['customerSnapshot', 'Customer'], ['companySnapshot', 'Company'], ['status', 'Status'],
    ['subTotal', 'Subtotal'], ['taxAmount', 'Tax amount'], ['total', 'Total'], ['revision', 'Revision'], ['isActive', 'Active status'],
    ['hasWorkOrder', 'Work order link'], ['workOrderStatus', 'Work order status'], ['workOrderId', 'Work order'],
    ['items', 'Quotation items'],
];
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const historyChanges = (before, after, action) => historyFields.flatMap(([field, label]) => {
    const previous = before?.[field] ?? null;
    const current = after[field] ?? null;
    return action === 'CREATE' || action === 'CREATE_REVISION' || !equal(previous, current) ? [{ field, label, before: action === 'CREATE' || action === 'CREATE_REVISION' ? null : previous, after: current }] : [];
});
async function saveRevision(tx, id, actor, action, before = null) {
    const quote = await tx.quotation.findUniqueOrThrow({ where: { id }, include });
    const previous = before ?? (await tx.quotationSnapshot.findFirst({ where: { quotationId: id, version: { lt: quote.version } }, orderBy: { version: 'desc' }, select: { snapshot: true } }))?.snapshot;
    const snapshot = json(quote);
    await tx.quotationHistory.create({ data: {
            quotationId: id, version: quote.version, action, changes: json(historyChanges(previous, snapshot, action)), createdById: actor.id, createdByName: actor.name,
        } });
    await tx.quotationSnapshot.create({ data: {
            quotationId: id, version: quote.version, action, snapshot, createdById: actor.id, createdByName: actor.name,
        } });
    return quote;
}
async function totals(tx, id, tax) {
    const rows = await tx.quotationItem.findMany({ where: { quotationId: id, isActive: true } });
    const subTotal = amount(rows.reduce((sum, row) => sum.add(row.subTotal), new client_1.Prisma.Decimal(0)));
    const taxAmount = amount(subTotal.mul(tax).div(100));
    return { subTotal, taxAmount, total: amount(subTotal.add(taxAmount)) };
}
// All header/item writes go through this aggregate. Never update items independently.
/**
 * Builds the branch-scoped quotation list predicate.
 * Active-only visibility deliberately includes inactive REVISED rows: revising marks the
 * superseded quotation REVISED/inactive, and it must stay listed as part of the revision lineage.
 * Other inactive rows remain hidden unless the caller explicitly requests isActive=false.
 */
const buildQuotationListWhere = (input, officeBranchId, companyIds) => {
    const { isActive, dateFrom, dateTo, no, status, company } = input;
    const visibility = isActive === false
        ? { isActive: false }
        : isActive === true
            ? { OR: [{ isActive: true }, { status: 'REVISED' }] }
            : undefined;
    const filters = {
        ...(dateFrom || dateTo ? { date: { ...(dateFrom ? { gte: dateFrom } : {}), ...(dateTo ? { lte: dateTo } : {}) } } : {}),
        ...(no === undefined ? {} : { no }),
        ...(status === undefined ? {} : { status }),
        ...(company ? { id: { in: companyIds ?? [] } } : {}),
    };
    const clauses = [...(visibility ? [visibility] : []), ...(Object.keys(filters).length ? [filters] : [])];
    return { officeBranchId, ...(clauses.length ? { AND: clauses } : {}) };
};
exports.buildQuotationListWhere = buildQuotationListWhere;
exports.quotationRepository = {
    /**
     * Binds a freshly created Field Service Work Order to the quotation before the
     * caller receives a success response. Conditional updateMany keeps concurrent
     * claims from binding two Work Orders: a quotation accepts exactly one live
     * reference until the revoke event clears it.
     */
    async attachWorkOrder(id, officeBranchId, workOrder, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM "quotations" WHERE id = ${id}::uuid AND office_branch_id = ${officeBranchId}::uuid FOR UPDATE`;
            const quote = await tx.quotation.findFirst({ where: { id, officeBranchId }, select: { hasWorkOrder: true, workOrderId: true, isActive: true, status: true, workOrderStatus: true } });
            if (!quote)
                throw new httpError_js_1.HttpError('Quotation not found', 404);
            const workOrderStatus = (0, exports.workOrderStatusMirror)(workOrder.status);
            // Retries and subsequent status events for the same Work Order are idempotent.
            if (quote.hasWorkOrder && quote.workOrderId === workOrder.id) {
                if (quote.workOrderStatus !== workOrderStatus) {
                    await tx.quotation.update({ where: { id }, data: { workOrderStatus, workOrderSnapshot: json(workOrder), version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
                    await saveRevision(tx, id, actor, 'WORK_ORDER_STATUS');
                }
                return tx.quotation.findUniqueOrThrow({ where: { id }, include });
            }
            if (quote.hasWorkOrder || quote.workOrderId)
                throw new httpError_js_1.HttpError('Quotation already has a Work Order', 409);
            if (!quote.isActive || quote.status !== 'APPROVED')
                throw new httpError_js_1.HttpError('Quotation is no longer an active APPROVED quotation', 409);
            const claimed = await tx.quotation.updateMany({
                where: { id, officeBranchId, hasWorkOrder: false, workOrderId: null },
                data: { hasWorkOrder: true, workOrderId: workOrder.id, workOrderStatus, workOrderSnapshot: json(workOrder), version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name },
            });
            if (!claimed.count)
                throw new httpError_js_1.HttpError('Quotation already has a Work Order', 409);
            await saveRevision(tx, id, actor, 'WORK_ORDER_LINKED');
            return tx.quotation.findUniqueOrThrow({ where: { id }, include });
        }, { maxWait: 10000, timeout: 20000 });
    },
    /**
     * Clears the live Work Order reference. Idempotent: an already-cleared
     * quotation is acknowledged, while a quotation pointing at a different
     * Work Order is rejected so a late callback cannot drop a newer link.
     */
    async clearWorkOrder(id, officeBranchId, workOrderId) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM "quotations" WHERE id = ${id}::uuid AND office_branch_id = ${officeBranchId}::uuid FOR UPDATE`;
            const quote = await tx.quotation.findFirst({ where: { id, officeBranchId }, select: { hasWorkOrder: true, workOrderId: true, workOrderStatus: true } });
            if (!quote)
                throw new httpError_js_1.HttpError('Quotation not found', 404);
            if (!quote.hasWorkOrder && !quote.workOrderId && quote.workOrderStatus === null)
                return;
            if (quote.workOrderId !== workOrderId)
                throw new httpError_js_1.HttpError('Quotation is linked to a different Work Order', 409);
            await tx.quotation.update({ where: { id }, data: { hasWorkOrder: false, workOrderId: null, workOrderStatus: null, workOrderSnapshot: client_1.Prisma.DbNull, version: { increment: 1 } } });
            await saveRevision(tx, id, { id: workOrderId, name: 'Field Service' }, 'WORK_ORDER_UNLINKED');
        }, { maxWait: 10000, timeout: 20000 });
    },
    async find(id, officeBranchId) {
        const quote = await db_js_1.prisma.quotation.findFirst({ where: { id, officeBranchId }, include: detailInclude });
        if (!quote)
            throw new httpError_js_1.HttpError('Quotation not found', 404);
        return quote;
    },
    findPdf: (bucket, key) => db_js_1.prisma.quotationPdf.findUnique({ where: { bucket_key: { bucket, key } } }),
    async history(id, officeBranchId, input) {
        const quotation = await db_js_1.prisma.quotation.findFirst({ where: { id, officeBranchId }, select: { id: true } });
        if (!quotation)
            throw new httpError_js_1.HttpError('Quotation not found', 404);
        const where = { quotationId: id, ...(input.action ? { action: input.action } : {}) };
        const orderBy = { [input.sortBy]: input.sortOrder };
        const [history, total] = await db_js_1.prisma.$transaction([
            db_js_1.prisma.quotationHistory.findMany({ where, orderBy: [orderBy, { id: input.sortOrder }], skip: (input.page - 1) * input.limit, take: input.limit }),
            db_js_1.prisma.quotationHistory.count({ where }),
        ], { isolationLevel: 'RepeatableRead' });
        return { quotationId: id, history: history.map(entry => ({ ...entry, changes: entry.changes, createdBy: { id: entry.createdById, name: entry.createdByName } })), pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    },
    async list(input, officeBranchId) {
        const { page, limit, company } = input;
        return db_js_1.prisma.$transaction(async (tx) => {
            // companySnapshot is intentionally immutable historical JSON. Resolve matching
            // quotation IDs with PostgreSQL ILIKE so the search remains case-insensitive.
            const companyIds = company
                ? (await tx.$queryRaw(client_1.Prisma.sql `
            SELECT id FROM quotations
            WHERE office_branch_id = ${officeBranchId}::uuid
              AND company_snapshot->>'name' ILIKE ${`%${company.replace(/[\\%_]/g, '\\$&')}%`}
          `)).map(row => row.id)
                : undefined;
            const where = (0, exports.buildQuotationListWhere)(input, officeBranchId, companyIds);
            const [quotations, total] = await Promise.all([
                tx.quotation.findMany({ where, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], skip: (page - 1) * limit, take: limit, select: listSelect }),
                tx.quotation.count({ where }),
            ]);
            return {
                quotations: quotations.map(({ companySnapshot, ...quotation }) => {
                    const snapshot = typeof companySnapshot === 'object' && companySnapshot !== null
                        ? companySnapshot : {};
                    return {
                        ...quotation,
                        companyId: typeof snapshot.id === 'string' ? snapshot.id : null,
                        companyName: typeof snapshot.name === 'string' ? snapshot.name : null,
                    };
                }),
                pagination: (0, listQuery_js_1.buildPagination)(page, limit, total),
            };
        });
    },
    async findActive(id, officeBranchId) {
        const quote = await db_js_1.prisma.quotation.findFirst({ where: { id, officeBranchId, isActive: true },
            include: { pdfDocument: true, items: { where: { isActive: true }, orderBy: { position: 'asc' } } } });
        if (!quote)
            throw new httpError_js_1.HttpError('Quotation not found', 404);
        // Expose the frozen scope snapshot of every line. It is read from the line
        // itself, so the scopes describe the approved document and not the current
        // catalog, which may have changed since the quotation was approved.
        // The contract that priced the lines is the second billing identity of the
        // quotation, so it is exposed on the header for the billing service.
        const items = quote.items.map(item => {
            const scopes = item.priceSelection;
            const scope = (key) => typeof scopes?.[key] === 'string' ? scopes[key] : '';
            return { ...item, inspectionScopes: scope('inspectionScopes'), maintenanceScopes: scope('maintenanceScopes') };
        });
        const contractId = items.map(item => item.priceSelection?.contractId)
            .find(value => typeof value === 'string');
        return { ...quote, ...(contractId ? { contractId } : {}), items };
    },
    async create(input, officeBranchId, actor) {
        const { items, companyId, date: _clientDate, ...data } = quotation_schemas_js_1.createQuotationSchema.parse(input);
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const now = new Date();
            const customerSnapshot = await customer(tx, companyId, data.staffId, officeBranchId);
            const context = await (0, quotation_price_js_1.priceContext)(tx, customerSnapshot.companySnapshot.id, officeBranchId, now);
            const tax = await (0, tax_sync_js_1.applicableTax)(tx, officeBranchId, now);
            const quote = await tx.quotation.create({ data: { ...data, date: (0, quotation_number_js_1.quotationDate)(now), tax: tax.percentage, taxSourceId: tax.id, status: 'CREATED', officeBranchId, ...customerSnapshot, createdById: actor.id, createdByName: actor.name } });
            for (const [position, item] of items.entries()) {
                await tx.quotationItem.create({ data: { ...await newItem(tx, item, officeBranchId, actor, position, context, now), quotationId: quote.id } });
            }
            await tx.quotation.update({ where: { id: quote.id }, data: await totals(tx, quote.id, quote.tax) });
            return saveRevision(tx, quote.id, actor, 'CREATE');
        }, { maxWait: 10000, timeout: 20000 });
    },
    async update(id, input, officeBranchId, actor) {
        const data = quotation_schemas_js_1.updateQuotationSchema.parse(input);
        return db_js_1.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM "quotations" WHERE id = ${id}::uuid FOR UPDATE`;
            const current = await tx.quotation.findFirst({ where: { id, officeBranchId }, include });
            if (!current)
                throw new httpError_js_1.HttpError('Quotation not found', 404);
            if (!current.isActive || !(0, exports.canEditQuotation)(current.status, actor) || current.version !== data.version) {
                throw new httpError_js_1.HttpError('Quotation has changed, is inactive, or cannot be edited by this user; reload before retrying', 409);
            }
            const { version: _version, staffId, ...changes } = data;
            let customerSnapshot = {};
            if (staffId && staffId !== current.staffId) {
                const companyId = current.companySnapshot.id;
                if (!companyId)
                    throw new httpError_js_1.HttpError('Quotation company snapshot is invalid', 409);
                customerSnapshot = await customer(tx, companyId, staffId, officeBranchId);
            }
            await tx.quotation.update({ where: { id }, data: {
                    ...changes, ...(staffId ? { staffId } : {}), ...customerSnapshot,
                    version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name,
                } });
            return saveRevision(tx, id, actor, 'UPDATE', current);
        }, { maxWait: 10000, timeout: 20000 });
    },
    async addItem(id, input, officeBranchId, actor) {
        const data = quotation_schemas_js_1.addQuotationItemSchema.parse(input);
        const itemInput = { itemSizeId: data.itemSizeId, note: data.note, quantityInspection: data.quantityInspection, quantityMaintenance: data.quantityMaintenance, discount: data.discount };
        return db_js_1.prisma.$transaction(async (tx) => {
            // Serialize with catalog/contract price writers before resolving the price context.
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            await tx.$queryRaw `SELECT id FROM "quotations" WHERE id = ${id}::uuid FOR UPDATE`;
            const current = await tx.quotation.findFirst({ where: { id, officeBranchId }, include });
            if (!current)
                throw new httpError_js_1.HttpError('Quotation not found', 404);
            if (!current.isActive || !(0, exports.canEditQuotation)(current.status, actor) || current.version !== data.version)
                throw new httpError_js_1.HttpError('Quotation has changed, is inactive, or cannot be edited by this user; reload before retrying', 409);
            if (current.items.some(row => row.isActive && row.itemSizeId === data.itemSizeId))
                throw new httpError_js_1.HttpError('Item size already exists in this quotation', 409);
            const companyId = current.companySnapshot.id;
            if (!companyId)
                throw new httpError_js_1.HttpError('Quotation company snapshot is invalid', 409);
            const now = new Date();
            const context = await (0, quotation_price_js_1.priceContext)(tx, companyId, officeBranchId, now);
            const position = current.items.reduce((max, row) => Math.max(max, row.position), -1) + 1;
            await tx.quotationItem.create({ data: { ...await newItem(tx, itemInput, officeBranchId, actor, position, context, now), quotationId: id } });
            await tx.quotation.update({ where: { id }, data: { ...await totals(tx, id, current.tax), version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
            return saveRevision(tx, id, actor, 'ADD_ITEM', current);
        }, { maxWait: 10000, timeout: 20000 });
    },
    async deleteItem(id, itemId, input, officeBranchId, actor) {
        const { quotationVersion, itemVersion } = quotation_schemas_js_1.deleteQuotationItemSchema.parse(input);
        return db_js_1.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM "quotations" WHERE id = ${id}::uuid FOR UPDATE`;
            const current = await tx.quotation.findFirst({ where: { id, officeBranchId }, include });
            if (!current)
                throw new httpError_js_1.HttpError('Quotation not found', 404);
            if (!current.isActive || !(0, exports.canEditQuotation)(current.status, actor) || current.version !== quotationVersion)
                throw new httpError_js_1.HttpError('Quotation has changed, is inactive, or cannot be edited by this user; reload before retrying', 409);
            await tx.$queryRaw `SELECT id FROM "quotation_items" WHERE id = ${itemId}::uuid AND quotation_id = ${id}::uuid FOR UPDATE`;
            const item = await tx.quotationItem.findFirst({ where: { id: itemId, quotationId: id } });
            if (!item)
                throw new httpError_js_1.HttpError('Quotation item not found', 404);
            if (!item.isActive || item.version !== itemVersion)
                throw new httpError_js_1.HttpError('Quotation item has changed or is inactive; reload before retrying', 409);
            await tx.quotationItem.update({ where: { id: itemId }, data: { isActive: false, version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
            await tx.quotation.update({ where: { id }, data: { ...await totals(tx, id, current.tax), version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
            return saveRevision(tx, id, actor, 'DELETE_ITEM', current);
        }, { maxWait: 10000, timeout: 20000 });
    },
    async submit(id, version, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            const updated = await tx.quotation.updateMany({ where: { id, officeBranchId, version, isActive: true, status: { in: ['CREATED', 'REJECTED'] } }, data: { status: 'SUBMITTED', version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
            if (!updated.count)
                throw new httpError_js_1.HttpError('Quotation has changed or cannot be submitted from its current status; reload before retrying', 409);
            return saveRevision(tx, id, actor, 'SUBMIT');
        });
    },
    async reject(id, version, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            const updated = await tx.quotation.updateMany({ where: { id, officeBranchId, version, isActive: true, status: 'SUBMITTED' }, data: { status: 'REJECTED', version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
            if (!updated.count)
                throw new httpError_js_1.HttpError('Quotation has changed or cannot be rejected; reload before retrying', 409);
            return saveRevision(tx, id, actor, 'REJECT');
        });
    },
    async approve(id, version, officeBranchId, actor, storePdf) {
        return db_js_1.prisma.$transaction(async (tx) => {
            const claimed = await tx.quotation.updateMany({
                where: { id, officeBranchId, version, isActive: true, status: { in: [...exports.approvableStatuses] } },
                data: { status: 'APPROVED', version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name },
            });
            if (!claimed.count)
                throw new httpError_js_1.HttpError('Quotation has changed or cannot be approved; reload before retrying', 409);
            const current = await tx.quotation.findUniqueOrThrow({ where: { id }, include });
            if (current.pdfDocument)
                throw new httpError_js_1.HttpError('Quotation already has a historical PDF', 409);
            if (!current.items.some(item => item.isActive))
                throw new httpError_js_1.HttpError('Quotation must contain active items before approval', 409);
            // Capture the contact title for older drafts before their first PDF is frozen.
            const companySnapshot = current.companySnapshot;
            if (current.staffId && !('staffTitle' in companySnapshot)) {
                const staff = await tx.companyStaff.findFirst({ where: { id: current.staffId, company: { officeBranchId } }, select: { title: true } });
                if (staff)
                    await tx.quotation.update({ where: { id }, data: { companySnapshot: json({ ...companySnapshot, staffTitle: staff.title }) } });
            }
            // Capture scopes once for older drafts that predate service snapshots.
            const legacyItems = current.items.filter(item => {
                const snapshot = item.priceSelection;
                return item.isActive && (typeof snapshot?.inspectionScopes !== 'string' || typeof snapshot?.maintenanceScopes !== 'string');
            });
            if (legacyItems.length) {
                const sizes = await tx.itemSize.findMany({ where: { id: { in: legacyItems.map(item => item.itemSizeId) }, item: { officeBranchId } },
                    include: { item: { include: { service: { include: quotation_service_groups_js_1.serviceScopeInclude }, scopes: { where: { revoked: false } } } } } });
                const bySize = new Map(sizes.map(size => [size.id, size.item.service]));
                for (const item of legacyItems) {
                    const service = bySize.get(item.itemSizeId);
                    if (!service)
                        throw new httpError_js_1.HttpError('Unable to resolve quotation service scopes', 409);
                    await tx.quotationItem.update({ where: { id: item.id }, data: {
                            priceSelection: json({ ...item.priceSelection, ...(0, quotation_service_groups_js_1.serviceScopeSnapshot)(service) }),
                        } });
                }
            }
            const previous = current.previousQuotationId
                ? await tx.quotation.findUniqueOrThrow({ where: { id: current.previousQuotationId } }) : null;
            // Revisions inherit the approved number only at approval. New quotations allocate a fresh number.
            const numberYear = previous?.numberYear ?? current.numberYear ?? (0, quotation_number_js_1.quotationNumberYear)();
            const existingNumber = previous?.no ?? current.no;
            const no = existingNumber ?? await (0, quotation_number_js_1.lockNextQuotationNumber)(tx, officeBranchId, numberYear);
            // Read the date after acquiring the sequence lock so approval order determines the date.
            const date = existingNumber === null ? (0, quotation_number_js_1.quotationDate)() : previous?.date ?? current.date ?? (0, quotation_number_js_1.quotationDate)();
            const numbered = await tx.quotation.update({ where: { id }, data: { no, numberYear, date }, include });
            const document = await storePdf(numbered);
            await tx.quotationPdf.create({ data: { ...document, approvedAt: new Date(document.approvedAt), quotationId: id } });
            if (existingNumber === null)
                await tx.quotationSequence.update({
                    where: { officeBranchId_year: { officeBranchId, year: numberYear } }, data: { lastNumber: no },
                });
            const approvedRow = await saveRevision(tx, id, actor, 'APPROVE');
            return approvedRow;
        }, { maxWait: 10000, timeout: 60000 });
    },
    async revise(id, version, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM "quotations" WHERE id = ${id}::uuid AND office_branch_id = ${officeBranchId}::uuid FOR UPDATE`;
            const source = await tx.quotation.findFirst({ where: { id, officeBranchId }, include });
            if (!source)
                throw new httpError_js_1.HttpError('Quotation not found', 404);
            if (!source.isActive || source.status !== 'APPROVED' || source.version !== version) {
                throw new httpError_js_1.HttpError('Only an active APPROVED quotation with the current version can be revised', 409);
            }
            if (source.hasWorkOrder) {
                throw new httpError_js_1.HttpError('A quotation with an active Work Order cannot be revised until the Work Order is revoked', 409);
            }
            const revised = await tx.quotation.update({ where: { id }, data: {
                    status: 'REVISED', isActive: false, version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name,
                }, include });
            const copy = await tx.quotation.create({ data: {
                    officeBranchId: source.officeBranchId, no: source.no, numberYear: source.numberYear,
                    previousQuotationId: source.id, date: source.date, jobStart: source.jobStart,
                    inquiryMethod: source.inquiryMethod, inquiryDate: source.inquiryDate, subject: source.subject,
                    termOfPayment: source.termOfPayment, validity: source.validity, tax: source.tax, taxSourceId: source.taxSourceId,
                    supplyAkura: source.supplyAkura, supplyCustomer: source.supplyCustomer, location: source.location,
                    accomplished: source.accomplished, deliveryReports: source.deliveryReports, deliveryInvoice: source.deliveryInvoice,
                    staffId: source.staffId, customerSnapshot: source.customerSnapshot, companySnapshot: json(source.companySnapshot),
                    status: 'CREATED', subTotal: source.subTotal, taxAmount: source.taxAmount, total: source.total,
                    revision: source.revision + 1, isActive: true, createdById: actor.id, createdByName: actor.name,
                    items: { create: source.items.filter(item => item.isActive).map(item => ({
                            itemSizeId: item.itemSizeId, position: item.position, serviceName: item.serviceName, serviceType: item.serviceType,
                            itemName: item.itemName, size: item.size, note: item.note, quantityInspection: item.quantityInspection,
                            quantityMaintenance: item.quantityMaintenance, priceInspection: item.priceInspection, priceMaintenance: item.priceMaintenance,
                            discount: item.discount, subTotal: item.subTotal, priceSelection: item.priceSelection ? json(item.priceSelection) : undefined,
                            isActive: true, version: 0, createdById: actor.id, createdByName: actor.name,
                        })) },
                }, include });
            await saveRevision(tx, revised.id, actor, 'REVISE');
            return saveRevision(tx, copy.id, actor, 'CREATE_REVISION');
        }, { maxWait: 10000, timeout: 20000 });
    },
    async deactivate(id, input, officeBranchId, actor) {
        const { version } = quotation_schemas_js_1.deactivateQuotationSchema.parse(input);
        return db_js_1.prisma.$transaction(async (tx) => {
            // Keep the link check in the atomic claim so a concurrent attachment
            // cannot be bypassed between the controller validation and this write.
            const claimed = await tx.quotation.updateMany({ where: { id, officeBranchId, version, isActive: true, hasWorkOrder: false, workOrderId: null }, data: { isActive: false, version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
            if (!claimed.count) {
                const current = await tx.quotation.findFirst({ where: { id, officeBranchId } });
                if (!current)
                    throw new httpError_js_1.HttpError('Quotation not found', 404);
                if (current.hasWorkOrder || current.workOrderId)
                    throw new httpError_js_1.HttpError('A quotation with an active Work Order cannot be deleted until the Work Order is revoked', 409);
                throw new httpError_js_1.HttpError('Quotation has changed or is inactive; reload before retrying', 409);
            }
            await tx.quotationItem.updateMany({ where: { quotationId: id, isActive: true }, data: { isActive: false, updatedById: actor.id, updatedByName: actor.name } });
            const row = await tx.quotation.findUniqueOrThrow({ where: { id }, include });
            await saveRevision(tx, id, actor, 'DEACTIVATE');
            if (row.previousQuotationId) {
                const parent = await tx.quotation.findFirst({ where: { id: row.previousQuotationId, officeBranchId, status: 'REVISED', isActive: false } });
                if (!parent)
                    throw new httpError_js_1.HttpError('Original quotation cannot be restored', 409);
                const restored = await tx.quotation.update({ where: { id: parent.id }, data: { status: 'APPROVED', isActive: true, version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name }, include });
                await saveRevision(tx, restored.id, actor, 'RESTORE_APPROVED');
            }
            return row;
        });
    },
};
//# sourceMappingURL=quotation.repository.js.map