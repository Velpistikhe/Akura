"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_middleware_js_1 = require("../../../middlewares/authorize.middleware.js");
const validate_middleware_js_1 = require("../../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../../utils/asyncHandler.js");
const office_branch_controller_js_1 = require("./office-branch.controller.js");
const office_branch_schemas_js_1 = require("./office-branch.schemas.js");
const router = (0, express_1.Router)();
router.use((0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireAppManager));
router.get('/', (0, validate_middleware_js_1.validate)('query', office_branch_schemas_js_1.listOfficeBranchesSchema), (0, asyncHandler_js_1.asyncHandler)(office_branch_controller_js_1.officeBranchController.list));
router.get('/options', (0, asyncHandler_js_1.asyncHandler)(office_branch_controller_js_1.officeBranchController.listOptions));
router.get('/:officeBranchId', (0, validate_middleware_js_1.validate)('params', office_branch_schemas_js_1.officeBranchIdSchema), (0, asyncHandler_js_1.asyncHandler)(office_branch_controller_js_1.officeBranchController.get));
router.post('/', (0, validate_middleware_js_1.validate)('body', office_branch_schemas_js_1.createOfficeBranchSchema), (0, asyncHandler_js_1.asyncHandler)(office_branch_controller_js_1.officeBranchController.create));
router.patch('/:officeBranchId', (0, validate_middleware_js_1.validate)('params', office_branch_schemas_js_1.officeBranchIdSchema), (0, validate_middleware_js_1.validate)('body', office_branch_schemas_js_1.updateOfficeBranchSchema), (0, asyncHandler_js_1.asyncHandler)(office_branch_controller_js_1.officeBranchController.update));
exports.default = router;
//# sourceMappingURL=office-branch.routes.js.map