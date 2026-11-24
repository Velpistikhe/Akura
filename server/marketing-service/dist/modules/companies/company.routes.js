"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const validate_middleware_js_1 = require("../../middlewares/validate.middleware.js");
const company_controller_js_1 = require("./company.controller.js");
const company_schemas_js_1 = require("./company.schemas.js");
const router = (0, express_1.Router)();
router.get('/:companyId/history', (0, validate_middleware_js_1.validate)('params', company_schemas_js_1.companyIdSchema), (0, validate_middleware_js_1.validate)('query', company_schemas_js_1.companyHistorySchema), (0, asyncHandler_js_1.asyncHandler)(company_controller_js_1.companyController.history));
router.get('/:companyId/staff-history', (0, validate_middleware_js_1.validate)('params', company_schemas_js_1.companyIdSchema), (0, validate_middleware_js_1.validate)('query', company_schemas_js_1.companyHistorySchema), (0, asyncHandler_js_1.asyncHandler)(company_controller_js_1.companyController.staffHistory));
router.get('/', (0, validate_middleware_js_1.validate)('query', company_schemas_js_1.listCompaniesSchema), (0, asyncHandler_js_1.asyncHandler)(company_controller_js_1.companyController.list));
router.get('/:companyId', (0, validate_middleware_js_1.validate)('params', company_schemas_js_1.companyIdSchema), (0, asyncHandler_js_1.asyncHandler)(company_controller_js_1.companyController.get));
router.post('/', (0, validate_middleware_js_1.validate)('body', company_schemas_js_1.createCompanySchema), (0, asyncHandler_js_1.asyncHandler)(company_controller_js_1.companyController.create));
router.patch('/:companyId', (0, validate_middleware_js_1.validate)('params', company_schemas_js_1.companyIdSchema), (0, validate_middleware_js_1.validate)('body', company_schemas_js_1.updateCompanySchema), (0, asyncHandler_js_1.asyncHandler)(company_controller_js_1.companyController.update));
exports.default = router;
//# sourceMappingURL=company.routes.js.map