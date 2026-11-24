"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workOrderSyncRepository = exports.deliveryStatus = void 0;
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const deliveryStatus = (delivery) => {
    if (delivery.deliveredAt)
        return 'DELIVERED';
    return delivery.attempts > 0 ? 'RETRYING' : 'PENDING';
};
exports.deliveryStatus = deliveryStatus;
/**
 * Reads the recorded Marketing synchronisation of one Work Order.
 *
 * Field Service owns the outbox, so this reads the local delivery history
 * only. Every row is scoped to the branch of the caller, and the Work Order
 * itself is checked first, so a Work Order of another branch is reported as
 * missing rather than as an empty list.
 */
exports.workOrderSyncRepository = {
    async list(workOrderId, input, actor) {
        const { page, limit } = input;
        const workOrder = await db_js_1.prisma.workOrder.findFirst({
            where: { id: workOrderId, officeBranchId: actor.officeBranchId },
            select: { id: true },
        });
        if (!workOrder)
            throw new httpError_js_1.HttpError('Work order not found', 404);
        const where = { workOrderId, officeBranchId: actor.officeBranchId };
        const [events, total] = await db_js_1.prisma.$transaction([
            db_js_1.prisma.workOrderLinkEvent.findMany({
                where,
                orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
                skip: (page - 1) * limit,
                take: limit,
                include: { deliveries: { orderBy: { id: 'asc' } } },
            }),
            db_js_1.prisma.workOrderLinkEvent.count({ where }),
        ], { isolationLevel: 'RepeatableRead' });
        const records = events.flatMap(event => event.deliveries.map(delivery => ({
            eventId: event.id,
            workOrderId: event.workOrderId,
            workOrderNumber: event.workOrderNumber,
            workOrderStatus: event.workOrderStatus,
            action: event.action,
            revoked: event.revoked,
            quotationId: event.quotationId,
            officeBranchId: event.officeBranchId,
            createdAt: event.createdAt,
            delivery: {
                id: delivery.id,
                targetService: delivery.targetService,
                attempts: delivery.attempts,
                nextRetryAt: delivery.nextRetryAt,
                deliveredAt: delivery.deliveredAt,
                lastError: delivery.lastError,
                deliveryStatus: (0, exports.deliveryStatus)(delivery),
            },
        })));
        return { sync: records, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    },
};
//# sourceMappingURL=work-order-sync.repository.js.map