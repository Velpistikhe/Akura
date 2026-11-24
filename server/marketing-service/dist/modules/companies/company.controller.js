"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyController = void 0;
const company_service_js_1 = require("./company.service.js");
const company_repository_js_1 = require("./company.repository.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const send = (req, res, status, message, data) => {
    res.status(status).json({ status, success: true, message, data, requestId: req.headers['x-request-id'] });
};
exports.companyController = {
    async history(req, res) { send(req, res, 200, 'Company history retrieved successfully', await company_repository_js_1.companyRepository.history(res.locals.params.companyId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query)); },
    async staffHistory(req, res) { send(req, res, 200, 'Company staff history retrieved successfully', await company_repository_js_1.companyRepository.staffHistory(res.locals.params.companyId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query)); },
    async list(req, res) { send(req, res, 200, 'Companies retrieved successfully', await company_service_js_1.companyService.list(res.locals.query, (0, officeBranch_js_1.getOfficeBranchId)(res))); },
    async get(req, res) { send(req, res, 200, 'Company retrieved successfully', await company_service_js_1.companyService.get(res.locals.params.companyId, (0, officeBranch_js_1.getOfficeBranchId)(res))); },
    async create(req, res) { send(req, res, 201, 'Company created successfully', await company_service_js_1.companyService.create(res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    async update(req, res) { send(req, res, 200, 'Company updated successfully', await company_service_js_1.companyService.update(res.locals.params.companyId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
};
//# sourceMappingURL=company.controller.js.map