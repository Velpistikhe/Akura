import { z } from 'zod';
export declare const taxEventSchema: z.ZodEffects<z.ZodObject<{
    eventId: z.ZodString;
    officeBranchId: z.ZodString;
    version: z.ZodNumber;
    taxes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        officeBranchId: z.ZodString;
        percentage: z.ZodEffects<z.ZodString, string, string>;
        effectiveFrom: z.ZodEffects<z.ZodString, Date, string>;
        effectiveUntil: z.ZodNullable<z.ZodEffects<z.ZodString, Date, string>>;
        updatedAt: z.ZodEffects<z.ZodString, Date, string>;
    }, "strict", z.ZodTypeAny, {
        officeBranchId: string;
        updatedAt: Date;
        effectiveFrom: Date;
        effectiveUntil: Date | null;
        id: string;
        percentage: string;
    }, {
        officeBranchId: string;
        updatedAt: string;
        effectiveFrom: string;
        effectiveUntil: string | null;
        id: string;
        percentage: string;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    officeBranchId: string;
    version: number;
    taxes: {
        officeBranchId: string;
        updatedAt: Date;
        effectiveFrom: Date;
        effectiveUntil: Date | null;
        id: string;
        percentage: string;
    }[];
    eventId: string;
}, {
    officeBranchId: string;
    version: number;
    taxes: {
        officeBranchId: string;
        updatedAt: string;
        effectiveFrom: string;
        effectiveUntil: string | null;
        id: string;
        percentage: string;
    }[];
    eventId: string;
}>, {
    officeBranchId: string;
    version: number;
    taxes: {
        officeBranchId: string;
        updatedAt: Date;
        effectiveFrom: Date;
        effectiveUntil: Date | null;
        id: string;
        percentage: string;
    }[];
    eventId: string;
}, {
    officeBranchId: string;
    version: number;
    taxes: {
        officeBranchId: string;
        updatedAt: string;
        effectiveFrom: string;
        effectiveUntil: string | null;
        id: string;
        percentage: string;
    }[];
    eventId: string;
}>;
export declare function applyTaxEvent(input: unknown): Promise<{
    success: boolean;
    eventId: string;
}>;
declare const router: import("express-serve-static-core").Router;
export default router;
