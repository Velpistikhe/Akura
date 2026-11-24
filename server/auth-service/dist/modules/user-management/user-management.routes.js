"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../auth/auth.middleware.js");
const user_management_middleware_js_1 = require("./user-management.middleware.js");
const validate_middleware_js_1 = require("../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const user_management_controller_js_1 = require("./user-management.controller.js");
const user_management_schemas_js_1 = require("./user-management.schemas.js");
const router = (0, express_1.Router)();
// Every route requires a valid access token. The list is available to any
// authenticated caller, because the visibility scope follows the caller's role;
// reading and updating a single user stay reserved for an app manager.
router.use(auth_middleware_js_1.authenticate);
router.get('/', (0, validate_middleware_js_1.validate)('query', user_management_schemas_js_1.listUsersSchema), (0, asyncHandler_js_1.asyncHandler)(user_management_controller_js_1.userManagementController.list));
router.get('/:userId', (0, asyncHandler_js_1.asyncHandler)(user_management_middleware_js_1.requireAppManager), (0, validate_middleware_js_1.validate)('params', user_management_schemas_js_1.userIdSchema), (0, asyncHandler_js_1.asyncHandler)(user_management_controller_js_1.userManagementController.get));
router.patch('/:userId', (0, asyncHandler_js_1.asyncHandler)(user_management_middleware_js_1.requireAppManager), (0, validate_middleware_js_1.validate)('params', user_management_schemas_js_1.userIdSchema), (0, validate_middleware_js_1.validate)('body', user_management_schemas_js_1.updateUserSchema), (0, asyncHandler_js_1.asyncHandler)(user_management_controller_js_1.userManagementController.update));
exports.default = router;
//# sourceMappingURL=user-management.routes.js.map