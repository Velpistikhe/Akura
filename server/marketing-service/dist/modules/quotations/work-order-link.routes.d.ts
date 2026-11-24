import { z } from 'zod';
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
export declare const workOrderLinkSchema: z.ZodObject<{
    workOrderId: z.ZodString;
    workOrderNumber: z.ZodString;
    workOrderStatus: z.ZodEnum<["DRAFT", "IN_PROGRESS", "COMPLETED", "CANCELED"]>;
    officeBranchId: z.ZodString;
    revoked: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    officeBranchId: string;
    revoked: boolean;
    workOrderStatus: "DRAFT" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
    workOrderId: string;
    workOrderNumber: string;
}, {
    officeBranchId: string;
    workOrderStatus: "DRAFT" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
    workOrderId: string;
    workOrderNumber: string;
    revoked?: boolean | undefined;
}>;
export type WorkOrderLink = z.infer<typeof workOrderLinkSchema>;
declare const router: import("express-serve-static-core").Router;
export default router;
