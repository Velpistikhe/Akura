"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordCatalogAuditWithPlatform = exports.recordCatalogAudit = exports.requireCatalogVersion = void 0;
const client_1 = require("@prisma/client");
const httpError_js_1 = require("./httpError.js");
const audit_js_1 = require("./audit.js");
const requireCatalogVersion = (row, version, allowInactive = false) => {
    if ((!allowInactive && row.isActive === false) || row.version !== version) {
        throw new httpError_js_1.HttpError('Data has changed or is inactive; reload and submit the current version', 409);
    }
};
exports.requireCatalogVersion = requireCatalogVersion;
const recordCatalogAudit = (tx, officeBranchId, entityType, before, after, actor, action) => tx.catalogAuditLog.create({ data: {
        officeBranchId, entityType, entityId: after.id, version: after.version, action,
        before: before == null ? client_1.Prisma.DbNull : JSON.parse(JSON.stringify(before)),
        after: JSON.parse(JSON.stringify(after)), createdById: actor.id, createdByName: actor.name,
    } });
exports.recordCatalogAudit = recordCatalogAudit;
/**
 * The module that owns a catalogue entity.
 *
 * The generic audit trail names the module, so the catalogue entries can be
 * queried next to the entries of the other modules.
 */
const catalogModule = (entityType) => {
    if (entityType === 'SERVICE' || entityType === 'SERVICE_SCOPE' || entityType === 'MAINTENANCE_SCOPE')
        return 'services';
    if (entityType === 'ITEM' || entityType === 'ITEM_SIZE' || entityType === 'ITEM_PRICE')
        return 'items';
    if (entityType === 'COMPANY_CONTRACT')
        return 'contracts';
    return 'contract-prices';
};
/**
 * Records a catalogue change in both audit tables.
 *
 * The catalogue table is the module's own trail, and the generic table is the
 * platform-wide trail that every module writes to. Both are written in the
 * same transaction, so they can never disagree.
 */
const recordCatalogAuditWithPlatform = async (tx, officeBranchId, entityType, before, after, actor, action) => {
    await (0, exports.recordCatalogAudit)(tx, officeBranchId, entityType, before, after, actor, action);
    await (0, audit_js_1.recordAudit)(tx, {
        module: catalogModule(entityType),
        entityType: entityType,
        entityId: after.id,
        version: after.version,
        action,
        before,
        after,
        officeBranchId,
        actor,
    });
};
exports.recordCatalogAuditWithPlatform = recordCatalogAuditWithPlatform;
//# sourceMappingURL=catalogAudit.js.map