"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractPriceHistoryRepository = void 0;
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const dateOnly_js_1 = require("../../utils/dateOnly.js");
const fields = [
    ['priceService', 'Service price'], ['priceMaintenance', 'Maintenance price'], ['isActive', 'Active status'],
    ['effectiveFrom', 'Effective from'], ['effectiveUntil', 'Effective until'],
];
const snapshot = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : null;
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const changes = (before, after, action) => fields.flatMap(([field, label]) => {
    const previous = before?.[field] ?? null;
    const current = after?.[field] ?? null;
    return action === 'CREATE' || action === 'IMPORT' || !equal(previous, current)
        ? [{ field, label, before: action === 'CREATE' || action === 'IMPORT' ? null : previous, after: current }]
        : [];
});
exports.contractPriceHistoryRepository = {
    listPrices: async (input, branch) => {
        const where = {
            contract: { ...(input.contractId ? { id: input.contractId } : {}), ...(input.companyId ? { companyId: input.companyId } : {}), company: { officeBranchId: branch, revoked: false } },
            ...(input.itemSizeId ? { itemSizeId: input.itemSizeId } : {}), ...(input.isActive === undefined ? {} : { isActive: input.isActive }),
            ...(input.search ? { OR: [{ itemSize: { size: { contains: input.search, mode: 'insensitive' } } }, { itemSize: { item: { name: { contains: input.search, mode: 'insensitive' } } } }] } : {}),
        };
        const orderBy = input.sortBy ? { [input.sortBy]: input.sortOrder } : { createdAt: 'desc' };
        const [prices, total] = await db_js_1.prisma.$transaction([
            db_js_1.prisma.companyContractPrice.findMany({
                where, orderBy, skip: (input.page - 1) * input.limit, take: input.limit,
                include: {
                    contract: { include: { company: { select: { id: true, name: true } } } },
                    itemSize: { include: { item: { include: { service: { select: { id: true, name: true } } } } } },
                },
            }),
            db_js_1.prisma.companyContractPrice.count({ where }),
        ], { isolationLevel: 'RepeatableRead' });
        return { prices: prices.map(price => ({ ...price, contract: (0, dateOnly_js_1.formatContractDates)(price.contract) })), pagination: { page: input.page, limit: input.limit, total, totalPages: Math.ceil(total / input.limit) } };
    },
    list: async (contractPriceId, input, branch) => {
        const price = await db_js_1.prisma.companyContractPrice.findFirst({ where: { id: contractPriceId, contract: { company: { officeBranchId: branch, revoked: false } } }, select: { id: true } });
        if (!price)
            throw new httpError_js_1.HttpError('Contract price not found', 404);
        const where = { officeBranchId: branch, entityType: 'COMPANY_CONTRACT_PRICE', entityId: contractPriceId };
        const [records, total] = await db_js_1.prisma.$transaction([
            db_js_1.prisma.catalogAuditLog.findMany({ where, orderBy: { version: 'desc' }, skip: (input.page - 1) * input.limit, take: input.limit }),
            db_js_1.prisma.catalogAuditLog.count({ where }),
        ], { isolationLevel: 'RepeatableRead' });
        return {
            contractPriceId,
            history: records.map(record => ({
                id: record.id, action: record.action, version: record.version,
                changedBy: { id: record.createdById, name: record.createdByName }, changedAt: record.createdAt,
                changes: changes(snapshot(record.before), snapshot(record.after), record.action),
            })),
            pagination: { page: input.page, limit: input.limit, total, totalPages: Math.ceil(total / input.limit) },
        };
    },
};
//# sourceMappingURL=contract-price-history.repository.js.map