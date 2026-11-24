"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuController = void 0;
const menu_service_js_1 = require("./menu.service.js");
exports.menuController = {
    async list(req, res) {
        const result = await menu_service_js_1.menuService.list(res.locals.query);
        res.status(200).json({ status: 200, success: true, message: 'Menus retrieved successfully', data: result, requestId: req.headers['x-request-id'] });
    },
    async get(req, res) {
        const menu = await menu_service_js_1.menuService.get(res.locals.params.menuId);
        res.status(200).json({ status: 200, success: true, message: 'Menu retrieved successfully', data: menu, requestId: req.headers['x-request-id'] });
    },
    async create(req, res) {
        const menu = await menu_service_js_1.menuService.create(res.locals.body, res);
        res.status(201).json({ status: 201, success: true, message: 'Menu created successfully', data: menu, requestId: req.headers['x-request-id'] });
    },
    async update(req, res) {
        const menu = await menu_service_js_1.menuService.update(res.locals.params.menuId, res.locals.body, res);
        res.status(200).json({ status: 200, success: true, message: 'Menu updated successfully', data: menu, requestId: req.headers['x-request-id'] });
    },
    async delete(req, res) {
        const menu = await menu_service_js_1.menuService.delete(res.locals.params.menuId, res);
        res.status(200).json({ status: 200, success: true, message: 'Menu deleted successfully', data: menu, requestId: req.headers['x-request-id'] });
    },
    async getMyMenus(req, res) {
        const { role, section } = res.locals.authUser;
        const menus = await menu_service_js_1.menuService.getMenusForUser(role, section);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Menus retrieved successfully',
            data: menus,
            requestId: req.headers['x-request-id'],
        });
    },
};
//# sourceMappingURL=menu.controller.js.map