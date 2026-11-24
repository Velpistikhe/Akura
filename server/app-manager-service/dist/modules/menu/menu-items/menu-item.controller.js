"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemController = void 0;
const menu_item_service_js_1 = require("./menu-item.service.js");
exports.menuItemController = {
    async list(req, res) {
        const result = await menu_item_service_js_1.menuItemService.list(res.locals.query);
        res.status(200).json({ status: 200, success: true, message: 'Menu items retrieved successfully', data: result, requestId: req.headers['x-request-id'] });
    },
    async get(req, res) {
        const item = await menu_item_service_js_1.menuItemService.get(res.locals.params.menuItemId);
        res.status(200).json({ status: 200, success: true, message: 'Menu item retrieved successfully', data: item, requestId: req.headers['x-request-id'] });
    },
    async create(req, res) {
        const item = await menu_item_service_js_1.menuItemService.create(res.locals.body, res);
        res.status(201).json({ status: 201, success: true, message: 'Menu item created successfully', data: item, requestId: req.headers['x-request-id'] });
    },
    async update(req, res) {
        const item = await menu_item_service_js_1.menuItemService.update(res.locals.params.menuItemId, res.locals.body, res);
        res.status(200).json({ status: 200, success: true, message: 'Menu item updated successfully', data: item, requestId: req.headers['x-request-id'] });
    },
    async delete(req, res) {
        const item = await menu_item_service_js_1.menuItemService.delete(res.locals.params.menuItemId, res);
        res.status(200).json({ status: 200, success: true, message: 'Menu item deleted successfully', data: item, requestId: req.headers['x-request-id'] });
    },
};
//# sourceMappingURL=menu-item.controller.js.map