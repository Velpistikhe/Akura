"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRepository = void 0;
const quotation_price_js_1 = require("./quotation-price.js");
const client_1 = require("@prisma/client");
const listQuery_js_1 = require("../../utils/listQuery.js");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const item_write_repository_js_1 = require("./item-write.repository.js");
const priceSelect = {
    id: true, version: true, isActive: true, effectiveFrom: true, effectiveUntil: true,
    priceServicePrimary: true,
    priceServiceSisterCompany: true,
    priceMaintenancePrimary: true,
    priceMaintenanceSisterCompany: true,
};
const includeItemScopes = { scopes: { where: { revoked: false }, orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] } };
const flattenSizePrice = ({ price, ...itemSize }, now = new Date()) => {
    const available = price?.isActive && price.effectiveFrom <= now && (price.effectiveUntil == null || price.effectiveUntil > now);
    return { ...itemSize, priceId: price?.id ?? null, priceVersion: price?.version ?? null,
        priceServicePrimary: available ? price.priceServicePrimary : null,
        priceServiceSisterCompany: available ? price.priceServiceSisterCompany : null,
        priceMaintenancePrimary: available ? price.priceMaintenancePrimary : null,
        priceMaintenanceSisterCompany: available ? price.priceMaintenanceSisterCompany : null,
        priceStatus: available ? 'AVAILABLE' : 'UNAVAILABLE',
    };
};
const flattenItemScopes = ({ scopes, ...item }) => ({
    ...item,
    inspectionScopes: scopes.filter(scope => scope.type === 'INSPECTION').map(scope => ({ id: scope.id, itemId: scope.itemId, inspectionScope: scope.scope, revoked: scope.revoked, createdAt: scope.createdAt, updatedAt: scope.updatedAt })),
    maintenanceScopes: scopes.filter(scope => scope.type === 'MAINTENANCE').map(scope => ({ id: scope.id, itemId: scope.itemId, scope: scope.scope, revoked: scope.revoked, createdAt: scope.createdAt, updatedAt: scope.updatedAt })),
});
const flattenItemPrices = ({ sizes, ...item }) => ({
    ...item,
    sizes: sizes.map((size) => flattenSizePrice(size)),
});
exports.itemRepository = {
    async list(input, officeBranchId) {
        return db_js_1.prisma.$transaction(async (tx) => (0, listQuery_js_1.findAll)(input, {
            baseWhere: { officeBranchId, isActive: true },
            filters: {
                name: (value) => ({ name: { contains: value, mode: 'insensitive' } }),
                serviceName: (value) => ({ service: { name: { contains: value, mode: 'insensitive' } } }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                name: (direction) => ({ name: direction }),
                serviceName: (direction) => ({ service: { name: direction } }),
            }),
        }, (query) => tx.item.findMany({
            ...query,
            orderBy: [query.orderBy, { id: 'asc' }],
            include: { service: { select: { id: true, name: true } }, ...includeItemScopes },
        }).then(rows => rows.map(flattenItemScopes)), (where) => tx.item.count({ where })), { isolationLevel: 'RepeatableRead' });
    },
    find: (id, officeBranchId) => db_js_1.prisma.item.findFirst({
        where: { id, officeBranchId },
        include: { service: { select: { id: true, name: true } }, ...includeItemScopes, sizes: { where: { isActive: true }, include: { price: { select: priceSelect } } } },
    }).then(item => item ? flattenItemPrices(flattenItemScopes(item)) : null),
    findActive: (id, officeBranchId) => db_js_1.prisma.item.findFirst({
        where: { id, officeBranchId, isActive: true },
        include: { service: { select: { id: true, name: true, hasMaintenance: true } }, ...includeItemScopes },
    }).then(item => item ? flattenItemScopes(item) : null),
    async listSizes(input, officeBranchId, companyId, resolvePrices = false) {
        return db_js_1.prisma.$transaction(async (tx) => {
            const now = new Date();
            const context = companyId ? await (0, quotation_price_js_1.priceContext)(tx, companyId, officeBranchId, now) : null;
            const contractWhere = { contractId: context?.contract?.id ?? '00000000-0000-0000-0000-000000000000' };
            const activeItem = { officeBranchId, isActive: true, OR: [
                    { serviceId: null }, { service: { officeBranchId, isActive: true } },
                ] };
            const activeCatalog = { isActive: true, item: activeItem };
            if (input.itemId && !resolvePrices && !await tx.item.findFirst({ where: { id: input.itemId, ...activeItem }, select: { id: true } }))
                throw new httpError_js_1.HttpError('Item not found', 404);
            if (resolvePrices && context)
                return (0, quotation_price_js_1.quotationOptions)(tx, input, context, officeBranchId, now);
            const result = await (0, listQuery_js_1.findAll)(input, {
                baseWhere: {
                    item: { officeBranchId },
                    ...(companyId ? resolvePrices
                        ? { OR: [activeCatalog, { contractPrices: { some: contractWhere } }] }
                        : { contractPrices: { some: contractWhere } }
                        : { AND: [activeCatalog] }),
                },
                filters: {
                    itemId: (value) => ({ itemId: value }),
                    notIn: (value) => ({ id: { notIn: value } }),
                    size: (value) => ({ size: { contains: value, mode: 'insensitive' } }),
                    itemName: (value) => ({ item: { name: { contains: value, mode: 'insensitive' } } }),
                    serviceName: (value) => ({ item: { service: { name: { contains: value, mode: 'insensitive' } } } }),
                },
                defaultSort: { createdAt: 'desc' },
                sorts: (0, listQuery_js_1.defineSortRules)({
                    size: (direction) => ({ size: direction }),
                }),
            }, (query) => tx.itemSize.findMany({
                ...query,
                orderBy: [query.orderBy, { id: 'asc' }],
                include: {
                    price: true,
                    ...(companyId ? { contractPrices: { where: contractWhere, include: { contract: true } } } : {}),
                    item: { include: { service: { select: { id: true, name: true, type: true, hasMaintenance: true, isActive: true, version: true } } } },
                },
            }), (where) => tx.itemSize.count({ where }));
            const sizes = result.items.map(row => flattenSizePrice(row, now));
            return {
                sizes: companyId ? sizes.map(({ contractPrices, ...size }) => ({ ...size, contractPrice: contractPrices[0] })) : sizes,
                pagination: result.pagination,
            };
        }, { isolationLevel: 'RepeatableRead' });
    },
    async listContractPriceOptions(input, contractId, branch) {
        return db_js_1.prisma.$transaction(async (tx) => {
            const contract = await tx.companyContract.findFirst({
                where: { id: contractId, isDeleted: false, company: { officeBranchId: branch, revoked: false } },
                select: { id: true },
            });
            if (!contract)
                throw new httpError_js_1.HttpError('Company contract not found in the current branch', 404);
            const serviceLabel = client_1.Prisma.sql `COALESCE(svc.name, '')`;
            const conditions = [
                client_1.Prisma.sql `i.office_branch_id = ${branch}::uuid`,
                client_1.Prisma.sql `i.is_active = true`,
                client_1.Prisma.sql `s.is_active = true`,
                client_1.Prisma.sql `(svc.id IS NULL OR (svc.is_active = true AND svc.office_branch_id = ${branch}::uuid))`,
                client_1.Prisma.sql `NOT EXISTS (SELECT 1 FROM company_contract_prices cp WHERE cp.contract_id = ${contractId}::uuid AND cp.item_size_id = s.id AND cp.is_active = true)`,
            ];
            if (input.itemId)
                conditions.push(client_1.Prisma.sql `i.id = ${input.itemId}::uuid`);
            if (input.notIn?.length)
                conditions.push(client_1.Prisma.sql `s.id::text NOT IN (${client_1.Prisma.join(input.notIn)})`);
            if (input.size)
                conditions.push(client_1.Prisma.sql `strpos(lower(COALESCE(s.size, '')), lower(${input.size})) > 0`);
            if (input.itemName)
                conditions.push(client_1.Prisma.sql `strpos(lower(i.name), lower(${input.itemName})) > 0`);
            if (input.serviceName)
                conditions.push(client_1.Prisma.sql `strpos(lower(${serviceLabel}), lower(${input.serviceName})) > 0`);
            const where = client_1.Prisma.sql `WHERE ${client_1.Prisma.join(conditions, ' AND ')}`;
            const order = input.sortBy === 'size'
                ? client_1.Prisma.sql `s.size ${input.sortOrder === 'asc' ? client_1.Prisma.sql `ASC` : client_1.Prisma.sql `DESC`}`
                : client_1.Prisma.sql `s.created_at DESC`;
            const [rows, count] = await Promise.all([
                tx.$queryRaw(client_1.Prisma.sql `
          SELECT s.id, s.item_id AS "itemId", s.size, s.version, i.name AS "itemName", svc.name AS "serviceName"
          FROM item_sizes s
          JOIN items i ON i.id = s.item_id
          LEFT JOIN services svc ON svc.id = i.service_id
          ${where}
          ORDER BY ${order}, s.id ASC
          LIMIT ${input.limit} OFFSET ${(input.page - 1) * input.limit}`),
                tx.$queryRaw(client_1.Prisma.sql `SELECT count(*) AS total FROM item_sizes s JOIN items i ON i.id = s.item_id LEFT JOIN services svc ON svc.id = i.service_id ${where}`),
            ]);
            const total = Number(count[0]?.total ?? 0n);
            return { sizes: rows, pagination: { page: input.page, limit: input.limit, total, totalPages: Math.ceil(total / input.limit) } };
        }, { isolationLevel: 'RepeatableRead' });
    },
    create: (data, branch, actor) => item_write_repository_js_1.itemWriteRepository.create(data, branch, actor).then(item => flattenItemPrices(flattenItemScopes(item))),
    addSize: (data, branch, actor) => item_write_repository_js_1.itemWriteRepository.addSize(data, branch, actor).then(flattenSizePrice),
    addInspectionScopes: (id, data, branch) => item_write_repository_js_1.itemWriteRepository.addInspectionScopes(id, data, branch).then(flattenItemScopes),
    removeSize: (id, branch, actor, version) => item_write_repository_js_1.itemWriteRepository.removeSize(id, branch, actor, version).then(flattenSizePrice),
    remove: (id, branch, actor, version) => item_write_repository_js_1.itemWriteRepository.remove(id, branch, actor, version).then(flattenItemPrices),
};
//# sourceMappingURL=item.repository.js.map