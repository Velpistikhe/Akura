"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateCompanyStaffSchema = exports.updateCompanyStaffSchema = exports.createCompanyStaffSchema = exports.listCompanyStaffSchema = exports.companyStaffHistorySchema = exports.companyStaffIdSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const list_config_js_1 = require("../../config/list.config.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
exports.companyStaffIdSchema = zod_1.z.object({ companyStaffId: zod_1.z.string().uuid() });
exports.companyStaffHistorySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
}).strict();
exports.listCompanyStaffSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.COMPANY_STAFF_LIST_CONFIG),
    ...list_config_js_1.COMPANY_STAFF_LIST_CONFIG.filterFields,
}).strict();
exports.createCompanyStaffSchema = zod_1.z.object({
    companyId: zod_1.z.string().uuid(),
    name: zod_1.z.string().trim().min(1).max(200),
    title: zod_1.z.nativeEnum(client_1.StaffTitle),
    telp: zod_1.z.string().trim().min(1).max(30).nullable().optional().default(null),
    email: zod_1.z.string().trim().email().max(254).nullable().optional().default(null),
}).strict();
exports.updateCompanyStaffSchema = zod_1.z.object({
    version: zod_1.z.number().int().nonnegative(),
    name: zod_1.z.string().trim().min(1).max(200).optional(),
    title: zod_1.z.nativeEnum(client_1.StaffTitle).optional(),
    telp: zod_1.z.string().trim().min(1).max(30).nullable().optional(),
    email: zod_1.z.string().trim().email().max(254).nullable().optional(),
}).strict().refine((value) => Object.keys(value).some((key) => key !== 'version'), 'At least one editable field is required');
exports.deactivateCompanyStaffSchema = zod_1.z.object({ version: zod_1.z.number().int().nonnegative() }).strict();
//# sourceMappingURL=company-staff.schemas.js.map