"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_schemas_js_1 = require("./auth.schemas.js");
const auth_controller_js_1 = require("./auth.controller.js");
const auth_middleware_js_1 = require("./auth.middleware.js");
const validate_middleware_js_1 = require("../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const router = (0, express_1.Router)();
router.post('/register', (0, validate_middleware_js_1.validateBody)(auth_schemas_js_1.registerSchema), (0, asyncHandler_js_1.asyncHandler)(auth_controller_js_1.authController.register));
router.post('/login', (0, validate_middleware_js_1.validateBody)(auth_schemas_js_1.loginSchema), (0, asyncHandler_js_1.asyncHandler)(auth_controller_js_1.authController.login));
router.post('/refresh-token', (0, asyncHandler_js_1.asyncHandler)(auth_controller_js_1.authController.refreshToken));
router.post('/logout', (0, asyncHandler_js_1.asyncHandler)(auth_controller_js_1.authController.logout));
router.use(auth_middleware_js_1.authenticate);
router.get('/me', (0, asyncHandler_js_1.asyncHandler)(auth_controller_js_1.authController.getProfile));
router.put('/profile', (0, validate_middleware_js_1.validateBody)(auth_schemas_js_1.updateProfileSchema), (0, asyncHandler_js_1.asyncHandler)(auth_controller_js_1.authController.updateProfile));
router.put('/password', (0, validate_middleware_js_1.validateBody)(auth_schemas_js_1.changePasswordSchema), (0, asyncHandler_js_1.asyncHandler)(auth_controller_js_1.authController.changePassword));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map