import { Actor } from '../../middlewares/actor.middleware.js';
import { WorkOrderSyncQuery } from './work-order-sync.schemas.js';
/**
 * The delivery state of one synchronisation record.
 *
 * DELIVERED  - the receiver acknowledged the event.
 * PENDING    - the event is queued and has not been sent yet.
 * RETRYING   - the delivery failed and waits for its next retry.
 *
 * There is no permanent failure state: a delivery is retried until it is
 * acknowledged, so a failed attempt is always a retrying one.
 */
export type WorkOrderDeliveryStatus = 'DELIVERED' | 'PENDING' | 'RETRYING';
export declare const deliveryStatus: (delivery: {
    deliveredAt: Date | null;
    attempts: number;
}) => WorkOrderDeliveryStatus;
/**
 * Reads the recorded Marketing synchronisation of one Work Order.
 *
 * Field Service owns the outbox, so this reads the local delivery history
 * only. Every row is scoped to the branch of the caller, and the Work Order
 * itself is checked first, so a Work Order of another branch is reported as
 * missing rather than as an empty list.
 */
export declare const workOrderSyncRepository: {
    list(workOrderId: string, input: WorkOrderSyncQuery, actor: Actor): Promise<{
        sync: {
            eventId: string;
            workOrderId: string;
            workOrderNumber: string;
            workOrderStatus: string;
            action: string;
            revoked: boolean;
            quotationId: string;
            officeBranchId: string;
            createdAt: Date;
            delivery: {
                id: string;
                targetService: string;
                attempts: number;
                nextRetryAt: Date;
                deliveredAt: Date | null;
                lastError: string | null;
                deliveryStatus: WorkOrderDeliveryStatus;
            };
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
};
