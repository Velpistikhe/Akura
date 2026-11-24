"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_js_1 = require("../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const company_staff_controller_js_1 = require("./company-staff.controller.js");
const company_staff_schemas_js_1 = require("./company-staff.schemas.js");
const company_staff_schemas_js_2 = require("./company-staff.schemas.js");
const router = (0, express_1.Router)();
router.get('/:companyStaffId/history', (0, validate_middleware_js_1.validate)('params', company_staff_schemas_js_2.companyStaffIdSchema), (0, validate_middleware_js_1.validate)('query', company_staff_schemas_js_1.companyStaffHistorySchema), (0, asyncHandler_js_1.asyncHandler)(company_staff_controller_js_1.companyStaffController.history));
router.get('/', (0, validate_middleware_js_1.validate)('query', company_staff_schemas_js_2.listCompanyStaffSchema), (0, asyncHandler_js_1.asyncHandler)(company_staff_controller_js_1.companyStaffController.list));
router.get('/:companyStaffId', (0, validate_middleware_js_1.validate)('params', company_staff_schemas_js_2.companyStaffIdSchema), (0, asyncHandler_js_1.asyncHandler)(company_staff_controller_js_1.companyStaffController.get));
router.post('/', (0, validate_middleware_js_1.validate)('body', company_staff_schemas_js_2.createCompanyStaffSchema), (0, asyncHandler_js_1.asyncHandler)(company_staff_controller_js_1.companyStaffController.create));
router.patch('/:companyStaffId', (0, validate_middleware_js_1.validate)('params', company_staff_schemas_js_2.companyStaffIdSchema), (0, validate_middleware_js_1.validate)('body', company_staff_schemas_js_2.updateCompanyStaffSchema), (0, asyncHandler_js_1.asyncHandler)(company_staff_controller_js_1.companyStaffController.update));
router.delete('/:companyStaffId', (0, validate_middleware_js_1.validate)('params', company_staff_schemas_js_2.companyStaffIdSchema), (0, validate_middleware_js_1.validate)('body', company_staff_schemas_js_2.deactivateCompanyStaffSchema), (0, asyncHandler_js_1.asyncHandler)(company_staff_controller_js_1.companyStaffController.delete));
exports.default = router;
//# sourceMappingURL=company-staff.routes.js.map