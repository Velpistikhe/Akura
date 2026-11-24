import { z } from 'zod';
export declare const contractPriceHistoryParamsSchema: z.ZodObject<{
    contractPriceId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    contractPriceId: string;
}, {
    contractPriceId: string;
}>;
export declare const contractPriceHistoryQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const listContractPricesSchema: z.ZodObject<{
    contractId: z.ZodOptional<z.ZodString>;
    companyId: z.ZodOptional<z.ZodString>;
    itemSizeId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["priceService", "priceMaintenance", "effectiveFrom", "effectiveUntil", "createdAt", "updatedAt"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    isActive?: boolean | undefined;
    companyId?: string | undefined;
    sortBy?: "updatedAt" | "priceService" | "priceMaintenance" | "effectiveFrom" | "effectiveUntil" | "createdAt" | undefined;
    contractId?: string | undefined;
    itemSizeId?: string | undefined;
    search?: string | undefined;
}, {
    isActive?: "true" | "false" | undefined;
    companyId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "updatedAt" | "priceService" | "priceMaintenance" | "effectiveFrom" | "effectiveUntil" | "createdAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    contractId?: string | undefined;
    itemSizeId?: string | undefined;
    search?: string | undefined;
}>;
