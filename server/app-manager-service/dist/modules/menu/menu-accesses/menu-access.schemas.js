"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenuAccessSchema = exports.createMenuAccessSchema = exports.listMenuAccessesSchema = exports.menuAccessIdSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const list_config_js_1 = require("../../../config/list.config.js");
const listQuery_js_1 = require("../../../utils/listQuery.js");
exports.menuAccessIdSchema = zod_1.z.object({
    menuAccessId: zod_1.z.string().uuid('Invalid menu access ID'),
}).strict();
exports.listMenuAccessesSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.MENU_ACCESS_LIST_CONFIG),
    ...list_config_js_1.MENU_ACCESS_LIST_CONFIG.filterFields,
}).strict();
exports.createMenuAccessSchema = zod_1.z.object({
    menuItemId: zod_1.z.string().uuid('Invalid menu item ID'),
    role: zod_1.z.nativeEnum(client_1.UserRole).nullable().optional().default(null),
    section: zod_1.z.nativeEnum(client_1.UserSection).nullable().optional().default(null),
}).strict();
exports.updateMenuAccessSchema = zod_1.z.object({
    menuItemId: zod_1.z.string().uuid('Invalid menu item ID').optional(),
    role: zod_1.z.nativeEnum(client_1.UserRole).nullable().optional(),
    section: zod_1.z.nativeEnum(client_1.UserSection).nullable().optional(),
}).strict().refine((data) => Object.keys(data).length > 0, 'At least one field is required');
//# sourceMappingURL=menu-access.schemas.js.map