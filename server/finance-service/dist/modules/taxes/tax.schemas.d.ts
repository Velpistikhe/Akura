import { z } from 'zod';
export declare const createTaxSchema: z.ZodObject<{
    percentage: z.ZodEffects<z.ZodPipeline<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodNumber, string, number>]>, z.ZodString>, string, string | number>;
    effectiveFrom: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>;
}, "strict", z.ZodTypeAny, {
    percentage: string;
    effectiveFrom: Date;
}, {
    percentage: string | number;
    effectiveFrom: string;
}>;
