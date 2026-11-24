"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRepository = void 0;
const menu_write_js_1 = require("../menu-write.js");
const db_js_1 = require("../../../config/db.js");
const httpError_js_1 = require("../../../utils/httpError.js");
const listQuery_js_1 = require("../../../utils/listQuery.js");
const audit_js_1 = require("../../../utils/audit.js");
const menuSelect = {
    isDeleted: true,
    id: true, key: true, label: true,
    hasItem: true, order: true, isActive: true, createdAt: true, updatedAt: true,
};
/**
 * The version of a menu row for the audit trail.
 *
 * The row has no version column, so the timestamp of the change is used. The
 * audit entry is unique per (entity, version), and the timestamp changes on
 * every write, so each write produces exactly one entry.
 */
const auditVersion = (row) => row.updatedAt.getTime();
class MenuRepository {
    async list(input) {
        const query = (0, listQuery_js_1.buildListQuery)(input, {
            filters: {
                hasItem: (hasItem) => ({ hasItem }),
                isActive: (isActive) => ({ isActive }),
                search: (search) => ({ OR: [
                        { key: { contains: search, mode: 'insensitive' } },
                        { label: { contains: search, mode: 'insensitive' } },
                    ] }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                key: (direction) => ({ key: direction }), label: (direction) => ({ label: direction }),
                hasItem: (direction) => ({ hasItem: direction }), order: (direction) => ({ order: direction }),
                isActive: (direction) => ({ isActive: direction }),
                updatedAt: (direction) => ({ updatedAt: direction }),
            }),
        });
        const where = { AND: [{ isDeleted: false }, { isActive: true }, query.where] };
        const [menus, total] = await Promise.all([
            db_js_1.prisma.menu.findMany({ ...query, where, select: menuSelect }),
            db_js_1.prisma.menu.count({ where }),
        ]);
        return { menus, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    }
    findById(id) {
        return db_js_1.prisma.menu.findUnique({ where: { id }, select: menuSelect });
    }
    findActiveById(id) {
        return db_js_1.prisma.menu.findFirst({ where: { id, isDeleted: false, isActive: true }, select: menuSelect });
    }
    findByKey(key) {
        return db_js_1.prisma.menu.findUnique({ where: { key }, select: menuSelect });
    }
    create(data, actor) {
        return (0, menu_write_js_1.menuWrite)(async (tx) => {
            const created = await tx.menu.create({
                data: {
                    key: data.key,
                    label: data.label,
                    hasItem: data.hasItem,
                    order: data.order,
                    items: data.items ? { create: data.items } : undefined,
                },
                select: menuSelect,
            });
            await (0, audit_js_1.recordAudit)(tx, {
                module: 'menu',
                entityType: 'MENU',
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
            const rows = await tx.$queryRaw `
        SELECT id FROM "menus" WHERE id = ${id}::uuid FOR UPDATE
      `;
            if (rows.length === 0)
                throw new httpError_js_1.HttpError('Menu not found', 404);
            const current = await tx.menu.findUniqueOrThrow({ where: { id } });
            if (current.isDeleted)
                throw new httpError_js_1.HttpError('Menu is already deleted', 409);
            if (data.hasItem === false && await tx.menuItem.count({ where: { menuId: id, isDeleted: false } })) {
                throw new httpError_js_1.HttpError('Menu with items cannot set hasItem to false', 409);
            }
            const before = await tx.menu.findUniqueOrThrow({ where: { id }, select: menuSelect });
            const updated = await tx.menu.update({
                where: { id },
                data,
                select: menuSelect,
            });
            await (0, audit_js_1.recordAudit)(tx, {
                module: 'menu',
                entityType: 'MENU',
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
            const current = await tx.menu.findUnique({ where: { id } });
            if (!current)
                throw new httpError_js_1.HttpError('Menu not found', 404);
            if (current.isDeleted)
                throw new httpError_js_1.HttpError('Menu is already deleted', 409);
            if (await tx.menuItem.count({ where: { menuId: id, isDeleted: false } })) {
                throw new httpError_js_1.HttpError('Menu with items cannot be deleted; delete its items first', 409);
            }
            const before = await tx.menu.findUniqueOrThrow({ where: { id }, select: menuSelect });
            const deleted = await tx.menu.update({ where: { id }, data: { isDeleted: true, isActive: false }, select: menuSelect });
            await (0, audit_js_1.recordAudit)(tx, {
                module: 'menu',
                entityType: 'MENU',
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
    async findMenusForUser(role, section) {
        const items = await db_js_1.prisma.menuItem.findMany({
            where: {
                isActive: true,
                isDeleted: false,
                menu: { isActive: true, isDeleted: false },
                accesses: {
                    some: {
                        isDeleted: false,
                        AND: [
                            { OR: [{ role: null }, { role }] },
                            section ? { OR: [{ section: null }, { section }] } : { section: null },
                        ],
                    },
                },
            },
            select: {
                key: true, label: true, order: true,
                menu: { select: { id: true, key: true, label: true, hasItem: true, order: true } },
            },
            orderBy: [{ menu: { order: 'asc' } }, { order: 'asc' }],
        });
        const menus = new Map();
        for (const item of items) {
            let menu = menus.get(item.menu.id);
            if (!menu) {
                menu = { key: item.menu.key, label: item.menu.label, hasItem: item.menu.hasItem, order: item.menu.order, items: [] };
                menus.set(item.menu.id, menu);
            }
            menu.items.push({ key: item.key, label: item.label, order: item.order });
        }
        return [...menus.values()];
    }
}
exports.menuRepository = new MenuRepository();
//# sourceMappingURL=menu.repository.js.map