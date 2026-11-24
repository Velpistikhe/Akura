"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditTrailRepository = void 0;
const db_js_1 = require("../../config/db.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
class AuditTrailRepository {
    /**
     * The version is a BigInt in the database, because it holds both a plain
     * counter and a timestamp in milliseconds. JSON has no BigInt, so it is
     * serialised as a string.
     */
    static toEntry(row) {
        return { ...row, version: row.version.toString() };
    }
    async list(input) {
        const query = (0, listQuery_js_1.buildListQuery)(input, {
            filters: {
                module: (module) => ({ module }),
                entityType: (entityType) => ({ entityType }),
                entityId: (entityId) => ({ entityId }),
                action: (action) => ({ action }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                createdAt: (direction) => ({ createdAt: direction }),
                module: (direction) => ({ module: direction }),
                entityType: (direction) => ({ entityType: direction }),
                action: (direction) => ({ action: direction }),
            }),
        });
        const [rows, total] = await Promise.all([
            db_js_1.prisma.auditLog.findMany({ ...query, orderBy: { createdAt: 'desc' } }),
            db_js_1.prisma.auditLog.count({ where: query.where }),
        ]);
        return {
            entries: rows.map((row) => AuditTrailRepository.toEntry(row)),
            pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total),
        };
    }
    /** The trail of one entity, newest first. */
    async listForEntity(entityId) {
        const rows = await db_js_1.prisma.auditLog.findMany({ where: { entityId }, orderBy: { createdAt: 'desc' } });
        return rows.map((row) => AuditTrailRepository.toEntry(row));
    }
}
exports.auditTrailRepository = new AuditTrailRepository();
//# sourceMappingURL=audit-trail.repository.js.map