import { z } from 'zod';
/**
 * Query parameters of the Work Order synchronisation history.
 *
 * The endpoint returns the recorded deliveries of one Work Order, so the page
 * size is bounded like every other list endpoint in this service.
 */
export declare const workOrderSyncQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type WorkOrderSyncQuery = z.infer<typeof workOrderSyncQuerySchema>;
