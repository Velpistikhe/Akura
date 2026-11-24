"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueWorkOrderLink = enqueueWorkOrderLink;
const env_js_1 = require("../../config/env.js");
const json = (value) => JSON.parse(JSON.stringify(value));
/**
 * The document snapshots are never delivered to Marketing.
 *
 * Marketing derives the mirrored Work Order status from the delivered
 * snapshot, so the snapshot stays part of the payload. The captured quotation
 * and contract documents are internal storage of Field Service and have no
 * place in another service, so they are dropped at the source instead of at
 * the receiver.
 */
const withoutSnapshots = (workOrder) => {
    const { quotationSnapshot: _quotationSnapshot, contractSnapshot: _contractSnapshot, ...rest } = workOrder;
    return rest;
};
/**
 * Commits a Marketing link delivery in the same transaction as the Work Order write.
 *
 * The Work Order identity is stored in indexed columns next to the payload, so
 * the synchronisation history of one Work Order can be read without scanning
 * the JSONB document.
 */
async function enqueueWorkOrderLink(tx, workOrder, options = {}) {
    if (!workOrder.quotationId || !env_js_1.env.WORK_ORDER_SYNC_SECRET)
        return null;
    const revoked = options.revoked === true;
    const action = options.action ?? (revoked ? 'REVOKE' : 'UPDATE');
    const snapshot = json(withoutSnapshots(workOrder));
    const payload = {
        workOrderId: workOrder.id,
        workOrderNumber: workOrder.number,
        workOrderStatus: workOrder.status,
        officeBranchId: workOrder.officeBranchId,
        revoked,
        workOrderSnapshot: snapshot,
    };
    return tx.workOrderLinkEvent.create({
        data: {
            quotationId: workOrder.quotationId,
            officeBranchId: workOrder.officeBranchId,
            workOrderId: workOrder.id,
            workOrderNumber: workOrder.number,
            workOrderStatus: workOrder.status,
            action,
            revoked,
            payload,
            deliveries: { create: [{ targetService: 'marketing' }] },
        },
    });
}
//# sourceMappingURL=work-order-link-outbox.js.map