"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOfficeBranchSchema = exports.createOfficeBranchSchema = exports.listOfficeBranchesSchema = exports.officeBranchIdSchema = void 0;
const zod_1 = require("zod");
const list_config_js_1 = require("../../../config/list.config.js");
const listQuery_js_1 = require("../../../utils/listQuery.js");
const officeFields = {
    name: zod_1.z.string().trim().min(1).max(200),
    address: zod_1.z.string().trim().min(1).max(500),
    telp: zod_1.z.string().trim().min(3).max(30).regex(/^[0-9+().\-\s]+$/, 'Phone number contains invalid characters'),
    email: zod_1.z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
    isHead: zod_1.z.boolean().optional().default(false),
};
exports.officeBranchIdSchema = zod_1.z.object({
    officeBranchId: zod_1.z.string().uuid('Invalid office branch ID'),
}).strict();
exports.listOfficeBranchesSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.OFFICE_BRANCH_LIST_CONFIG),
    ...list_config_js_1.OFFICE_BRANCH_LIST_CONFIG.filterFields,
}).strict();
exports.createOfficeBranchSchema = zod_1.z.object(officeFields).strict();
exports.updateOfficeBranchSchema = zod_1.z.object({
    address: officeFields.address.optional(),
    telp: officeFields.telp.optional(),
    email: officeFields.email.optional(),
    isHead: zod_1.z.boolean().optional(),
}).strict().refine((value) => Object.keys(value).length > 0, 'At least one field is required');
//# sourceMappingURL=office-branch.schemas.js.map