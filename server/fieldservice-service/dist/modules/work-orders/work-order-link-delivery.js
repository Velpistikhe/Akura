"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryDelay = void 0;
exports.deliverWorkOrderLink = deliverWorkOrderLink;
exports.processDueWorkOrderLinkDeliveries = processDueWorkOrderLinkDeliveries;
exports.deliverWorkOrderLinkAndWait = deliverWorkOrderLinkAndWait;
exports.wakeWorkOrderLinkDelivery = wakeWorkOrderLinkDelivery;
exports.startWorkOrderLinkDelivery = startWorkOrderLinkDelivery;
const db_js_1 = require("../../config/db.js");
const env_js_1 = require("../../config/env.js");
const logger_js_1 = require("../../utils/logger.js");
const serviceUrl_js_1 = require("../../utils/serviceUrl.js");
let timer;
let running = false;
let stopped = true;
let requested = false;
const retryDelay = (attempt) => Math.min(300000, 10000 * 2 ** Math.min(attempt - 1, 5));
exports.retryDelay = retryDelay;
/** How often the delivery worker looks for work when nothing is queued. */
const POLL_INTERVAL_MS = 2000;
async function deliverWorkOrderLink(id) {
    return db_js_1.prisma.$transaction(async (tx) => {
        // The lock is taken blocking, not with a try-lock. The background worker
        // and the in-request flush can pick up the same delivery, and a try-lock
        // would let the loser return without delivering anything. That made the
        // response leave before Marketing had the mirror, so a Work Order revoked
        // and immediately replaced still saw the quotation as linked. Blocking
        // makes the second attempt wait and then observe the delivered row.
        // The lock function returns void, so it is executed rather than selected.
        await tx.$executeRaw `SELECT pg_advisory_xact_lock(hashtext(${id}))`;
        const job = await tx.workOrderLinkDelivery.findUnique({ where: { id }, include: { event: true } });
        if (!job || job.deliveredAt || job.nextRetryAt > new Date())
            return;
        try {
            if (!env_js_1.env.WORK_ORDER_SYNC_SECRET)
                throw new Error('Work Order delivery credentials are not configured');
            const path = `marketing/internal/quotations/${job.event.quotationId}/work-order`;
            const response = await fetch((0, serviceUrl_js_1.serviceUrl)(path), {
                method: 'POST', redirect: 'error', signal: AbortSignal.timeout(10000),
                headers: {
                    'content-type': 'application/json',
                    'x-work-order-sync-secret': env_js_1.env.WORK_ORDER_SYNC_SECRET,
                    ...(0, serviceUrl_js_1.serviceHeaders)(path),
                },
                body: JSON.stringify(job.event.payload),
            });
            if (!response.ok)
                throw new Error(`Receiver returned HTTP ${response.status}`);
            const ack = await response.json();
            const payload = job.event.payload;
            if (ack.success !== true || ack.workOrderId !== payload.workOrderId)
                throw new Error('Invalid delivery acknowledgment');
            await tx.workOrderLinkDelivery.update({
                where: { id },
                data: { deliveredAt: new Date(), attempts: { increment: 1 }, lastError: null },
            });
        }
        catch (error) {
            await tx.workOrderLinkDelivery.update({
                where: { id },
                data: {
                    attempts: { increment: 1 },
                    nextRetryAt: new Date(Date.now() + (0, exports.retryDelay)(job.attempts + 1) + Math.floor(Math.random() * 1000)),
                    lastError: error instanceof Error ? error.message : 'Delivery failed',
                },
            });
            logger_js_1.logger.warn('Work Order link delivery failed; automatic retry scheduled', { deliveryId: id, quotationId: job.event.quotationId });
        }
    }, { timeout: 20000, maxWait: 5000 });
}
async function processDueWorkOrderLinkDeliveries(officeBranchId, eventId) {
    try {
        const jobs = await db_js_1.prisma.workOrderLinkDelivery.findMany({
            where: {
                deliveredAt: null,
                nextRetryAt: { lte: new Date() },
                event: { officeBranchId },
                ...(eventId ? { eventId } : {}),
            },
            orderBy: { nextRetryAt: 'asc' },
            ...(eventId ? {} : { take: 5 }),
            select: { id: true },
        });
        const results = await Promise.allSettled(jobs.map(job => deliverWorkOrderLink(job.id)));
        if (results.some(result => result.status === 'rejected')) {
            logger_js_1.logger.error('Work Order link delivery batch interrupted; pending entries will be retried on the next invocation');
        }
    }
    catch {
        logger_js_1.logger.error('Work Order link delivery batch unavailable; pending entries remain queued');
    }
}
/**
 * Delivers one link event and waits until Marketing has acknowledged it.
 *
 * The write path uses this instead of the plain batch so the caller is not told
 * "done" while Marketing still holds the previous link. A delivery that failed
 * is retried once after the backoff window, because the common cause is a
 * receiver that was briefly unavailable.
 */
