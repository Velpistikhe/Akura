import { z } from 'zod';
export declare const serviceIdSchema: z.ZodObject<{
    serviceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    serviceId: string;
}, {
    serviceId: string;
}>;
export declare const maintenanceScopeIdSchema: z.ZodObject<{
    serviceId: z.ZodString;
    scopeId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    serviceId: string;
    scopeId: string;
}, {
    serviceId: string;
    scopeId: string;
}>;
export declare const listServicesSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodNativeEnum<{
        TUBULAR: "TUBULAR";
        OCTG: "OCTG";
        OTHER: "OTHER";
    }>>;
    name: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    hasMaintenance: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["name" | "type" | "isActive", ...("name" | "type" | "isActive")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    name?: string | undefined;
    type?: "TUBULAR" | "OCTG" | "OTHER" | undefined;
    isActive?: boolean | undefined;
    sortBy?: "name" | "type" | "isActive" | undefined;
    hasMaintenance?: boolean | undefined;
}, {
    name?: string | undefined;
    type?: "TUBULAR" | "OCTG" | "OTHER" | undefined;
    isActive?: "true" | "false" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "name" | "type" | "isActive" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    hasMaintenance?: "true" | "false" | undefined;
}>;
export declare const createServiceSchema: z.ZodEffects<z.ZodObject<{
    inspectionScopes: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>>;
    hasMaintenance: z.ZodBoolean;
    maintenanceScopes: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>>;
    type: z.ZodNativeEnum<{
        TUBULAR: "TUBULAR";
        OCTG: "OCTG";
        OTHER: "OTHER";
    }>;
    name: z.ZodEffects<z.ZodString, string, string>;
}, "strict", z.ZodTypeAny, {
    name: string;
    type: "TUBULAR" | "OCTG" | "OTHER";
    inspectionScopes: string[];
    maintenanceScopes: string[];
    hasMaintenance: boolean;
}, {
    name: string;
    type: "TUBULAR" | "OCTG" | "OTHER";
    hasMaintenance: boolean;
    inspectionScopes?: string[] | undefined;
    maintenanceScopes?: string[] | undefined;
}>, {
    name: string;
    type: "TUBULAR" | "OCTG" | "OTHER";
    inspectionScopes: string[];
    maintenanceScopes: string[];
    hasMaintenance: boolean;
}, {
    name: string;
    type: "TUBULAR" | "OCTG" | "OTHER";
    hasMaintenance: boolean;
    inspectionScopes?: string[] | undefined;
    maintenanceScopes?: string[] | undefined;
}>;
export declare const createMaintenanceScopeSchema: z.ZodObject<{
    scope: z.ZodString;
}, "strict", z.ZodTypeAny, {
    scope: string;
}, {
    scope: string;
}>;
export declare const deactivateServiceSchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const serviceHistorySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const updateServiceSchema: z.ZodEffects<z.ZodObject<{
    version: z.ZodNumber;
} & {
    type: z.ZodOptional<z.ZodNativeEnum<{
        TUBULAR: "TUBULAR";
        OCTG: "OCTG";
        OTHER: "OTHER";
    }>>;
    name: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    hasMaintenance: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    version: number;
    name?: string | undefined;
    type?: "TUBULAR" | "OCTG" | "OTHER" | undefined;
    hasMaintenance?: boolean | undefined;
}, {
    version: number;
    name?: string | undefined;
    type?: "TUBULAR" | "OCTG" | "OTHER" | undefined;
    hasMaintenance?: boolean | undefined;
}>, {
    version: number;
    name?: string | undefined;
    type?: "TUBULAR" | "OCTG" | "OTHER" | undefined;
    hasMaintenance?: boolean | undefined;
}, {
    version: number;
    name?: string | undefined;
    type?: "TUBULAR" | "OCTG" | "OTHER" | undefined;
    hasMaintenance?: boolean | undefined;
}>;
export type ListServicesInput = z.infer<typeof listServicesSchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type CreateInspectionScopeInput = z.infer<typeof createInspectionScopeSchema>;
export type CreateMaintenanceScopeInput = z.infer<typeof createMaintenanceScopeSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export declare const inspectionScopeIdSchema: z.ZodObject<{
    serviceId: z.ZodString;
    inspectionScopeId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    serviceId: string;
    inspectionScopeId: string;
}, {
    serviceId: string;
    inspectionScopeId: string;
}>;
export declare const createInspectionScopeSchema: z.ZodObject<{
    inspectionScope: z.ZodString;
}, "strict", z.ZodTypeAny, {
    inspectionScope: string;
}, {
    inspectionScope: string;
}>;
