import { z } from 'zod';
export declare const listItemsSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    serviceName: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["name" | "serviceName", ...("name" | "serviceName")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    name?: string | undefined;
    serviceName?: string | undefined;
    sortBy?: "name" | "serviceName" | undefined;
}, {
    name?: string | undefined;
    serviceName?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "name" | "serviceName" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export declare const listItemSizesSchema: z.ZodObject<{
    notIn: z.ZodOptional<z.ZodPipeline<z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">>>;
    size: z.ZodOptional<z.ZodString>;
    itemName: z.ZodOptional<z.ZodString>;
    serviceName: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["size", ..."size"[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    itemId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    serviceName?: string | undefined;
    size?: string | undefined;
    sortBy?: "size" | undefined;
    itemId?: string | undefined;
    notIn?: string[] | undefined;
    itemName?: string | undefined;
}, {
    serviceName?: string | undefined;
    size?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "size" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    itemId?: string | undefined;
    notIn?: string | undefined;
    itemName?: string | undefined;
}>;
export declare const listContractItemSizesSchema: z.ZodEffects<z.ZodObject<{
    notIn: z.ZodOptional<z.ZodPipeline<z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">>>;
    size: z.ZodOptional<z.ZodString>;
    itemName: z.ZodOptional<z.ZodString>;
    serviceName: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["size", ..."size"[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    itemId: z.ZodOptional<z.ZodString>;
} & {
    companyId: z.ZodString;
    exclude: z.ZodOptional<z.ZodPipeline<z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">>>;
}, "strict", z.ZodTypeAny, {
    companyId: string;
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    serviceName?: string | undefined;
    size?: string | undefined;
    sortBy?: "size" | undefined;
    itemId?: string | undefined;
    notIn?: string[] | undefined;
    itemName?: string | undefined;
    exclude?: string[] | undefined;
}, {
    companyId: string;
    serviceName?: string | undefined;
    size?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "size" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    itemId?: string | undefined;
    notIn?: string | undefined;
    itemName?: string | undefined;
    exclude?: string | undefined;
}>, {
    notIn: string[] | undefined;
    companyId: string;
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    serviceName?: string | undefined;
    size?: string | undefined;
    sortBy?: "size" | undefined;
    itemId?: string | undefined;
    itemName?: string | undefined;
}, {
    companyId: string;
    serviceName?: string | undefined;
    size?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "size" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    itemId?: string | undefined;
    notIn?: string | undefined;
    itemName?: string | undefined;
    exclude?: string | undefined;
}>;
export type ListContractItemSizesInput = z.infer<typeof listContractItemSizesSchema>;
export declare const contractPriceOptionsParamsSchema: z.ZodObject<{
    contractId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    contractId: string;
}, {
    contractId: string;
}>;
export type ContractPriceOptionsParams = z.infer<typeof contractPriceOptionsParamsSchema>;
export declare const listContractPriceOptionsSchema: z.ZodObject<{
    notIn: z.ZodOptional<z.ZodPipeline<z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">>>;
    size: z.ZodOptional<z.ZodString>;
    itemName: z.ZodOptional<z.ZodString>;
    serviceName: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["size", ..."size"[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    itemId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    serviceName?: string | undefined;
    size?: string | undefined;
    sortBy?: "size" | undefined;
    itemId?: string | undefined;
    notIn?: string[] | undefined;
    itemName?: string | undefined;
}, {
    serviceName?: string | undefined;
    size?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "size" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    itemId?: string | undefined;
    notIn?: string | undefined;
    itemName?: string | undefined;
}>;
export type ListContractPriceOptionsInput = z.infer<typeof listContractPriceOptionsSchema>;
export declare const versionSchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const referenceLabel: (max: number) => z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>;
export declare const referenceKey: (value: string) => string;
export declare const updateItemSchema: z.ZodEffects<z.ZodObject<{
    version: z.ZodNumber;
} & {
    name: z.ZodOptional<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>>;
    uom: z.ZodOptional<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>>;
    serviceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    version: number;
    name?: string | undefined;
    uom?: string | undefined;
    serviceId?: string | null | undefined;
}, {
    version: number;
    name?: string | undefined;
    uom?: string | undefined;
    serviceId?: string | null | undefined;
}>, {
    version: number;
    name?: string | undefined;
    uom?: string | undefined;
    serviceId?: string | null | undefined;
}, {
    version: number;
    name?: string | undefined;
    uom?: string | undefined;
    serviceId?: string | null | undefined;
}>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export declare const createItemPriceSchema: z.ZodObject<{
    priceServicePrimary: z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>;
    priceServiceSisterCompany: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
    priceMaintenancePrimary: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
    priceMaintenanceSisterCompany: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
}, "strict", z.ZodTypeAny, {
    priceServicePrimary: string | number;
    priceServiceSisterCompany?: string | number | null | undefined;
    priceMaintenancePrimary?: string | number | null | undefined;
    priceMaintenanceSisterCompany?: string | number | null | undefined;
}, {
    priceServicePrimary: string | number;
    priceServiceSisterCompany?: string | number | null | undefined;
    priceMaintenancePrimary?: string | number | null | undefined;
    priceMaintenanceSisterCompany?: string | number | null | undefined;
}>;
export declare const updateItemPriceSchema: z.ZodEffects<z.ZodObject<{
    priceServicePrimary: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>;
    priceServiceSisterCompany: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>>;
    priceMaintenancePrimary: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>>;
    priceMaintenanceSisterCompany: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>>;
} & {
    version: z.ZodNumber;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    version: number;
    isActive?: boolean | undefined;
    priceServicePrimary?: string | number | undefined;
    priceServiceSisterCompany?: string | number | null | undefined;
    priceMaintenancePrimary?: string | number | null | undefined;
    priceMaintenanceSisterCompany?: string | number | null | undefined;
}, {
    version: number;
    isActive?: boolean | undefined;
    priceServicePrimary?: string | number | undefined;
    priceServiceSisterCompany?: string | number | null | undefined;
    priceMaintenancePrimary?: string | number | null | undefined;
    priceMaintenanceSisterCompany?: string | number | null | undefined;
}>, {
    version: number;
    isActive?: boolean | undefined;
    priceServicePrimary?: string | number | undefined;
    priceServiceSisterCompany?: string | number | null | undefined;
    priceMaintenancePrimary?: string | number | null | undefined;
    priceMaintenanceSisterCompany?: string | number | null | undefined;
}, {
    version: number;
    isActive?: boolean | undefined;
    priceServicePrimary?: string | number | undefined;
    priceServiceSisterCompany?: string | number | null | undefined;
    priceMaintenancePrimary?: string | number | null | undefined;
    priceMaintenanceSisterCompany?: string | number | null | undefined;
}>;
export type UpdatePriceInput = z.infer<typeof updateItemPriceSchema>;
export declare const contractPriceIdSchema: z.ZodObject<{
    contractPriceId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    contractPriceId: string;
}, {
    contractPriceId: string;
}>;
export declare const createContractPriceSchema: z.ZodObject<{
    contractId: z.ZodString;
    priceService: z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>;
    priceMaintenance: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
}, "strict", z.ZodTypeAny, {
    contractId: string;
    priceService: string | number;
    priceMaintenance?: string | number | null | undefined;
}, {
    contractId: string;
    priceService: string | number;
    priceMaintenance?: string | number | null | undefined;
}>;
export declare const updateContractPriceSchema: z.ZodEffects<z.ZodObject<{
    version: z.ZodNumber;
} & {
    priceService: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>;
    priceMaintenance: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    version: number;
    isActive?: boolean | undefined;
    priceService?: string | number | undefined;
    priceMaintenance?: string | number | null | undefined;
}, {
    version: number;
    isActive?: boolean | undefined;
    priceService?: string | number | undefined;
    priceMaintenance?: string | number | null | undefined;
}>, {
    version: number;
    isActive?: boolean | undefined;
    priceService?: string | number | undefined;
    priceMaintenance?: string | number | null | undefined;
}, {
    version: number;
    isActive?: boolean | undefined;
    priceService?: string | number | undefined;
    priceMaintenance?: string | number | null | undefined;
}>;
export type PriceInput = z.infer<typeof createItemPriceSchema>;
export type ContractPriceInput = z.infer<typeof createContractPriceSchema>;
export declare const itemIdSchema: z.ZodObject<{
    itemId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    itemId: string;
}, {
    itemId: string;
}>;
export declare const itemSizeIdSchema: z.ZodObject<{
    itemSizeId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    itemSizeId: string;
}, {
    itemSizeId: string;
}>;
export declare const createItemSchema: z.ZodEffects<z.ZodObject<{
    serviceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    inspectionScopes: z.ZodEffects<z.ZodDefault<z.ZodArray<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, "many">>, string[], string[] | undefined>;
    maintenanceScopes: z.ZodEffects<z.ZodDefault<z.ZodArray<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, "many">>, string[], string[] | undefined>;
    name: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>;
    uom: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>;
    sizes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        priceServicePrimary: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>;
        priceServiceSisterCompany: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
        priceMaintenancePrimary: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
        priceMaintenanceSisterCompany: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
        size: z.ZodNullable<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>>;
    }, "strict", z.ZodTypeAny, {
        size: string | null;
        priceServicePrimary?: string | number | undefined;
        priceServiceSisterCompany?: string | number | null | undefined;
        priceMaintenancePrimary?: string | number | null | undefined;
        priceMaintenanceSisterCompany?: string | number | null | undefined;
    }, {
        size: string | null;
        priceServicePrimary?: string | number | undefined;
        priceServiceSisterCompany?: string | number | null | undefined;
        priceMaintenancePrimary?: string | number | null | undefined;
        priceMaintenanceSisterCompany?: string | number | null | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    name: string;
    uom: string;
    inspectionScopes: string[];
    maintenanceScopes: string[];
    sizes: {
        size: string | null;
        priceServicePrimary?: string | number | undefined;
        priceServiceSisterCompany?: string | number | null | undefined;
        priceMaintenancePrimary?: string | number | null | undefined;
        priceMaintenanceSisterCompany?: string | number | null | undefined;
    }[];
    serviceId?: string | null | undefined;
}, {
    name: string;
    uom: string;
    serviceId?: string | null | undefined;
    inspectionScopes?: string[] | undefined;
    maintenanceScopes?: string[] | undefined;
    sizes?: {
        size: string | null;
        priceServicePrimary?: string | number | undefined;
        priceServiceSisterCompany?: string | number | null | undefined;
        priceMaintenancePrimary?: string | number | null | undefined;
        priceMaintenanceSisterCompany?: string | number | null | undefined;
    }[] | undefined;
}>, {
    name: string;
    uom: string;
    inspectionScopes: string[];
    maintenanceScopes: string[];
    sizes: {
        size: string | null;
        priceServicePrimary?: string | number | undefined;
        priceServiceSisterCompany?: string | number | null | undefined;
        priceMaintenancePrimary?: string | number | null | undefined;
        priceMaintenanceSisterCompany?: string | number | null | undefined;
    }[];
    serviceId?: string | null | undefined;
}, {
    name: string;
    uom: string;
    serviceId?: string | null | undefined;
    inspectionScopes?: string[] | undefined;
    maintenanceScopes?: string[] | undefined;
    sizes?: {
        size: string | null;
        priceServicePrimary?: string | number | undefined;
        priceServiceSisterCompany?: string | number | null | undefined;
        priceMaintenancePrimary?: string | number | null | undefined;
        priceMaintenanceSisterCompany?: string | number | null | undefined;
    }[] | undefined;
}>;
export declare const addItemSizeSchema: z.ZodObject<{
    priceServicePrimary: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>;
    priceServiceSisterCompany: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
    priceMaintenancePrimary: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
    priceMaintenanceSisterCompany: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>>>;
    itemId: z.ZodString;
    itemVersion: z.ZodNumber;
    size: z.ZodNullable<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    size: string | null;
    itemId: string;
    itemVersion: number;
    priceServicePrimary?: string | number | undefined;
    priceServiceSisterCompany?: string | number | null | undefined;
    priceMaintenancePrimary?: string | number | null | undefined;
    priceMaintenanceSisterCompany?: string | number | null | undefined;
}, {
    size: string | null;
    itemId: string;
    itemVersion: number;
    priceServicePrimary?: string | number | undefined;
    priceServiceSisterCompany?: string | number | null | undefined;
    priceMaintenancePrimary?: string | number | null | undefined;
    priceMaintenanceSisterCompany?: string | number | null | undefined;
}>;
export declare const createItemScopeSchema: z.ZodObject<{
    inspectionScopes: z.ZodEffects<z.ZodArray<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, "many">, string[], string[]>;
}, "strict", z.ZodTypeAny, {
    inspectionScopes: string[];
}, {
    inspectionScopes: string[];
}>;
export declare const itemInspectionScopeIdSchema: z.ZodObject<{
    itemId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    itemId: string;
}, {
    itemId: string;
}>;
export type CreateItemScopeInput = z.infer<typeof createItemScopeSchema>;
export declare const itemHistorySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type CreateItemInput = z.infer<typeof createItemSchema>;
export type AddItemSizeInput = z.infer<typeof addItemSizeSchema>;
export type ListItemsInput = z.infer<typeof listItemsSchema>;
export type ListItemSizesInput = z.infer<typeof listItemSizesSchema>;
