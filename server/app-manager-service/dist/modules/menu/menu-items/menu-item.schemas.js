"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenuItemSchema = exports.createMenuItemSchema = exports.listMenuItemsSchema = exports.menuItemIdSchema = void 0;
const zod_1 = require("zod");
const list_config_js_1 = require("../../../config/list.config.js");
const listQuery_js_1 = require("../../../utils/listQuery.js");
exports.menuItemIdSchema = zod_1.z.object({
    menuItemId: zod_1.z.string().uuid('Invalid menu item ID'),
});
exports.listMenuItemsSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.MENU_ITEM_LIST_CONFIG),
    ...list_config_js_1.MENU_ITEM_LIST_CONFIG.filterFields,
}).strict();
exports.createMenuItemSchema = zod_1.z.object({
    menuId: zod_1.z.string().uuid('Invalid menu ID'),
    key: zod_1.z.string().trim().min(1).max(100).regex(/^[a-z0-9_-]+$/, 'Key can only contain lowercase alphanumeric characters, underscores, and hyphens'),
    label: zod_1.z.string().trim().min(1).max(200),
    order: zod_1.z.number().int().min(0).optional().default(0),
}).strict();
exports.updateMenuItemSchema = zod_1.z.object({
    menuId: zod_1.z.string().uuid().optional(),
    key: zod_1.z.string().trim().min(1).max(100).regex(/^[a-z0-9_-]+$/).optional(),
    label: zod_1.z.string().trim().min(1).max(200).optional(),
    order: zod_1.z.number().int().min(0).optional(),
    isActive: zod_1.z.boolean().optional(),
}).strict();
//# sourceMappingURL=menu-item.schemas.js.map