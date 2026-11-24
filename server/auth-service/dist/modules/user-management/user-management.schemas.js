"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.listUsersSchema = exports.userIdSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const list_config_js_1 = require("../../config/list.config.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
exports.userIdSchema = zod_1.z.object({ userId: zod_1.z.string().uuid('Invalid user ID') });
exports.listUsersSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.USER_LIST_CONFIG),
    ...list_config_js_1.USER_LIST_CONFIG.filterFields,
}).strict();
exports.updateUserSchema = zod_1.z.object({
    role: zod_1.z.nativeEnum(client_1.UserRole).optional(),
    section: zod_1.z.nativeEnum(client_1.UserSection).nullable().optional(),
    officeBranchId: zod_1.z.string().uuid('Invalid office branch ID').nullable().optional(),
    branch: zod_1.z.string().trim().min(1).max(200).nullable().optional(),
    email: zod_1.z.string().trim().email('Invalid email address').max(255).transform(value => value.toLowerCase()).nullable().optional(),
    telp: zod_1.z.string().trim().min(1).max(50).nullable().optional(),
    isActive: zod_1.z.boolean().optional(),
    version: zod_1.z.number().int().positive(),
}).strict().refine(({ version: _version, ...fields }) => Object.keys(fields).length > 0, 'At least one user field is required').superRefine((value, context) => {
    // officeBranchId and branch always travel as an explicit pair so the stored
    // branch id and its display name can never drift apart.
    if ((value.officeBranchId === undefined) !== (value.branch === undefined)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['branch'],
            message: 'officeBranchId and branch must be sent together',
        });
        return;
    }
    if (value.officeBranchId === null && value.branch !== null) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['branch'],
            message: 'branch must be null when officeBranchId is cleared',
        });
    }
    if (value.officeBranchId !== undefined && value.officeBranchId !== null && value.branch === null) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ['branch'],
            message: 'branch name is required when officeBranchId is set',
        });
    }
});
//# sourceMappingURL=user-management.schemas.js.map