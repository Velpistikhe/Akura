"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_middleware_js_1 = require("../../../middlewares/authorize.middleware.js");
const validate_middleware_js_1 = require("../../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../../utils/asyncHandler.js");
const menu_access_controller_js_1 = require("./menu-access.controller.js");
const menu_access_schemas_js_1 = require("./menu-access.schemas.js");
const router = (0, express_1.Router)();
router.use((0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireAppManager));
router.get('/', (0, validate_middleware_js_1.validate)('query', menu_access_schemas_js_1.listMenuAccessesSchema), (0, asyncHandler_js_1.asyncHandler)(menu_access_controller_js_1.menuAccessController.list));
router.get('/:menuAccessId', (0, validate_middleware_js_1.validate)('params', menu_access_schemas_js_1.menuAccessIdSchema), (0, asyncHandler_js_1.asyncHandler)(menu_access_controller_js_1.menuAccessController.get));
router.post('/', (0, validate_middleware_js_1.validate)('body', menu_access_schemas_js_1.createMenuAccessSchema), (0, asyncHandler_js_1.asyncHandler)(menu_access_controller_js_1.menuAccessController.create));
router.patch('/:menuAccessId', (0, validate_middleware_js_1.validate)('params', menu_access_schemas_js_1.menuAccessIdSchema), (0, validate_middleware_js_1.validate)('body', menu_access_schemas_js_1.updateMenuAccessSchema), (0, asyncHandler_js_1.asyncHandler)(menu_access_controller_js_1.menuAccessController.update));
router.delete('/:menuAccessId', (0, validate_middleware_js_1.validate)('params', menu_access_schemas_js_1.menuAccessIdSchema), (0, asyncHandler_js_1.asyncHandler)(menu_access_controller_js_1.menuAccessController.delete));
exports.default = router;
//# sourceMappingURL=menu-access.routes.js.map