"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyStaffController = void 0;
const company_staff_service_js_1 = require("./company-staff.service.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const send = (req, res, status, message, data) => {
    res.status(status).json({ status, success: true, message, data, requestId: req.headers['x-request-id'] });
};
exports.companyStaffController = {
    async history(req, res) { send(req, res, 200, 'Company staff history retrieved successfully', await company_staff_service_js_1.companyStaffService.history(res.locals.params.companyStaffId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query)); },
    async list(req, res) { send(req, res, 200, 'Company staff retrieved successfully', await company_staff_service_js_1.companyStaffService.list(res.locals.query, (0, officeBranch_js_1.getOfficeBranchId)(res))); },
    async get(req, res) { send(req, res, 200, 'Company staff retrieved successfully', await company_staff_service_js_1.companyStaffService.get(res.locals.params.companyStaffId, (0, officeBranch_js_1.getOfficeBranchId)(res))); },
    async create(req, res) { send(req, res, 201, 'Company staff created successfully', await company_staff_service_js_1.companyStaffService.create(res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    async update(req, res) { send(req, res, 200, 'Company staff updated successfully', await company_staff_service_js_1.companyStaffService.update(res.locals.params.companyStaffId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    async delete(req, res) { send(req, res, 200, 'Company staff deleted successfully', await company_staff_service_js_1.companyStaffService.delete(res.locals.params.companyStaffId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.body.version, (0, officeBranch_js_1.getAuditActor)(res))); },
};
//# sourceMappingURL=company-staff.controller.js.map