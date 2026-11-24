"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuAccessController = void 0;
const menu_access_service_js_1 = require("./menu-access.service.js");
exports.menuAccessController = {
    async list(req, res) {
        const result = await menu_access_service_js_1.menuAccessService.list(res.locals.query);
        res.status(200).json({ status: 200, success: true, message: 'Menu accesses retrieved successfully', data: result, requestId: req.headers['x-request-id'] });
    },
    async get(req, res) {
        const access = await menu_access_service_js_1.menuAccessService.get(res.locals.params.menuAccessId);
        res.status(200).json({ status: 200, success: true, message: 'Menu access retrieved successfully', data: access, requestId: req.headers['x-request-id'] });
    },
    async create(req, res) {
        const access = await menu_access_service_js_1.menuAccessService.create(res.locals.body, res);
        res.status(201).json({ status: 201, success: true, message: 'Menu access created successfully', data: access, requestId: req.headers['x-request-id'] });
    },
    async update(req, res) {
        const access = await menu_access_service_js_1.menuAccessService.update(res.locals.params.menuAccessId, res.locals.body, res);
        res.status(200).json({ status: 200, success: true, message: 'Menu access updated successfully', data: access, requestId: req.headers['x-request-id'] });
    },
    async delete(req, res) {
        const access = await menu_access_service_js_1.menuAccessService.delete(res.locals.params.menuAccessId, res);
        res.status(200).json({ status: 200, success: true, message: 'Menu access deleted successfully', data: access, requestId: req.headers['x-request-id'] });
    },
};
//# sourceMappingURL=menu-access.controller.js.map