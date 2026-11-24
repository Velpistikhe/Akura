"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyHistorySchema = exports.deactivateCompanySchema = exports.updateCompanySchema = exports.createCompanySchema = exports.listCompaniesSchema = exports.companyIdSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const list_config_js_1 = require("../../config/list.config.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
const fields = {
    npwp: zod_1.z.string().trim().min(1).max(32),
    name: zod_1.z.string().trim().min(1).max(200),
    type: zod_1.z.nativeEnum(client_1.CompanyType),
    address: zod_1.z.string().trim().min(1).max(500),
};
exports.companyIdSchema = zod_1.z.object({ companyId: zod_1.z.string().uuid() });
exports.listCompaniesSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.COMPANY_LIST_CONFIG),
    ...list_config_js_1.COMPANY_LIST_CONFIG.filterFields,
}).strict();
exports.createCompanySchema = zod_1.z.object({ ...fields, isSisterCompany: zod_1.z.boolean().optional().default(false) }).strict();
exports.updateCompanySchema = zod_1.z.object({
    version: zod_1.z.number().int().nonnegative(),
    npwp: fields.npwp.optional(),
    name: fields.name.optional(), type: fields.type.optional(), address: fields.address.optional(), isSisterCompany: zod_1.z.boolean().optional(),
}).strict().refine((value) => Object.keys(value).some((key) => key !== 'version'), 'At least one editable field is required');
exports.deactivateCompanySchema = zod_1.z.object({ version: zod_1.z.number().int().nonnegative() }).strict();
exports.companyHistorySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
}).strict();
//# sourceMappingURL=company.schemas.js.map