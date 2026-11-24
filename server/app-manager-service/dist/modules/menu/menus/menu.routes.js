"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_middleware_js_1 = require("../../../middlewares/authorize.middleware.js");
const validate_middleware_js_1 = require("../../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../../utils/asyncHandler.js");
const menu_controller_js_1 = require("./menu.controller.js");
const menu_schemas_js_1 = require("./menu.schemas.js");
const router = (0, express_1.Router)();
// ─── Endpoint publik (semua role aktif) ───────────────────────────────────────
router.get('/my-menus', (0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireAuthenticated), (0, asyncHandler_js_1.asyncHandler)(menu_controller_js_1.menuController.getMyMenus));
// ─── CRUD — hanya app_manager ─────────────────────────────────────────────────
router.use((0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireAppManager));
router.get('/', (0, validate_middleware_js_1.validate)('query', menu_schemas_js_1.listMenusSchema), (0, asyncHandler_js_1.asyncHandler)(menu_controller_js_1.menuController.list));
router.get('/:menuId', (0, validate_middleware_js_1.validate)('params', menu_schemas_js_1.menuIdSchema), (0, asyncHandler_js_1.asyncHandler)(menu_controller_js_1.menuController.get));
router.post('/', (0, validate_middleware_js_1.validate)('body', menu_schemas_js_1.createMenuSchema), (0, asyncHandler_js_1.asyncHandler)(menu_controller_js_1.menuController.create));
router.patch('/:menuId', (0, validate_middleware_js_1.validate)('params', menu_schemas_js_1.menuIdSchema), (0, validate_middleware_js_1.validate)('body', menu_schemas_js_1.updateMenuSchema), (0, asyncHandler_js_1.asyncHandler)(menu_controller_js_1.menuController.update));
router.delete('/:menuId', (0, validate_middleware_js_1.validate)('params', menu_schemas_js_1.menuIdSchema), (0, asyncHandler_js_1.asyncHandler)(menu_controller_js_1.menuController.delete));
exports.default = router;
//# sourceMappingURL=menu.routes.js.map