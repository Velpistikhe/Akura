"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OFFICE_BRANCH_LIST_CONFIG = exports.MENU_ITEM_LIST_CONFIG = exports.MENU_ACCESS_LIST_CONFIG = exports.MENU_LIST_CONFIG = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const pagination = (defaultLimit = 20) => ({
    defaultPage: 1,
    defaultLimit,
    maxLimit: 100,
});
const booleanFilter = zod_1.z.enum(['true', 'false']).transform((value) => value === 'true').optional();
const searchFilter = zod_1.z.string().trim().min(1).max(100).optional();
exports.MENU_LIST_CONFIG = {
    sortFields: ['key', 'label', 'hasItem', 'order', 'isActive', 'updatedAt'],
    filterFields: {
        search: searchFilter,
        hasItem: booleanFilter,
        isActive: booleanFilter,
    },
    pagination: pagination(),
};
exports.MENU_ACCESS_LIST_CONFIG = {
    sortFields: ['menuItemId', 'role', 'section', 'updatedAt'],
    filterFields: {
        menuItemId: zod_1.z.string().uuid('Invalid menu item ID').optional(),
        role: zod_1.z.nativeEnum(client_1.UserRole).optional(),
        section: zod_1.z.nativeEnum(client_1.UserSection).optional(),
    },
    pagination: pagination(),
};
exports.MENU_ITEM_LIST_CONFIG = {
    sortFields: ['menuId', 'key', 'label', 'order', 'isActive', 'updatedAt'],
    filterFields: {
        menuId: zod_1.z.string().uuid('Invalid menu ID').optional(),
        isActive: booleanFilter,
        search: searchFilter,
    },
    pagination: pagination(50),
};
exports.OFFICE_BRANCH_LIST_CONFIG = {
    sortFields: ['name', 'address', 'telp', 'email', 'isHead', 'updatedAt'],
    filterFields: {
        search: searchFilter,
        isHead: booleanFilter,
    },
    pagination: pagination(),
};
//# sourceMappingURL=list.config.js.map