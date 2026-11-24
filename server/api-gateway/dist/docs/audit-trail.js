"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditTrailPaths = exports.auditTrailSchemas = void 0;
const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const uuid = { type: 'string', format: 'uuid' };
const text = { type: 'string' };
const object = (properties, required = []) => ({ type: 'object', additionalProperties: false, properties, required });
const envelope = (data) => object({ status: { type: 'integer' }, success: { type: 'boolean' }, message: text, data, requestId: text }, ['status', 'success', 'message', 'data']);
const security = [{ bearerAuth: [] }, { accessTokenCookie: [] }];
exports.auditTrailSchemas = {};
exports.auditTrailPaths = {};
// The audit trail is append-only: every write of a managed entity stores one
// entry with the state before and after the change. The version is a string
// because the database holds a BigInt and JSON has no BigInt.
exports.auditTrailSchemas['AuditTrailEntry'] = object({
    id: uuid,
    module: { type: 'string', enum: ['menu', 'reference'], description: 'Owning module of the changed entity.' },
    entityType: { type: 'string', enum: ['MENU', 'MENU_ITEM', 'MENU_ACCESS', 'OFFICE_BRANCH'], description: 'Type of the changed entity.' },
    entityId: uuid,
    version: { type: 'string', description: 'Version of the entity state this entry describes. Entities without a version column record the millisecond timestamp of the change.' },
    action: { type: 'string', enum: ['CREATE', 'UPDATE', 'DELETE', 'DEACTIVATE', 'ACTIVATE'], description: 'Change that produced this entry.' },
    before: { type: 'object', nullable: true, additionalProperties: true, description: 'Entity state before the change. Null for a creation.' },
    after: { type: 'object', additionalProperties: true, description: 'Entity state after the change.' },
    officeBranchId: { ...uuid, nullable: true, description: 'Office branch of the changed entity. Null for global configuration such as menus and menu accesses.' },
    createdById: uuid,
    createdByName: text,
    createdAt: { type: 'string', format: 'date-time' },
}, ['id', 'module', 'entityType', 'entityId', 'version', 'action', 'before', 'after', 'createdById', 'createdByName', 'createdAt']);
exports.auditTrailSchemas['AuditTrailListResponse'] = envelope(object({
    entries: { type: 'array', items: ref('AuditTrailEntry') },
    pagination: { type: 'object', required: ['page', 'limit', 'total', 'totalPages'], properties: { page: { type: 'integer' }, limit: { type: 'integer' }, total: { type: 'integer' }, totalPages: { type: 'integer' } } },
}, ['entries', 'pagination']));
exports.auditTrailSchemas['AuditTrailEntityResponse'] = envelope(object({
    entries: { type: 'array', items: ref('AuditTrailEntry') },
}, ['entries']));
exports.auditTrailPaths['/api/v1/app-manager/audit-trail'] = { get: {
        tags: ['Audit Trail'], summary: 'List audit trail entries', security,
        description: 'Reads the append-only audit trail of every managed entity, newest first. Requires an active APP_MANAGER role. The list is not branch-scoped: global configuration such as menus and menu accesses is included, so entries may carry a null officeBranchId. Pagination defaults to page 1 with 50 entries and allows up to 200.',
        parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 200, default: 50 } },
            { name: 'sortBy', in: 'query', schema: { type: 'string', enum: ['createdAt', 'module', 'entityType', 'action'] }, description: 'Allowlisted field used for sorting. When omitted, results are sorted by createdAt descending.' },
            { name: 'sortOrder', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' } },
            { name: 'module', in: 'query', schema: { type: 'string', enum: ['menu', 'reference'] } },
            { name: 'entityType', in: 'query', schema: { type: 'string', enum: ['MENU', 'MENU_ITEM', 'MENU_ACCESS', 'OFFICE_BRANCH'] } },
            { name: 'entityId', in: 'query', schema: uuid },
            { name: 'action', in: 'query', schema: { type: 'string', enum: ['CREATE', 'UPDATE', 'DELETE', 'DEACTIVATE', 'ACTIVATE'] } },
        ],
        responses: {
            200: { description: 'Audit trail entries, newest first', content: { 'application/json': { schema: ref('AuditTrailListResponse') } } },
            400: { description: 'Invalid query parameters' },
            401: { description: 'Missing or invalid identity' },
            403: { description: 'Active app manager role is required' },
            429: { description: 'Rate limit exceeded' },
            500: { description: 'Internal server error' },
        },
    } };
exports.auditTrailPaths['/api/v1/app-manager/audit-trail/entity/{entityId}'] = { get: {
        tags: ['Audit Trail'], summary: 'List the audit trail of one entity', security,
        description: 'Reads the append-only audit trail of a single entity by its identifier, newest first. The response is not paginated. Requires an active APP_MANAGER role.',
        parameters: [{ name: 'entityId', in: 'path', required: true, schema: uuid }],
        responses: {
            200: { description: 'Audit trail entries of the entity, newest first', content: { 'application/json': { schema: ref('AuditTrailEntityResponse') } } },
            400: { description: 'Invalid entity ID' },
            401: { description: 'Missing or invalid identity' },
            403: { description: 'Active app manager role is required' },
            429: { description: 'Rate limit exceeded' },
            500: { description: 'Internal server error' },
        },
    } };
//# sourceMappingURL=audit-trail.js.map