async function deliverWorkOrderLinkAndWait(eventId, officeBranchId) {
    // A failed delivery schedules the next attempt with a backoff, so the retry
    // window is waited out here. The write is already committed when this runs,
    // so the wait cannot be skipped without leaving the mirror stale.
    for (const attempt of [0, 1]) {
        if (attempt > 0) {
            const job = await db_js_1.prisma.workOrderLinkDelivery.findFirst({
                where: { eventId, targetService: 'marketing' },
                orderBy: { id: 'asc' },
            });
            const waitMs = job ? Math.max(0, job.nextRetryAt.getTime() - Date.now()) : 1000;
            if (waitMs > 0)
                await new Promise(resolve => setTimeout(resolve, Math.min(waitMs, 15000)));
        }
        await processDueWorkOrderLinkDeliveries(officeBranchId, eventId);
        const delivered = await db_js_1.prisma.workOrderLinkDelivery.findFirst({
            where: { eventId, targetService: 'marketing', deliveredAt: { not: null } },
            select: { id: true },
        });
        if (delivered)
            return true;
    }
    return false;
}
function schedule(delay) {
    if (stopped)
        return;
    if (timer)
        clearTimeout(timer);
    timer = setTimeout(() => { timer = undefined; void run(); }, Math.min(2147483647, Math.max(0, delay)));
}
async function run() {
    if (running || stopped)
        return;
    running = true;
    requested = false;
    try {
        const jobs = await db_js_1.prisma.workOrderLinkDelivery.findMany({
            where: { deliveredAt: null, nextRetryAt: { lte: new Date() } },
            orderBy: { nextRetryAt: 'asc' },
            take: 20,
        });
        for (const job of jobs) {
            if (stopped)
                break;
            await deliverWorkOrderLink(job.id);
        }
        const next = await db_js_1.prisma.workOrderLinkDelivery.findFirst({
            where: { deliveredAt: null },
            orderBy: { nextRetryAt: 'asc' },
        });
        // The worker keeps polling even when nothing is queued. A delivery can
        // become due without a write waking the worker, and a pending event blocks
        // a new Work Order for its quotation with 409, so an event that is never
        // retried would block that quotation forever.
        const delay = next
            ? Math.max(500, Math.min(POLL_INTERVAL_MS, next.nextRetryAt.getTime() - Date.now() + 500))
            : POLL_INTERVAL_MS;
        schedule(delay);
    }
    catch {
        logger_js_1.logger.error('Work Order link delivery worker failed; recovery scheduled');
        schedule(10000);
    }
    finally {
        running = false;
        if (requested)
            schedule(0);
    }
}
function wakeWorkOrderLinkDelivery() {
    requested = true;
    if (!running)
        schedule(0);
}
function startWorkOrderLinkDelivery() {
    stopped = false;
    wakeWorkOrderLinkDelivery();
    return () => { stopped = true; if (timer)
        clearTimeout(timer); };
}
//# sourceMappingURL=work-order-link-delivery.js.map