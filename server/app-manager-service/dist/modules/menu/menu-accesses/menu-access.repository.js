"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuAccessRepository = void 0;
const menu_write_js_1 = require("../menu-write.js");
const db_js_1 = require("../../../config/db.js");
const httpError_js_1 = require("../../../utils/httpError.js");
const listQuery_js_1 = require("../../../utils/listQuery.js");
const audit_js_1 = require("../../../utils/audit.js");
const menuAccessSelect = {
    isDeleted: true,
    id: true,
    menuItemId: true,
    role: true,
    section: true,
    createdAt: true,
    updatedAt: true,
    menuItem: { select: { id: true, key: true, label: true, menuId: true } },
};
/**
 * The version of a menu access row for the audit trail.
 *
 * The row has no version column, so the timestamp of the change is used. The
 * audit entry is unique per (entity, version), and the timestamp changes on
 * every write, so each write produces exactly one entry.
 */
const auditVersion = (row) => row.updatedAt.getTime();
const throwConflict = (error) => {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        throw new httpError_js_1.HttpError('Menu access rule already exists', 409);
    }
    throw error;
};
class MenuAccessRepository {
    async list(input) {
        const query = (0, listQuery_js_1.buildListQuery)(input, {
            filters: {
                menuItemId: (menuItemId) => ({ menuItemId }),
                role: (role) => ({ role }),
                section: (section) => ({ section }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                menuItemId: (direction) => ({ menuItemId: direction }),
                role: (direction) => ({ role: direction }),
                section: (direction) => ({ section: direction }),
                updatedAt: (direction) => ({ updatedAt: direction }),
            }),
        });
        const where = {
            AND: [
                { isDeleted: false },
                { menuItem: { isDeleted: false, isActive: true } },
                { menuItem: { menu: { isActive: true, isDeleted: false } } },
                query.where,
            ],
        };
        const [menuAccesses, total] = await Promise.all([
            db_js_1.prisma.menuAccess.findMany({ ...query, where, select: menuAccessSelect }),
            db_js_1.prisma.menuAccess.count({ where }),
        ]);
        return { menuAccesses, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    }
    findById(id) {
        return db_js_1.prisma.menuAccess.findUnique({ where: { id }, select: menuAccessSelect });
    }
    findActiveById(id) {
        return db_js_1.prisma.menuAccess.findFirst({
            where: { id, isDeleted: false, menuItem: { isDeleted: false, isActive: true, menu: { isActive: true, isDeleted: false } } },
            select: menuAccessSelect,
        });
    }
    findByRule(menuItemId, role, section, excludeId) {
        return db_js_1.prisma.menuAccess.findFirst({
            where: { menuItemId, role, section, ...(excludeId && { id: { not: excludeId } }) },
            select: menuAccessSelect,
        });
    }
    async create(data, actor) {
        try {
            return await (0, menu_write_js_1.menuWrite)(async (tx) => {
                if (!await tx.menuItem.findFirst({ where: { id: data.menuItemId, isDeleted: false, isActive: true, menu: { isDeleted: false, isActive: true } } }))
                    throw new httpError_js_1.HttpError('Menu item not found', 404);
                // PostgreSQL unique constraints permit duplicate NULL values. Check
                // nullable role/section identities under the shared write lock as well.
                if (await tx.menuAccess.findFirst({ where: { menuItemId: data.menuItemId, role: data.role, section: data.section } })) {
                    throw new httpError_js_1.HttpError('Menu access rule already exists', 409);
                }
                const created = await tx.menuAccess.create({ data, select: menuAccessSelect });
                await (0, audit_js_1.recordAudit)(tx, {
                    module: 'menu',
                    entityType: 'MENU_ACCESS',
                    entityId: created.id,
                    version: auditVersion(created),
                    action: 'CREATE',
                    before: null,
                    after: created,
                    actor,
                });
                return created;
            });
        }
        catch (error) {
            return throwConflict(error);
        }
    }
    async update(id, data, actor) {
        try {
            return await (0, menu_write_js_1.menuWrite)(async (tx) => {
                const current = await tx.menuAccess.findUnique({ where: { id } });
                if (!current)
                    throw new httpError_js_1.HttpError('Menu access not found', 404);
                if (current.isDeleted)
                    throw new httpError_js_1.HttpError('Menu access is already deleted', 409);
                if (!await tx.menuItem.findFirst({ where: { id: data.menuItemId ?? current.menuItemId, isDeleted: false, isActive: true, menu: { isDeleted: false, isActive: true } } }))
                    throw new httpError_js_1.HttpError('Menu item not found', 404);
                if (await tx.menuAccess.findFirst({ where: {
                        id: { not: id }, menuItemId: data.menuItemId ?? current.menuItemId,
                        role: data.role === undefined ? current.role : data.role,
                        section: data.section === undefined ? current.section : data.section,
                    } }))
                    throw new httpError_js_1.HttpError('Menu access rule already exists', 409);
                const before = await tx.menuAccess.findUniqueOrThrow({ where: { id }, select: menuAccessSelect });
                const updated = await tx.menuAccess.update({ where: { id }, data, select: menuAccessSelect });
                await (0, audit_js_1.recordAudit)(tx, {
                    module: 'menu',
                    entityType: 'MENU_ACCESS',
                    entityId: updated.id,
                    version: auditVersion(updated),
                    action: 'UPDATE',
                    before,
                    after: updated,
                    actor,
                });
                return updated;
            });
        }
        catch (error) {
            return throwConflict(error);
        }
    }
    delete(id, actor) {
        return (0, menu_write_js_1.menuWrite)(async (tx) => {
            const current = await tx.menuAccess.findUnique({ where: { id } });
            if (!current)
                throw new httpError_js_1.HttpError('Menu access not found', 404);
            if (current.isDeleted)
                throw new httpError_js_1.HttpError('Menu access is already deleted', 409);
            const before = await tx.menuAccess.findUniqueOrThrow({ where: { id }, select: menuAccessSelect });
            const deleted = await tx.menuAccess.update({ where: { id }, data: { isDeleted: true }, select: menuAccessSelect });
            await (0, audit_js_1.recordAudit)(tx, {
                module: 'menu',
                entityType: 'MENU_ACCESS',
                entityId: deleted.id,
                version: auditVersion(deleted),
                action: 'DELETE',
                before,
                after: deleted,
                actor,
            });
            return deleted;
        });
    }
}
exports.menuAccessRepository = new MenuAccessRepository();
//# sourceMappingURL=menu-access.repository.js.map