"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordAudit = exports.getAuditActor = void 0;
const client_1 = require("@prisma/client");
const httpError_js_1 = require("./httpError.js");
/**
 * The actor behind the current request.
 *
 * The identity comes from the gateway-verified headers, so it cannot be
 * spoofed by the client. The name is stored next to the id in the audit
 * trail, so the trail still names the person when the user record changes.
 */
const getAuditActor = (res) => {
    const user = res.locals.authUser;
    if (!user)
        throw new httpError_js_1.HttpError('Authenticated user is required', 401);
    const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
        || user.username
        || user.id;
    return { id: user.id, name };
};
exports.getAuditActor = getAuditActor;
/**
 * Records one audit entry.
 *
 * The write must run inside the same transaction as the change it describes,
 * so the audit trail and the data can never disagree: either both are
 * committed, or neither is.
 *
 * The version makes the entry unique per entity state, so a retried write
 * cannot produce a second entry for the same state.
 */
const recordAudit = async (tx, input) => {
    await tx.auditLog.create({
        data: {
            module: input.module,
            entityType: input.entityType,
            entityId: input.entityId,
            // The audit table stores the version as a BigInt, so a timestamp in
            // milliseconds and a plain counter are both representable.
            version: BigInt(input.version),
            action: input.action,
            before: input.before == null ? client_1.Prisma.DbNull : JSON.parse(JSON.stringify(input.before)),
            after: JSON.parse(JSON.stringify(input.after)),
            officeBranchId: input.officeBranchId ?? null,
            createdById: input.actor.id,
            createdByName: input.actor.name,
        },
    });
};
exports.recordAudit = recordAudit;
//# sourceMappingURL=audit.js.map