import { Prisma } from '@prisma/client';
type WorkOrderRow = {
    id: string;
    number: string;
    status: string;
    quotationId: string | null;
    officeBranchId: string;
    revoked: boolean;
} & Record<string, unknown>;
/** The Work Order write that produced a link event. */
export type WorkOrderLinkAction = 'CREATE' | 'START' | 'UPDATE' | 'REVOKE';
/**
 * Commits a Marketing link delivery in the same transaction as the Work Order write.
 *
 * The Work Order identity is stored in indexed columns next to the payload, so
 * the synchronisation history of one Work Order can be read without scanning
 * the JSONB document.
 */
export declare function enqueueWorkOrderLink(tx: Prisma.TransactionClient, workOrder: WorkOrderRow, options?: {
    revoked?: boolean;
    action?: WorkOrderLinkAction;
}): Promise<{
    officeBranchId: string;
    payload: Prisma.JsonValue;
    id: string;
    createdAt: Date;
    workOrderId: string;
    revoked: boolean;
    quotationId: string;
    workOrderNumber: string;
    workOrderStatus: string;
    action: string;
} | null>;
export {};
