"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemService = void 0;
const db_js_1 = require("../../../config/db.js");
const httpError_js_1 = require("../../../utils/httpError.js");
const audit_js_1 = require("../../../utils/audit.js");
const menu_item_repository_js_1 = require("./menu-item.repository.js");
class MenuItemService {
    list(input) {
        return menu_item_repository_js_1.menuItemRepository.list(input);
    }
    async get(id) {
        const item = await menu_item_repository_js_1.menuItemRepository.findActiveById(id);
        if (!item)
            throw new httpError_js_1.HttpError('Menu item not found', 404);
        return item;
    }
    async create(data, res) {
        // Cek menu exists
        const menu = await db_js_1.prisma.menu.findUnique({ where: { id: data.menuId, isDeleted: false, isActive: true }, select: { hasItem: true } });
        if (!menu)
            throw new httpError_js_1.HttpError('Menu not found', 404);
        if (!menu.hasItem)
            throw new httpError_js_1.HttpError('Menu does not allow items', 409);
        // Cek duplikasi key
        const existing = await menu_item_repository_js_1.menuItemRepository.findByKey(data.key);
        if (existing)
            throw new httpError_js_1.HttpError(`Menu item with key '${data.key}' already exists`, 409);
        return menu_item_repository_js_1.menuItemRepository.create({
            menuId: data.menuId,
            key: data.key,
            label: data.label,
            order: data.order,
        }, (0, audit_js_1.getAuditActor)(res));
    }
    async update(id, data, res) {
        const existing = await menu_item_repository_js_1.menuItemRepository.findById(id);
        if (!existing)
            throw new httpError_js_1.HttpError('Menu item not found', 404);
        // Cek duplikasi key jika key diubah
        if (data.key && data.key !== existing.key) {
            const conflict = await menu_item_repository_js_1.menuItemRepository.findByKey(data.key);
            if (conflict)
                throw new httpError_js_1.HttpError(`Menu item with key '${data.key}' already exists`, 409);
        }
        // Cek menu baru exists jika menuId diubah
        if (data.menuId && data.menuId !== existing.menuId) {
            const menu = await db_js_1.prisma.menu.findUnique({ where: { id: data.menuId, isDeleted: false, isActive: true }, select: { hasItem: true } });
            if (!menu)
                throw new httpError_js_1.HttpError('Menu not found', 404);
            if (!menu.hasItem)
                throw new httpError_js_1.HttpError('Menu does not allow items', 409);
        }
        return menu_item_repository_js_1.menuItemRepository.update(id, data, (0, audit_js_1.getAuditActor)(res));
    }
    async delete(id, res) {
        const existing = await menu_item_repository_js_1.menuItemRepository.findById(id);
        if (!existing)
            throw new httpError_js_1.HttpError('Menu item not found', 404);
        return menu_item_repository_js_1.menuItemRepository.delete(id, (0, audit_js_1.getAuditActor)(res));
    }
}
exports.menuItemService = new MenuItemService();
//# sourceMappingURL=menu-item.service.js.map