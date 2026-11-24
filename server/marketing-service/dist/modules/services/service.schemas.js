"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInspectionScopeSchema = exports.inspectionScopeIdSchema = exports.updateServiceSchema = exports.serviceHistorySchema = exports.deactivateServiceSchema = exports.createMaintenanceScopeSchema = exports.createServiceSchema = exports.listServicesSchema = exports.maintenanceScopeIdSchema = exports.serviceIdSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const list_config_js_1 = require("../../config/list.config.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
const item_schemas_js_1 = require("../items/item.schemas.js");
const fields = {
    type: zod_1.z.nativeEnum(client_1.ServiceType),
    name: zod_1.z.string().trim().min(1).max(200).transform(value => value.normalize('NFKC').replace(/\s+/g, ' ').trim()),
};
const inspectionScopeList = zod_1.z.array(zod_1.z.string().trim().min(1).max(500)).max(100)
    .refine((values) => new Set(values).size === values.length, 'Inspection scopes must be unique');
const maintenanceScopeList = zod_1.z.array(zod_1.z.string().trim().min(1).max(500)).max(100)
    .refine((values) => new Set(values).size === values.length, 'Maintenance scopes must be unique');
exports.serviceIdSchema = zod_1.z.object({ serviceId: zod_1.z.string().uuid() });
exports.maintenanceScopeIdSchema = zod_1.z.object({
    serviceId: zod_1.z.string().uuid(),
    scopeId: zod_1.z.string().uuid(),
}).strict();
exports.listServicesSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.SERVICE_LIST_CONFIG),
    ...list_config_js_1.SERVICE_LIST_CONFIG.filterFields,
}).strict();
exports.createServiceSchema = zod_1.z.object({
    ...fields,
    inspectionScopes: inspectionScopeList.optional().default([]),
    hasMaintenance: zod_1.z.boolean(),
    maintenanceScopes: maintenanceScopeList.optional().default([]),
}).strict().superRefine((value, ctx) => {
    if (value.hasMaintenance && value.maintenanceScopes.length === 0) {
        ctx.addIssue({ code: zod_1.z.ZodIssueCode.custom, path: ['maintenanceScopes'], message: 'At least one maintenance scope is required when hasMaintenance is true' });
    }
    if (!value.hasMaintenance && value.maintenanceScopes.length > 0) {
        ctx.addIssue({ code: zod_1.z.ZodIssueCode.custom, path: ['maintenanceScopes'], message: 'Maintenance scopes require hasMaintenance to be true' });
    }
});
exports.createMaintenanceScopeSchema = zod_1.z.object({
    scope: zod_1.z.string().trim().min(1).max(500),
}).strict();
exports.deactivateServiceSchema = item_schemas_js_1.versionSchema;
exports.serviceHistorySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
}).strict();
exports.updateServiceSchema = item_schemas_js_1.versionSchema.extend({
    type: fields.type.optional(),
    name: fields.name.optional(),
    hasMaintenance: zod_1.z.boolean().optional(),
})
    .refine((value) => value.type !== undefined || value.name !== undefined || value.hasMaintenance !== undefined, 'At least one editable field is required');
exports.inspectionScopeIdSchema = zod_1.z.object({ serviceId: zod_1.z.string().uuid(), inspectionScopeId: zod_1.z.string().uuid() }).strict();
exports.createInspectionScopeSchema = zod_1.z.object({ inspectionScope: zod_1.z.string().trim().min(1).max(500) }).strict();
//# sourceMappingURL=service.schemas.js.map