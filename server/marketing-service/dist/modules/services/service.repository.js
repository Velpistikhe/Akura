"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRepository = void 0;
const db_js_1 = require("../../config/db.js");
const companyAudit_js_1 = require("../../utils/companyAudit.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
const catalogAudit_js_1 = require("../../utils/catalogAudit.js");
const httpError_js_1 = require("../../utils/httpError.js");
const item_schemas_js_1 = require("../items/item.schemas.js");
const serviceScopeSelect = {
    id: true, serviceId: true, itemId: true, type: true, scope: true, revoked: true, createdAt: true, updatedAt: true,
};
const detailSelect = {
    id: true, officeBranchId: true, name: true, type: true, hasMaintenance: true, version: true,
    isActive: true, createdById: true, createdByName: true, updatedById: true, updatedByName: true, createdAt: true, updatedAt: true,
    scopes: { where: { revoked: false }, select: serviceScopeSelect },
};
const listSelect = {
    id: true, officeBranchId: true, name: true, type: true, hasMaintenance: true, version: true,
    isActive: true, createdById: true, createdByName: true, updatedById: true, updatedByName: true, createdAt: true, updatedAt: true,
    scopes: { where: { revoked: false }, orderBy: [{ createdAt: 'asc' }, { id: 'asc' }], select: { type: true, scope: true } },
};
const snapshot = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : null;
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const displayScopes = (value) => Array.isArray(value)
    ? value.map((entry) => (snapshot(entry)?.inspectionScope ?? snapshot(entry)?.scope)).filter((scope) => typeof scope === 'string').join(', ')
    : value ?? null;
const detailScopes = ({ scopes, ...row }) => ({
    ...row,
    inspectionScopes: scopes.filter(item => item.type === 'INSPECTION').map(item => ({ id: item.id, serviceId: item.serviceId, inspectionScope: item.scope, revoked: item.revoked, createdAt: item.createdAt, updatedAt: item.updatedAt })),
    maintenanceScopes: scopes.filter(item => item.type === 'MAINTENANCE').map(item => ({ id: item.id, serviceId: item.serviceId, scope: item.scope, revoked: item.revoked, createdAt: item.createdAt, updatedAt: item.updatedAt })),
});
const historyFields = [
    ['inspectionScopes', 'Inspection scopes'], ['maintenanceScopes', 'Maintenance scopes'],
];
// Audit snapshots written before the rename still use scopes/scope.
const historyValue = (value, field) => field === 'inspectionScopes'
    ? value?.inspectionScopes ?? value?.scopes
    : value?.[field];
const historyChanges = (before, after, action) => historyFields.flatMap(([field, label]) => {
    const previous = field.endsWith('Scopes') ? displayScopes(historyValue(before, field)) : before?.[field] ?? null;
    const current = field.endsWith('Scopes') ? displayScopes(historyValue(after, field)) : after?.[field] ?? null;
    return action === 'CREATE' || !equal(previous, current)
        ? [{ field, label, before: action === 'CREATE' ? null : previous, after: current }]
        : [];
});
exports.serviceRepository = {
    async list(input, officeBranchId) {
        const result = await (0, listQuery_js_1.findAll)(input, {
            baseWhere: { officeBranchId },
            filters: {
                type: (type) => ({ type }),
                isActive: (isActive) => ({ isActive }),
                hasMaintenance: (hasMaintenance) => ({ hasMaintenance }),
                name: (name) => ({ name: { contains: name, mode: 'insensitive' } }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                name: (direction) => ({ name: direction }),
                type: (direction) => ({ type: direction }),
                isActive: (direction) => ({ isActive: direction }),
            }),
        }, (query) => db_js_1.prisma.service.findMany({ ...query, select: listSelect }), (where) => db_js_1.prisma.service.count({ where }));
        return {
            services: result.items.map(row => {
                const { scopes, ...service } = row;
                return { ...service,
                    inspectionScopes: scopes.filter(scope => scope.type === 'INSPECTION').map(scope => scope.scope).join(', '),
                    maintenanceScopes: scopes.filter(scope => scope.type === 'MAINTENANCE').map(scope => scope.scope).join(', '),
                };
            }),
            pagination: result.pagination,
        };
    },
    async findById(id, officeBranchId) {
        const service = await db_js_1.prisma.service.findFirst({ where: { id, officeBranchId }, select: detailSelect });
        if (!service)
            return null;
        return detailScopes(service);
    },
    async findActiveById(id, officeBranchId) {
        const service = await db_js_1.prisma.service.findFirst({ where: { id, officeBranchId, isActive: true }, select: detailSelect });
        if (!service)
            return null;
        return detailScopes(service);
    },
    async history(id, officeBranchId, input) {
        const service = await db_js_1.prisma.service.findFirst({ where: { id, officeBranchId }, select: { id: true } });
        if (!service)
            throw new httpError_js_1.HttpError('Service not found', 404);
        const where = { officeBranchId, entityType: 'SERVICE', entityId: id };
        const [records, total] = await db_js_1.prisma.$transaction([
            db_js_1.prisma.catalogAuditLog.findMany({ where, orderBy: { version: 'desc' }, skip: (input.page - 1) * input.limit, take: input.limit }),
            db_js_1.prisma.catalogAuditLog.count({ where }),
        ], { isolationLevel: 'RepeatableRead' });
        return {
            serviceId: id,
            history: records.map((record) => ({
                id: record.id, action: record.action === 'SCOPE_ADD' ? 'INSPECTION_SCOPE_ADD' : record.action === 'SCOPE_REMOVE' ? 'INSPECTION_SCOPE_REMOVE' : record.action, version: record.version,
                changedBy: { id: record.createdById, name: record.createdByName }, changedAt: record.createdAt,
                changes: historyChanges(snapshot(record.before), snapshot(record.after), record.action),
            })),
            pagination: { page: input.page, limit: input.limit, total, totalPages: Math.ceil(total / input.limit) },
        };
    },
    create: async (data, officeBranchId, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
        const row = await tx.service.create({
            data: {
                officeBranchId,
                name: data.name,
                activeKey: (0, item_schemas_js_1.referenceKey)(data.name),
                type: data.type,
                hasMaintenance: data.hasMaintenance,
                isActive: true,
                createdById: actor.id, createdByName: actor.name,
                scopes: { create: [
                        ...data.inspectionScopes.map(scope => ({ type: 'INSPECTION', scope, revoked: false })),
                        ...(data.hasMaintenance ? data.maintenanceScopes.map(scope => ({ type: 'MAINTENANCE', scope, revoked: false })) : []),
                    ] },
            },
            select: detailSelect,
        });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, officeBranchId, 'SERVICE', null, detailScopes(row), actor, 'CREATE');
        return detailScopes(row);
    }),
    update: (id, officeBranchId, data, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
        const before = await tx.service.findFirst({ where: { id, officeBranchId }, select: detailSelect });
        if (!before || before.version !== data.version)
            throw new httpError_js_1.HttpError('Data has changed; reload before retrying', 409);
        if (!before.isActive)
            throw new httpError_js_1.HttpError('Service is inactive', 409);
        const { version, ...serviceData } = data;
        if (data.name !== undefined) {
            const activeKey = (0, item_schemas_js_1.referenceKey)(data.name);
            if (await tx.service.findFirst({ where: { officeBranchId, activeKey, isActive: true, id: { not: id } }, select: { id: true } }))
                throw new httpError_js_1.HttpError('Service already exists in this branch', 409);
            serviceData.activeKey = activeKey;
        }
        await tx.service.update({ where: { id, version }, data: { ...serviceData, version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
        if (data.hasMaintenance === false) {
            await tx.serviceScope.updateMany({ where: { serviceId: id, type: 'MAINTENANCE', revoked: false }, data: { revoked: true } });
        }
        const after = await tx.service.findFirstOrThrow({ where: { id, officeBranchId }, select: detailSelect });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, officeBranchId, 'SERVICE', detailScopes(before), detailScopes(after), actor, 'UPDATE');
        return detailScopes(after);
    }),
    async deactivate(id, version, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const before = await tx.service.findFirst({ where: { id, officeBranchId }, select: detailSelect });
            if (!before)
                throw new httpError_js_1.HttpError('Service not found', 404);
            if (before.version !== version)
                throw new httpError_js_1.HttpError('Data has changed; reload before retrying', 409);
            if (!before.isActive)
                throw new httpError_js_1.HttpError('Service is inactive', 409);
            // Standard prices leave the catalog; contract prices and contracts remain untouched.
            const standardPrices = await tx.itemPrice.findMany({ where: { isActive: true, itemSize: { item: { serviceId: id, officeBranchId } } } });
            for (const price of standardPrices) {
                const closed = await tx.itemPrice.update({ where: { id: price.id, version: price.version }, data: {
                        isActive: false, effectiveUntil: new Date(Math.max(Date.now(), price.effectiveFrom.getTime())),
                        version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name,
                    } });
                await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, officeBranchId, 'ITEM_PRICE', price, closed, actor, 'DEACTIVATE');
            }
            await tx.service.update({ where: { id, version }, data: { isActive: false, activeKey: null, version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name } });
            const after = await tx.service.findUniqueOrThrow({ where: { id }, select: detailSelect });
            await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, officeBranchId, 'SERVICE', detailScopes(before), detailScopes(after), actor, 'DEACTIVATE');
            return detailScopes(after);
        });
    },
    findInspectionScopeByName: (serviceId, inspectionScope, officeBranchId) => db_js_1.prisma.serviceScope.findFirst({ where: { serviceId, scope: inspectionScope, type: 'INSPECTION', service: { officeBranchId } } }),
    findMaintenanceScopeByName: (serviceId, scope, officeBranchId) => db_js_1.prisma.serviceScope.findFirst({ where: { serviceId, scope, type: 'MAINTENANCE', service: { officeBranchId } } }),
    async createMaintenanceScope(serviceId, scope, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const before = await tx.service.findFirst({ where: { id: serviceId, officeBranchId }, select: detailSelect });
            if (!before?.isActive || !before.hasMaintenance)
                return null;
            if (before.scopes.some(item => item.type === 'MAINTENANCE' && item.scope === scope))
                throw new httpError_js_1.HttpError(`Maintenance scope '${scope}' already exists`, 409);
            const type = 'MAINTENANCE';
            const existing = await tx.serviceScope.findFirst({ where: { serviceId, type, scope } });
            const row = existing
                ? await tx.serviceScope.update({ where: { id: existing.id }, data: { revoked: false }, select: serviceScopeSelect })
                : await tx.serviceScope.create({ data: { serviceId, type, scope }, select: serviceScopeSelect });
            const after = await tx.service.update({ where: { id: serviceId, version: before.version }, data: { version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name }, select: detailSelect });
            await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, officeBranchId, 'SERVICE', detailScopes(before), detailScopes(after), actor, 'MAINTENANCE_SCOPE_ADD');
            return row;
        });
    },
    async revokeMaintenanceScope(serviceId, scopeId, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const before = await tx.service.findFirst({ where: { id: serviceId, officeBranchId }, select: detailSelect });
            if (!before?.isActive || !before.hasMaintenance)
                return null;
            const current = await tx.serviceScope.findFirst({ where: { id: scopeId, serviceId, type: 'MAINTENANCE' } });
            if (!current)
                throw new httpError_js_1.HttpError('Maintenance scope not found', 404);
            if (current.revoked)
                throw new httpError_js_1.HttpError('Maintenance scope is already deleted', 409);
            const row = await tx.serviceScope.update({ where: { id: scopeId }, data: { revoked: true }, select: serviceScopeSelect });
            const after = await tx.service.update({ where: { id: serviceId, version: before.version }, data: { version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name }, select: detailSelect });
            await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, officeBranchId, 'SERVICE', detailScopes(before), detailScopes(after), actor, 'MAINTENANCE_SCOPE_REMOVE');
            return row;
        });
    },
    async createInspectionScope(serviceId, inspectionScope, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const before = await tx.service.findFirst({ where: { id: serviceId, officeBranchId }, select: detailSelect });
            if (!before?.isActive)
                return null;
            if (before.scopes.some(item => item.type === 'INSPECTION' && item.scope === inspectionScope))
                throw new httpError_js_1.HttpError(`Inspection scope '${inspectionScope}' already exists`, 409);
            const type = 'INSPECTION';
            const existing = await tx.serviceScope.findFirst({ where: { serviceId, type, scope: inspectionScope } });
            const row = existing
                ? await tx.serviceScope.update({ where: { id: existing.id }, data: { revoked: false }, select: serviceScopeSelect })
                : await tx.serviceScope.create({ data: { serviceId, type, scope: inspectionScope }, select: serviceScopeSelect });
            const after = await tx.service.update({ where: { id: serviceId, version: before.version }, data: { version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name }, select: detailSelect });
            await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, officeBranchId, 'SERVICE', detailScopes(before), detailScopes(after), actor, 'INSPECTION_SCOPE_ADD');
            return { ...row, inspectionScope: row.scope };
        });
    },
    async revokeInspectionScope(serviceId, inspectionScopeId, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const before = await tx.service.findFirst({ where: { id: serviceId, officeBranchId }, select: detailSelect });
            if (!before)
                throw new httpError_js_1.HttpError('Service not found', 404);
            if (!before.isActive)
                return null;
            const current = await tx.serviceScope.findFirst({ where: { id: inspectionScopeId, serviceId, type: 'INSPECTION' } });
            if (!current)
                throw new httpError_js_1.HttpError('Inspection scope not found', 404);
            if (current.revoked)
                throw new httpError_js_1.HttpError('Inspection scope is already deleted', 409);
            const row = await tx.serviceScope.update({ where: { id: current.id }, data: { revoked: true }, select: serviceScopeSelect });
            const after = await tx.service.update({ where: { id: serviceId, version: before.version }, data: { version: { increment: 1 }, updatedById: actor.id, updatedByName: actor.name }, select: detailSelect });
            await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, officeBranchId, 'SERVICE', detailScopes(before), detailScopes(after), actor, 'INSPECTION_SCOPE_REMOVE');
            return { ...row, inspectionScope: row.scope };
        });
    },
};
//# sourceMappingURL=service.repository.js.map