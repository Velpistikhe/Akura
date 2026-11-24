"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workOrderLinkSchema = void 0;
const node_crypto_1 = require("node:crypto");
const express_1 = require("express");
const zod_1 = require("zod");
const env_js_1 = require("../../config/env.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const httpError_js_1 = require("../../utils/httpError.js");
const quotation_repository_js_1 = require("./quotation.repository.js");
/**
 * Quotation ↔ Work Order link update delivered by Field Service.
 *
 * Field Service owns the Work Order. Marketing owns the quotation, so it keeps
 * a mirrored reference: `hasWorkOrder` marks the quotation as backing a live
 * Work Order and `workOrderId` points at that Work Order.
 *
 * The payload is idempotent in both directions: re-sending the same Work Order
 * acknowledges without changing the quotation again, while a link for a
 * different Work Order than the one currently referenced is rejected so a late
 * callback can never overwrite a newer reference.
 */
exports.workOrderLinkSchema = zod_1.z.object({
    workOrderId: zod_1.z.string().uuid(),
    workOrderNumber: zod_1.z.string().min(1).max(100),
    workOrderStatus: zod_1.z.enum(['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']),
    officeBranchId: zod_1.z.string().uuid(),
    // True when the Work Order was revoked: the quotation reference is cleared.
    revoked: zod_1.z.boolean().default(false),
}).strict();
const router = (0, express_1.Router)();
router.post('/internal/quotations/:quotationId/work-order', (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const supplied = req.headers['x-work-order-sync-secret'];
    const expected = env_js_1.env.WORK_ORDER_SYNC_SECRET;
    if (!expected || typeof supplied !== 'string' || Buffer.byteLength(supplied) !== Buffer.byteLength(expected)
        || !(0, node_crypto_1.timingSafeEqual)(Buffer.from(supplied), Buffer.from(expected))) {
        res.status(403).json({ success: false, message: 'Invalid Work Order delivery credentials' });
        return;
    }
    const quotationId = zod_1.z.string().uuid().parse(req.params.quotationId);
    const parsed = exports.workOrderLinkSchema.safeParse(req.body);
    if (!parsed.success)
        throw new httpError_js_1.HttpError('Invalid Work Order link request', 400);
    const { workOrderId, workOrderNumber, workOrderStatus, officeBranchId, revoked } = parsed.data;
    if (revoked) {
        // A revoked Work Order clears the whole reference.
        await quotation_repository_js_1.quotationRepository.clearWorkOrder(quotationId, officeBranchId, workOrderId);
        res.json({ success: true, quotationId, workOrderId, revoked: true, workOrderStatus: null });
        return;
    }
    // A canceled Work Order clears the mirrored status instead of storing one it
    // does not have.
    const workOrder = { id: workOrderId, number: workOrderNumber, status: workOrderStatus, quotationId, officeBranchId };
    await quotation_repository_js_1.quotationRepository.attachWorkOrder(quotationId, officeBranchId, workOrder, { id: workOrderId, name: 'Field Service' });
    res.json({ success: true, quotationId, workOrderId, revoked: false, workOrderStatus: (0, quotation_repository_js_1.workOrderStatusMirror)(workOrderStatus) });
}));
exports.default = router;
//# sourceMappingURL=work-order-link.routes.js.map