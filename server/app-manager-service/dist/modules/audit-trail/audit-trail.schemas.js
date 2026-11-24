"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAuditTrailSchema = exports.AUDIT_TRAIL_LIST_CONFIG = exports.auditTrailEntitySchema = void 0;
const zod_1 = require("zod");
const listQuery_js_1 = require("../../utils/listQuery.js");
/** The audit trail of one entity is read by its identifier. */
exports.auditTrailEntitySchema = zod_1.z.object({
    entityId: zod_1.z.string().uuid('Invalid entity ID'),
}).strict();
/** The audit trail can be filtered by module, entity and action. */
exports.AUDIT_TRAIL_LIST_CONFIG = {
    sortFields: ['createdAt', 'module', 'entityType', 'action'],
    pagination: { defaultPage: 1, defaultLimit: 50, maxLimit: 200 },
    filterFields: {
        module: zod_1.z.enum(['menu', 'reference']).optional(),
        entityType: zod_1.z.enum(['MENU', 'MENU_ITEM', 'MENU_ACCESS', 'OFFICE_BRANCH']).optional(),
        entityId: zod_1.z.string().uuid('Invalid entity ID').optional(),
        action: zod_1.z.enum(['CREATE', 'UPDATE', 'DELETE', 'DEACTIVATE', 'ACTIVATE']).optional(),
    },
};
exports.listAuditTrailSchema = zod_1.z.object({
    ...(0, listQuery_js_1.createListQueryFields)(exports.AUDIT_TRAIL_LIST_CONFIG),
    ...exports.AUDIT_TRAIL_LIST_CONFIG.filterFields,
}).strict();
//# sourceMappingURL=audit-trail.schemas.js.map