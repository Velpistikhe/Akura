import { z } from 'zod';
export declare const MAX_EXCEL_ROWS = 2000;
export declare const MAX_EXCEL_BYTES: number;
export declare const exportItemSizesSchema: z.ZodObject<Omit<{
    notIn: z.ZodOptional<z.ZodPipeline<z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">>>;
    size: z.ZodOptional<z.ZodString>;
    itemName: z.ZodOptional<z.ZodString>;
    serviceName: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["size", ..."size"[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    itemId: z.ZodOptional<z.ZodString>;
}, "page" | "limit"> & {
    companyId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    sortOrder: "asc" | "desc";
    serviceName?: string | undefined;
    size?: string | undefined;
    companyId?: string | undefined;
    sortBy?: "size" | undefined;
    itemId?: string | undefined;
    notIn?: string[] | undefined;
    itemName?: string | undefined;
}, {
    serviceName?: string | undefined;
    size?: string | undefined;
    companyId?: string | undefined;
    sortBy?: "size" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    itemId?: string | undefined;
    notIn?: string | undefined;
    itemName?: string | undefined;
}>;
export type ExportItemSizesInput = z.infer<typeof exportItemSizesSchema>;
export declare const importContractExcelSchema: z.ZodObject<{
    companyId: z.ZodString;
    version: z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    version: number;
    companyId: string;
}, {
    version: string;
    companyId: string;
}>;
export type ExcelPriceRow = {
    row: number;
    itemSizeId: string;
    sizeVersion: number;
    priceService: string;
    priceMaintenance: string | null;
};
export declare class ExcelImportError extends Error {
    readonly errors: {
        row?: number;
        field?: string;
        message: string;
    }[];
    readonly statusCode: number;
    constructor(errors: {
        row?: number;
        field?: string;
        message: string;
    }[], statusCode?: number);
}
