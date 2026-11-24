"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryDelay = void 0;
exports.deliverTax = deliverTax;
exports.processDueTaxDeliveries = processDueTaxDeliveries;
exports.wakeTaxDelivery = wakeTaxDelivery;
exports.startTaxDelivery = startTaxDelivery;
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
// The transaction lock prevents simultaneous delivery by multiple Finance instances.
async function deliverTax(id) {
    return db_js_1.prisma.$transaction(async (tx) => {
        const [lock] = await tx.$queryRaw `SELECT pg_try_advisory_xact_lock(hashtext(${id})) AS acquired`;
        if (!lock.acquired)
            return;
        const job = await tx.taxDelivery.findUnique({ where: { id }, include: { event: true } });
        if (!job || job.deliveredAt || job.nextRetryAt > new Date())
            return;
        const target = env_js_1.env.TAX_DELIVERY_TARGETS.find(target => target.name === job.targetService);
        try {
            if (!target || !env_js_1.env.TAX_SYNC_SECRET)
                throw new Error('Delivery target or credential is not configured');
            if (target.url !== (0, serviceUrl_js_1.serviceUrl)('marketing/internal/taxes/events'))
                throw new Error('Tax delivery target must use the configured API Gateway');
            const response = await fetch(target.url, {
                method: 'POST', redirect: 'error', signal: AbortSignal.timeout(10000),
                headers: { 'content-type': 'application/json', 'x-tax-sync-secret': env_js_1.env.TAX_SYNC_SECRET, ...(0, serviceUrl_js_1.serviceHeaders)('marketing/internal/taxes/events') },
                body: JSON.stringify({ eventId: job.eventId, officeBranchId: job.event.officeBranchId,
                    version: job.event.version, taxes: job.event.payload }),
            });
            if (!response.ok)
                throw new Error(`Receiver returned HTTP ${response.status}`);
            const ack = await response.json();
            if (ack.eventId !== job.eventId || ack.success !== true)
                throw new Error('Invalid delivery acknowledgment');
            await tx.taxDelivery.update({ where: { id }, data: { deliveredAt: new Date(), attempts: { increment: 1 }, lastError: null } });
        }
        catch (error) {
            await tx.taxDelivery.update({ where: { id }, data: { attempts: { increment: 1 },
                    nextRetryAt: new Date(Date.now() + (0, exports.retryDelay)(job.attempts + 1) + Math.floor(Math.random() * 1000)),
                    lastError: error instanceof Error ? error.message : 'Delivery failed' } });
            logger_js_1.logger.warn('Tax delivery failed; automatic retry scheduled', { deliveryId: id, target: job.targetService });
        }
    }, { timeout: 20000, maxWait: 5000 });
}
// Run a bounded batch inside the HTTP invocation. This also works when the
// Express app is imported without server.ts (and no timer worker is started).
async function processDueTaxDeliveries(officeBranchId, eventId) {
    try {
        const jobs = await db_js_1.prisma.taxDelivery.findMany({
            where: { deliveredAt: null, nextRetryAt: { lte: new Date() }, event: { officeBranchId },
                ...(eventId ? { eventId } : {}) },
            orderBy: { nextRetryAt: 'asc' }, ...(eventId ? {} : { take: 5 }), select: { id: true },
        });
        const results = await Promise.allSettled(jobs.map(job => deliverTax(job.id)));
        if (results.some(result => result.status === 'rejected')) {
            logger_js_1.logger.error('Tax delivery batch interrupted; pending entries will be retried on the next invocation');
        }
    }
    catch {
        // The tax and outbox are already committed. Do not turn a successful write
        // into an HTTP error that could cause the client to submit the tax again.
        logger_js_1.logger.error('Tax delivery batch unavailable; pending entries remain queued');
    }
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
        const jobs = await db_js_1.prisma.taxDelivery.findMany({ where: { deliveredAt: null, nextRetryAt: { lte: new Date() } }, orderBy: { nextRetryAt: 'asc' }, take: 20 });
        for (const job of jobs) {
            if (stopped)
                break;
            await deliverTax(job.id);
        }
        const next = await db_js_1.prisma.taxDelivery.findFirst({ where: { deliveredAt: null }, orderBy: { nextRetryAt: 'asc' } });
        if (next)
            schedule(Math.max(1000, next.nextRetryAt.getTime() - Date.now()));
    }
    catch {
        logger_js_1.logger.error('Tax delivery worker failed; recovery scheduled');
        schedule(10000);
    }
    finally {
        running = false;
        if (requested)
            schedule(0);
    }
}
function wakeTaxDelivery() { requested = true; if (!running)
    schedule(0); }
function startTaxDelivery() {
    stopped = false;
    wakeTaxDelivery(); // Recover committed outbox entries after restart.
    return () => { stopped = true; if (timer)
        clearTimeout(timer); };
}
//# sourceMappingURL=tax-delivery.js.map