"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSnapshot = exports.saveSecurityAudit = exports.getAuditContext = void 0;
exports.saveUserHistory = saveUserHistory;
const client_1 = require("@prisma/client");
/**
 * The request context that is recorded next to a security event.
 *
 * The address identifies the client that made the request, and the user agent
 * describes the client software. Both are taken from the request, so they
 * cannot be forged by the request body.
 */
const getAuditContext = (req) => ({
    ipAddress: req.ip ?? req.socket.remoteAddress ?? null,
    userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : null,
});
exports.getAuditContext = getAuditContext;
/**
 * Records one security audit entry.
 *
 * The write runs in the same transaction as the change it describes whenever
 * one exists, so the audit trail and the data cannot disagree. A failed login
 * has no data change to commit, so it is written on its own.
 */
const saveSecurityAudit = async (tx, input) => {
    await tx.securityAuditLog.create({
        data: {
            module: input.module,
            eventType: input.eventType,
            action: input.action,
            outcome: input.outcome,
            userId: input.userId ?? null,
            username: input.username ?? null,
            officeBranchId: input.officeBranchId ?? null,
            ipAddress: input.context?.ipAddress ?? null,
            userAgent: input.context?.userAgent?.slice(0, 300) ?? null,
            detail: input.detail == null ? client_1.Prisma.DbNull : JSON.parse(JSON.stringify(input.detail)),
        },
    });
};
exports.saveSecurityAudit = saveSecurityAudit;
const userSnapshot = (user) => ({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    telp: user.telp,
    role: user.role,
    section: user.section,
    officeBranchId: user.officeBranchId,
    branch: user.branch ?? user.officeBranchName ?? null,
    isActive: user.isActive,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});
exports.userSnapshot = userSnapshot;
async function saveUserHistory(tx, user, before, actor, action) {
    const beforeSnapshot = before ? (0, exports.userSnapshot)(before) : null;
    const snapshot = (0, exports.userSnapshot)(user);
    // id, timestamps and version are context, not user-editable data fields.
    const fields = Object.keys(snapshot).filter((field) => !['id', 'createdAt', 'updatedAt', 'version'].includes(field));
    const changes = fields.flatMap((field) => {
        const beforeValue = beforeSnapshot?.[field] ?? null;
        const afterValue = snapshot[field] ?? null;
        return JSON.stringify(beforeValue) === JSON.stringify(afterValue)
            ? []
            : [{ field, before: beforeValue, after: afterValue }];
    });
    // Password material never enters history; the action itself documents the change.
    if (action === 'PASSWORD_CHANGE') {
        changes.push({ field: 'password', before: '[REDACTED]', after: '[REDACTED]' });
    }
    await tx.userHistory.create({ data: {
            userId: user.id,
            version: user.version,
            action,
            beforeSnapshot: beforeSnapshot ? JSON.parse(JSON.stringify(beforeSnapshot)) : client_1.Prisma.DbNull,
            snapshot: JSON.parse(JSON.stringify(snapshot)),
            changes: JSON.parse(JSON.stringify(changes)),
            createdById: actor.id,
            createdByName: actor.name,
        } });
}
//# sourceMappingURL=userHistory.js.map