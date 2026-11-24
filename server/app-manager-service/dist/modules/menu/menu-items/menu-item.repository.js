"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemRepository = void 0;
const menu_write_js_1 = require("../menu-write.js");
const db_js_1 = require("../../../config/db.js");
const httpError_js_1 = require("../../../utils/httpError.js");
const listQuery_js_1 = require("../../../utils/listQuery.js");
const audit_js_1 = require("../../../utils/audit.js");
const menuItemSelect = {
    isDeleted: true,
    id: true, menuId: true, key: true, label: true,
    order: true,
    isActive: true, createdAt: true, updatedAt: true,
};
/**
 * The version of a menu item row for the audit trail.
 *
 * The row has no version column, so the timestamp of the change is used. The
 * audit entry is unique per (entity, version), and the timestamp changes on
 * every write, so each write produces exactly one entry.
 */
const auditVersion = (row) => row.updatedAt.getTime();
class MenuItemRepository {
    async list(input) {
        const query = (0, listQuery_js_1.buildListQuery)(input, {
            filters: {
                menuId: (menuId) => ({ menuId }),
                isActive: (isActive) => ({ isActive }),
                search: (search) => ({ OR: [
                        { key: { contains: search, mode: 'insensitive' } },
                        { label: { contains: search, mode: 'insensitive' } },
                    ] }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                menuId: (direction) => ({ menuId: direction }), key: (direction) => ({ key: direction }),
                label: (direction) => ({ label: direction }),
                order: (direction) => [{ menu: { order: direction } }, { order: direction }],
                isActive: (direction) => ({ isActive: direction }),
                updatedAt: (direction) => ({ updatedAt: direction }),
            }),
        });
        const where = {
            AND: [{ isDeleted: false }, { isActive: true }, { menu: { isActive: true, isDeleted: false } }, query.where],
        };
        const [items, total] = await Promise.all([
            db_js_1.prisma.menuItem.findMany({ ...query, where, select: menuItemSelect }),
            db_js_1.prisma.menuItem.count({ where }),
        ]);
        return { items, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    }
    findById(id) {
        return db_js_1.prisma.menuItem.findUnique({ where: { id }, select: menuItemSelect });
    }
    findActiveById(id) {
        return db_js_1.prisma.menuItem.findFirst({
            where: { id, isDeleted: false, isActive: true, menu: { isActive: true, isDeleted: false } },
            select: menuItemSelect,
        });
    }
    findByKey(key) {
        return db_js_1.prisma.menuItem.findUnique({ where: { key }, select: menuItemSelect });
    }
    create(data, actor) {
        return (0, menu_write_js_1.menuWrite)(async (tx) => {
            const parent = await tx.menu.findFirst({ where: { id: data.menuId, isDeleted: false, isActive: true } });
            if (!parent)
                throw new httpError_js_1.HttpError('Menu not found', 404);
            if (!parent.hasItem)
                throw new httpError_js_1.HttpError('Menu does not allow items', 409);
            const created = await tx.menuItem.create({
                data: {
                    menuId: data.menuId,
                    key: data.key,
                    label: data.label,
                    order: data.order,
                },
                select: menuItemSelect,
            });
            await (0, audit_js_1.recordAudit)(tx, {
                module: 'menu',
                entityType: 'MENU_ITEM',
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
    async update(id, data, actor) {
        return (0, menu_write_js_1.menuWrite)(async (tx) => {
            const current = await tx.menuItem.findUnique({ where: { id } });
            if (!current)
                throw new httpError_js_1.HttpError('Menu item not found', 404);
            if (current.isDeleted)
                throw new httpError_js_1.HttpError('Menu item is already deleted', 409);
            const parent = await tx.menu.findFirst({ where: { id: data.menuId ?? current.menuId, isDeleted: false, isActive: true } });
            if (!parent)
                throw new httpError_js_1.HttpError('Menu not found', 404);
            if (!parent.hasItem)
                throw new httpError_js_1.HttpError('Menu does not allow items', 409);
            const before = await tx.menuItem.findUniqueOrThrow({ where: { id }, select: menuItemSelect });
            const updated = await tx.menuItem.update({ where: { id }, data, select: menuItemSelect });
            await (0, audit_js_1.recordAudit)(tx, {
                module: 'menu',
                entityType: 'MENU_ITEM',
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
    delete(id, actor) {
        return (0, menu_write_js_1.menuWrite)(async (tx) => {
            const current = await tx.menuItem.findUnique({ where: { id } });
            if (!current)
                throw new httpError_js_1.HttpError('Menu item not found', 404);
            if (current.isDeleted)
                throw new httpError_js_1.HttpError('Menu item is already deleted', 409);
            if (await tx.menuAccess.count({ where: { menuItemId: id, isDeleted: false } })) {
                throw new httpError_js_1.HttpError('Menu item with access rules cannot be deleted; delete its access rules first', 409);
            }
            const before = await tx.menuItem.findUniqueOrThrow({ where: { id }, select: menuItemSelect });
            const deleted = await tx.menuItem.update({ where: { id }, data: { isDeleted: true, isActive: false }, select: menuItemSelect });
            await (0, audit_js_1.recordAudit)(tx, {
                module: 'menu',
                entityType: 'MENU_ITEM',
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
exports.menuItemRepository = new MenuItemRepository();
//# sourceMappingURL=menu-item.repository.js.map