"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuAccessService = void 0;
const db_js_1 = require("../../../config/db.js");
const httpError_js_1 = require("../../../utils/httpError.js");
const audit_js_1 = require("../../../utils/audit.js");
const menu_access_repository_js_1 = require("./menu-access.repository.js");
class MenuAccessService {
    list(input) {
        return menu_access_repository_js_1.menuAccessRepository.list(input);
    }
    async get(id) {
        const access = await menu_access_repository_js_1.menuAccessRepository.findActiveById(id);
        if (!access)
            throw new httpError_js_1.HttpError('Menu access not found', 404);
        return access;
    }
    async create(data, res) {
        const menuItem = await db_js_1.prisma.menuItem.findUnique({ where: { id: data.menuItemId, isDeleted: false, isActive: true, menu: { isDeleted: false, isActive: true } }, select: { id: true } });
        if (!menuItem)
            throw new httpError_js_1.HttpError('Menu item not found', 404);
        const conflict = await menu_access_repository_js_1.menuAccessRepository.findByRule(data.menuItemId, data.role, data.section);
        if (conflict)
            throw new httpError_js_1.HttpError('Menu access rule already exists', 409);
        return menu_access_repository_js_1.menuAccessRepository.create(data, (0, audit_js_1.getAuditActor)(res));
    }
    async update(id, data, res) {
        const existing = await menu_access_repository_js_1.menuAccessRepository.findById(id);
        if (!existing)
            throw new httpError_js_1.HttpError('Menu access not found', 404);
        const menuItemId = data.menuItemId ?? existing.menuItemId;
        const role = data.role !== undefined ? data.role : existing.role;
        const section = data.section !== undefined ? data.section : existing.section;
        if (menuItemId !== existing.menuItemId) {
            const menuItem = await db_js_1.prisma.menuItem.findUnique({ where: { id: menuItemId, isDeleted: false, isActive: true, menu: { isDeleted: false, isActive: true } }, select: { id: true } });
            if (!menuItem)
                throw new httpError_js_1.HttpError('Menu item not found', 404);
        }
        const conflict = await menu_access_repository_js_1.menuAccessRepository.findByRule(menuItemId, role, section, id);
        if (conflict)
            throw new httpError_js_1.HttpError('Menu access rule already exists', 409);
        return menu_access_repository_js_1.menuAccessRepository.update(id, data, (0, audit_js_1.getAuditActor)(res));
    }
    async delete(id, res) {
        const existing = await menu_access_repository_js_1.menuAccessRepository.findById(id);
        if (!existing)
            throw new httpError_js_1.HttpError('Menu access not found', 404);
        return menu_access_repository_js_1.menuAccessRepository.delete(id, (0, audit_js_1.getAuditActor)(res));
    }
}
exports.menuAccessService = new MenuAccessService();
//# sourceMappingURL=menu-access.service.js.map