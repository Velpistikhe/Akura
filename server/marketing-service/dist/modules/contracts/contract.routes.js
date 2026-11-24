"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_js_1 = require("../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const item_schemas_js_1 = require("../items/item.schemas.js");
const contract_schemas_js_1 = require("./contract.schemas.js");
const contract_repository_js_1 = require("./contract.repository.js");
const contract_excel_controller_js_1 = require("./contract-excel.controller.js");
const contract_excel_schemas_js_1 = require("./contract-excel.schemas.js");
const httpError_js_1 = require("../../utils/httpError.js");
const dateOnly_js_1 = require("../../utils/dateOnly.js");
const router = (0, express_1.Router)();
const send = (req, res, data, status = 200) => {
    const payload = data && typeof data === 'object' && 'contractDate' in data
        ? (0, dateOnly_js_1.formatContractDates)(data) : data;
    res.status(status).json({ status, success: true, data: payload, requestId: req.headers['x-request-id'] });
};
const assertMarketingSection = (res) => {
    if (res.locals.authUser?.section !== 'MARKETING')
        throw new httpError_js_1.HttpError('Marketing section is required', 403);
};
const requireMarketingSection = (_req, res, next) => {
    try {
        assertMarketingSection(res);
        next();
    }
    catch (error) {
        next(error);
    }
};
const requireMarketingAdmin = (res) => {
    if (res.locals.authUser?.role !== 'ADMIN' || res.locals.authUser.section !== 'MARKETING')
        throw new httpError_js_1.HttpError('Marketing admin role is required', 403);
};
router.get('/', (0, validate_middleware_js_1.validate)('query', contract_schemas_js_1.listContractsSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { send(req, res, await contract_repository_js_1.contractRepository.list((0, officeBranch_js_1.restrictListVisibility)(res, res.locals.query), (0, officeBranch_js_1.getOfficeBranchId)(res))); }));
router.post('/', (0, validate_middleware_js_1.validate)('body', contract_schemas_js_1.createContractSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { assertMarketingSection(res); const role = res.locals.authUser?.role; if (role !== 'USER' && role !== 'ADMIN')
    throw new httpError_js_1.HttpError('USER or ADMIN role is required', 403); send(req, res, await contract_repository_js_1.contractRepository.create(res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res), role === 'ADMIN'), 201); }));
router.post('/:contractId/prices/import', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), requireMarketingSection, contract_excel_controller_js_1.uploadContractWorkbook, (0, validate_middleware_js_1.validate)('body', contract_excel_schemas_js_1.importContractExcelSchema), (0, asyncHandler_js_1.asyncHandler)(contract_excel_controller_js_1.contractExcelController.upload));
router.get('/:contractId', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { send(req, res, await contract_repository_js_1.contractRepository.get(res.locals.params.contractId, (0, officeBranch_js_1.getOfficeBranchId)(res))); }));
router.get('/:contractId/history', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, validate_middleware_js_1.validate)('query', contract_schemas_js_1.contractHistoryQuerySchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { send(req, res, await contract_repository_js_1.contractRepository.history(res.locals.params.contractId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query)); }));
router.post('/:contractId/submit', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, validate_middleware_js_1.validate)('body', item_schemas_js_1.versionSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { assertMarketingSection(res); send(req, res, await contract_repository_js_1.contractRepository.submit(res.locals.params.contractId, res.locals.body.version, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); }));
router.post('/:contractId/reject', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, validate_middleware_js_1.validate)('body', item_schemas_js_1.versionSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { requireMarketingAdmin(res); send(req, res, await contract_repository_js_1.contractRepository.reject(res.locals.params.contractId, res.locals.body.version, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); }));
router.post('/:contractId/approve', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, validate_middleware_js_1.validate)('body', item_schemas_js_1.versionSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { requireMarketingAdmin(res); send(req, res, await contract_repository_js_1.contractRepository.approve(res.locals.params.contractId, res.locals.body.version, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); }));
router.patch('/:contractId', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, validate_middleware_js_1.validate)('body', contract_schemas_js_1.updateContractSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { assertMarketingSection(res); const isAdmin = res.locals.authUser?.role === 'ADMIN'; send(req, res, await contract_repository_js_1.contractRepository.update(res.locals.params.contractId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res), isAdmin)); }));
router.post('/:contractId/revise', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, validate_middleware_js_1.validate)('body', contract_schemas_js_1.reviseContractSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { assertMarketingSection(res); send(req, res, await contract_repository_js_1.contractRepository.revise(res.locals.params.contractId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)), 201); }));
router.post('/:contractId/terminate', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, validate_middleware_js_1.validate)('body', contract_schemas_js_1.terminateContractSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { requireMarketingAdmin(res); send(req, res, await contract_repository_js_1.contractRepository.terminate(res.locals.params.contractId, res.locals.body.version, res.locals.body.terminatedAt, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); }));
router.delete('/:contractId', (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, validate_middleware_js_1.validate)('body', item_schemas_js_1.versionSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => { assertMarketingSection(res); send(req, res, await contract_repository_js_1.contractRepository.delete(res.locals.params.contractId, res.locals.body.version, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); }));
exports.default = router;
//# sourceMappingURL=contract.routes.js.map