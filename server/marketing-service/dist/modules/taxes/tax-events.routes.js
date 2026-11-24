"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxEventSchema = void 0;
exports.applyTaxEvent = applyTaxEvent;
const express_1 = require("express");
const node_crypto_1 = require("node:crypto");
const zod_1 = require("zod");
const db_js_1 = require("../../config/db.js");
const audit_js_1 = require("../../utils/audit.js");
const env_js_1 = require("../../config/env.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const httpError_js_1 = require("../../utils/httpError.js");
const date = zod_1.z.string().datetime().transform(value => new Date(value));
exports.taxEventSchema = zod_1.z.object({
    eventId: zod_1.z.string().uuid(), officeBranchId: zod_1.z.string().uuid(), version: zod_1.z.number().int().positive(),
    taxes: zod_1.z.array(zod_1.z.object({ id: zod_1.z.string().uuid(), officeBranchId: zod_1.z.string().uuid(),
        percentage: zod_1.z.string().regex(/^\d{1,3}(\.\d{1,2})?$/).refine(value => Number(value) <= 100),
        effectiveFrom: date, effectiveUntil: date.nullable(), updatedAt: date }).strict()),
}).strict().superRefine((event, ctx) => {
    const rows = [...event.taxes].sort((a, b) => a.effectiveFrom.getTime() - b.effectiveFrom.getTime());
    if (new Set(rows.map(row => row.id)).size !== rows.length)
        ctx.addIssue({ code: 'custom', message: 'Duplicate tax IDs' });
    rows.forEach((row, index) => {
        const previous = rows[index - 1];
        if (row.officeBranchId !== event.officeBranchId || (row.effectiveUntil && row.effectiveUntil < row.effectiveFrom)
            || (previous && (!previous.effectiveUntil || previous.effectiveUntil >= row.effectiveFrom))) {
            ctx.addIssue({ code: 'custom', message: 'Invalid branch or overlapping tax periods' });
        }
    });
});
async function applyTaxEvent(input) {
    const parsed = exports.taxEventSchema.safeParse(input);
    if (!parsed.success)
        throw new httpError_js_1.HttpError('Invalid tax event', 400);
    const event = parsed.data;
    await db_js_1.prisma.$transaction(async (tx) => {
        await tx.$executeRaw `SELECT pg_advisory_xact_lock(hashtext(${'tax-cache:' + event.officeBranchId}))`;
        const current = await tx.taxCacheRevision.findUnique({ where: { officeBranchId: event.officeBranchId } });
        if (current && current.version >= event.version)
            return;
        await tx.taxCache.deleteMany({ where: { officeBranchId: event.officeBranchId } });
        if (event.taxes.length)
            await tx.taxCache.createMany({ data: event.taxes.map(({ updatedAt, ...row }) => ({ ...row, sourceUpdatedAt: updatedAt })) });
        // The event is recorded in the platform-wide audit trail as well, so a
        // tax change is traceable from the receiving service too. The actor is
        // the sending service, because no user performed this change here.
        await (0, audit_js_1.recordAudit)(tx, {
            module: 'taxes',
            entityType: 'TAX',
            entityId: event.officeBranchId,
            version: event.version,
            action: 'TAX_SYNC',
            before: null,
            after: { officeBranchId: event.officeBranchId, version: event.version, taxCount: event.taxes.length },
            officeBranchId: event.officeBranchId,
            actor: (0, audit_js_1.serviceActor)('Finance Service'),
        });
        await tx.taxCacheRevision.upsert({ where: { officeBranchId: event.officeBranchId },
            create: { officeBranchId: event.officeBranchId, version: event.version, eventId: event.eventId },
            update: { version: event.version, eventId: event.eventId } });
    });
    return { success: true, eventId: event.eventId };
}
const router = (0, express_1.Router)();
router.post('/internal/taxes/events', (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const supplied = req.headers['x-tax-sync-secret'];
    const expected = env_js_1.env.TAX_SYNC_SECRET;
    if (!expected || typeof supplied !== 'string' || Buffer.byteLength(supplied) !== Buffer.byteLength(expected)
        || !(0, node_crypto_1.timingSafeEqual)(Buffer.from(supplied), Buffer.from(expected))) {
        res.status(403).json({ success: false, message: 'Invalid tax delivery credentials' });
        return;
    }
    res.json(await applyTaxEvent(req.body));
}));
exports.default = router;
//# sourceMappingURL=tax-events.routes.js.map