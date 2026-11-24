"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.officeBranchController = void 0;
const office_branch_service_js_1 = require("./office-branch.service.js");
const send = (req, res, status, message, data) => {
    res.status(status).json({ status, success: true, message, data, requestId: req.headers['x-request-id'] });
};
exports.officeBranchController = {
    async listOptions(req, res) {
        send(req, res, 200, 'Office branch options retrieved successfully', await office_branch_service_js_1.officeBranchService.listOptions());
    },
    async list(req, res) {
        send(req, res, 200, 'Office branches retrieved successfully', await office_branch_service_js_1.officeBranchService.list(res.locals.query));
    },
    async get(req, res) {
        send(req, res, 200, 'Office branch retrieved successfully', await office_branch_service_js_1.officeBranchService.get(res.locals.params.officeBranchId));
    },
    async create(req, res) {
        send(req, res, 201, 'Office branch created successfully', await office_branch_service_js_1.officeBranchService.create(res.locals.body, res));
    },
    async update(req, res) {
        send(req, res, 200, 'Office branch updated successfully', await office_branch_service_js_1.officeBranchService.update(res.locals.params.officeBranchId, res.locals.body, res));
    },
};
//# sourceMappingURL=office-branch.controller.js.map