"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenuSchema = exports.createMenuSchema = exports.listMenusSchema = exports.menuIdSchema = void 0;
const zod_1 = require("zod");
const list_config_js_1 = require("../../../config/list.config.js");
const listQuery_js_1 = require("../../../utils/listQuery.js");
exports.menuIdSchema = zod_1.z.object({
    menuId: zod_1.z.string().uuid('Invalid menu ID'),
});
exports.listMenusSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.MENU_LIST_CONFIG),
    ...list_config_js_1.MENU_LIST_CONFIG.filterFields,
}).strict();
const menuFields = {
    key: zod_1.z.string().trim().min(1).max(100).regex(/^[a-z0-9_-]+$/, 'Key can only contain lowercase alphanumeric characters, underscores, and hyphens'),
    label: zod_1.z.string().trim().min(1).max(200),
    order: zod_1.z.number().int().min(0).optional().default(0),
};
const nestedMenuItemSchema = zod_1.z.object({
    key: zod_1.z.string().trim().min(1).max(100).regex(/^[a-z0-9_-]+$/, 'Key can only contain lowercase alphanumeric characters, underscores, and hyphens'),
    label: zod_1.z.string().trim().min(1).max(200),
    order: zod_1.z.number().int().min(0).optional().default(0),
}).strict();
exports.createMenuSchema = zod_1.z.discriminatedUnion('hasItem', [
    zod_1.z.object({
        ...menuFields,
        hasItem: zod_1.z.literal(true),
        items: zod_1.z.array(nestedMenuItemSchema).min(1).max(100)
            .refine((items) => new Set(items.map(({ key }) => key)).size === items.length, 'Menu item keys must be unique'),
    }).strict(),
    zod_1.z.object({
        ...menuFields,
        hasItem: zod_1.z.literal(false),
    }).strict(),
]);
exports.updateMenuSchema = zod_1.z.object({
    key: zod_1.z.string().trim().min(1).max(100).regex(/^[a-z0-9_-]+$/).optional(),
    label: zod_1.z.string().trim().min(1).max(200).optional(),
    hasItem: zod_1.z.boolean().optional(),
    order: zod_1.z.number().int().min(0).optional(),
    isActive: zod_1.z.boolean().optional(),
}).strict();
//# sourceMappingURL=menu.schemas.js.map