"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_js_1 = require("../../config/db.js");
const actor_middleware_js_1 = require("../../middlewares/actor.middleware.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const httpError_js_1 = require("../../utils/httpError.js");
const tax_repository_js_1 = require("./tax.repository.js");
const tax_delivery_js_1 = require("./tax-delivery.js");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
router.use(actor_middleware_js_1.requireActor);
const querySchema = zod_1.z.object({ page: zod_1.z.coerce.number().int().min(1).default(1), limit: zod_1.z.coerce.number().int().min(1).max(100).default(20) }).strict();
router.get('/', (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const actor = res.locals.documentActor;
    const { page, limit } = querySchema.parse(req.query);
    const data = await db_js_1.prisma.tax.findMany({ where: { officeBranchId: actor.officeBranchId }, orderBy: { effectiveFrom: 'desc' }, take: limit, skip: (page - 1) * limit });
    res.json({ success: true, status: 200, data });
}));
router.get('/deliveries', (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const actor = res.locals.documentActor;
    const { page, limit } = querySchema.parse(req.query);
    await (0, tax_delivery_js_1.processDueTaxDeliveries)(actor.officeBranchId);
    const data = await db_js_1.prisma.taxDelivery.findMany({ where: { event: { officeBranchId: actor.officeBranchId } },
        orderBy: [{ event: { version: 'desc' } }, { id: 'asc' }], take: limit, skip: (page - 1) * limit });
    res.json({ success: true, status: 200, data });
}));
router.use((_req, res, next) => {
    if (!res.locals.taxWriteAllowed)
        return next(new httpError_js_1.HttpError('ADMIN role and FINANCE or MARKETING section are required', 403));
    next();
});
router.post('/', (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const actor = res.locals.documentActor;
    const { tax: data, event } = await tax_repository_js_1.taxRepository.createWithEvent(req.body, actor.officeBranchId, actor);
    await (0, tax_delivery_js_1.processDueTaxDeliveries)(actor.officeBranchId, event.id);
    (0, tax_delivery_js_1.wakeTaxDelivery)();
    res.status(201).json({ status: 201, success: true, message: 'Tax saved; cache delivery queued', data, requestId: req.headers['x-request-id'] });
}));
// Bootstrap a new/restored consumer, or republish after repairing configuration.
router.post('/resync', (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    zod_1.z.object({}).strict().parse(req.body ?? {});
    const actor = res.locals.documentActor;
    const event = await db_js_1.prisma.$transaction(async (tx) => {
        await tx.$executeRaw `SELECT pg_advisory_xact_lock(hashtext(${'tax-branch:' + actor.officeBranchId}))`;
        return (0, tax_repository_js_1.enqueueTaxSnapshot)(tx, actor.officeBranchId);
    });
    await (0, tax_delivery_js_1.processDueTaxDeliveries)(actor.officeBranchId, event.id);
    (0, tax_delivery_js_1.wakeTaxDelivery)();
    res.status(202).json({ status: 202, success: true, data: { eventId: event.id, version: event.version }, message: 'Cache delivery queued' });
}));
exports.default = router;
//# sourceMappingURL=tax.routes.js.map