"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuService = void 0;
const db_js_1 = require("../../../config/db.js");
const httpError_js_1 = require("../../../utils/httpError.js");
const audit_js_1 = require("../../../utils/audit.js");
const menu_repository_js_1 = require("./menu.repository.js");
class MenuService {
    list(input) {
        return menu_repository_js_1.menuRepository.list(input);
    }
    async get(id) {
        const menu = await menu_repository_js_1.menuRepository.findActiveById(id);
        if (!menu)
            throw new httpError_js_1.HttpError('Menu not found', 404);
        return menu;
    }
    async create(data, res) {
        const existing = await menu_repository_js_1.menuRepository.findByKey(data.key);
        if (existing)
            throw new httpError_js_1.HttpError(`Menu with key '${data.key}' already exists`, 409);
        if (data.hasItem) {
            const itemKeys = data.items.map(({ key }) => key);
            const conflict = await db_js_1.prisma.menuItem.findFirst({ where: { key: { in: itemKeys } }, select: { key: true } });
            if (conflict)
                throw new httpError_js_1.HttpError(`Menu item with key '${conflict.key}' already exists`, 409);
        }
        return menu_repository_js_1.menuRepository.create({
            key: data.key,
            label: data.label,
            hasItem: data.hasItem,
            order: data.order,
            items: data.hasItem ? data.items : undefined,
        }, (0, audit_js_1.getAuditActor)(res));
    }
    async update(id, data, res) {
        const existing = await menu_repository_js_1.menuRepository.findById(id);
        if (!existing)
            throw new httpError_js_1.HttpError('Menu not found', 404);
        if (data.key && data.key !== existing.key) {
            const conflict = await menu_repository_js_1.menuRepository.findByKey(data.key);
            if (conflict)
                throw new httpError_js_1.HttpError(`Menu with key '${data.key}' already exists`, 409);
        }
        if (data.hasItem === false) {
            const itemCount = await db_js_1.prisma.menuItem.count({ where: { menuId: id, isDeleted: false } });
            if (itemCount > 0)
                throw new httpError_js_1.HttpError('Menu with items cannot set hasItem to false', 409);
        }
        return menu_repository_js_1.menuRepository.update(id, data, (0, audit_js_1.getAuditActor)(res));
    }
    async delete(id, res) {
        const existing = await menu_repository_js_1.menuRepository.findById(id);
        if (!existing)
            throw new httpError_js_1.HttpError('Menu not found', 404);
        return menu_repository_js_1.menuRepository.delete(id, (0, audit_js_1.getAuditActor)(res));
    }
    getMenusForUser(role, section) {
        return menu_repository_js_1.menuRepository.findMenusForUser(role, section);
    }
}
exports.menuService = new MenuService();
//# sourceMappingURL=menu.service.js.map