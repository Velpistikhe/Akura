"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_middleware_js_1 = require("../../../middlewares/authorize.middleware.js");
const validate_middleware_js_1 = require("../../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../../utils/asyncHandler.js");
const menu_item_controller_js_1 = require("./menu-item.controller.js");
const menu_item_schemas_js_1 = require("./menu-item.schemas.js");
const router = (0, express_1.Router)();
router.use((0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireAppManager));
router.get('/', (0, validate_middleware_js_1.validate)('query', menu_item_schemas_js_1.listMenuItemsSchema), (0, asyncHandler_js_1.asyncHandler)(menu_item_controller_js_1.menuItemController.list));
router.get('/:menuItemId', (0, validate_middleware_js_1.validate)('params', menu_item_schemas_js_1.menuItemIdSchema), (0, asyncHandler_js_1.asyncHandler)(menu_item_controller_js_1.menuItemController.get));
router.post('/', (0, validate_middleware_js_1.validate)('body', menu_item_schemas_js_1.createMenuItemSchema), (0, asyncHandler_js_1.asyncHandler)(menu_item_controller_js_1.menuItemController.create));
router.patch('/:menuItemId', (0, validate_middleware_js_1.validate)('params', menu_item_schemas_js_1.menuItemIdSchema), (0, validate_middleware_js_1.validate)('body', menu_item_schemas_js_1.updateMenuItemSchema), (0, asyncHandler_js_1.asyncHandler)(menu_item_controller_js_1.menuItemController.update));
router.delete('/:menuItemId', (0, validate_middleware_js_1.validate)('params', menu_item_schemas_js_1.menuItemIdSchema), (0, asyncHandler_js_1.asyncHandler)(menu_item_controller_js_1.menuItemController.delete));
exports.default = router;
//# sourceMappingURL=menu-item.routes.js.map