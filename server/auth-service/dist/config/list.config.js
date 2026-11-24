"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_LIST_CONFIG = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.USER_LIST_CONFIG = {
    sortFields: ['username', 'firstName', 'lastName', 'role', 'section', 'officeBranchId', 'isActive', 'updatedAt'],
    filterFields: {
        search: zod_1.z.string().trim().min(1).max(100).optional(),
        role: zod_1.z.nativeEnum(client_1.UserRole).optional(),
        section: zod_1.z.nativeEnum(client_1.UserSection).optional(),
        officeBranchId: zod_1.z.string().uuid('Invalid office branch ID').optional(),
        isActive: zod_1.z.enum(['true', 'false']).transform((value) => value === 'true').optional(),
    },
    pagination: {
        defaultPage: 1,
        defaultLimit: 20,
        maxLimit: 100,
    },
};
//# sourceMappingURL=list.config.js.map