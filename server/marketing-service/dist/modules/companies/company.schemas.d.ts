import { z } from 'zod';
export declare const companyIdSchema: z.ZodObject<{
    companyId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    companyId: string;
}, {
    companyId: string;
}>;
export declare const listCompaniesSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isSisterCompany: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["name" | "type" | "address" | "isSisterCompany" | "version" | "updatedAt", ...("name" | "type" | "address" | "isSisterCompany" | "version" | "updatedAt")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    isSisterCompany?: boolean | undefined;
    sortBy?: "name" | "type" | "address" | "isSisterCompany" | "version" | "updatedAt" | undefined;
    search?: string | undefined;
}, {
    isSisterCompany?: "true" | "false" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "name" | "type" | "address" | "isSisterCompany" | "version" | "updatedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>;
export declare const createCompanySchema: z.ZodObject<{
    isSisterCompany: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    npwp: z.ZodString;
    name: z.ZodString;
    type: z.ZodNativeEnum<{
        PT: "PT";
        CV: "CV";
        FIRMA: "FIRMA";
        KOPERASI: "KOPERASI";
        PERORANGAN: "PERORANGAN";
    }>;
    address: z.ZodString;
}, "strict", z.ZodTypeAny, {
    name: string;
    type: "PT" | "CV" | "FIRMA" | "KOPERASI" | "PERORANGAN";
    address: string;
    isSisterCompany: boolean;
    npwp: string;
}, {
    name: string;
    type: "PT" | "CV" | "FIRMA" | "KOPERASI" | "PERORANGAN";
    address: string;
    npwp: string;
    isSisterCompany?: boolean | undefined;
}>;
export declare const updateCompanySchema: z.ZodEffects<z.ZodObject<{
    version: z.ZodNumber;
    npwp: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodNativeEnum<{
        PT: "PT";
        CV: "CV";
        FIRMA: "FIRMA";
        KOPERASI: "KOPERASI";
        PERORANGAN: "PERORANGAN";
    }>>;
    address: z.ZodOptional<z.ZodString>;
    isSisterCompany: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    version: number;
    name?: string | undefined;
    type?: "PT" | "CV" | "FIRMA" | "KOPERASI" | "PERORANGAN" | undefined;
    address?: string | undefined;
    isSisterCompany?: boolean | undefined;
    npwp?: string | undefined;
}, {
    version: number;
    name?: string | undefined;
    type?: "PT" | "CV" | "FIRMA" | "KOPERASI" | "PERORANGAN" | undefined;
    address?: string | undefined;
    isSisterCompany?: boolean | undefined;
    npwp?: string | undefined;
}>, {
    version: number;
    name?: string | undefined;
    type?: "PT" | "CV" | "FIRMA" | "KOPERASI" | "PERORANGAN" | undefined;
    address?: string | undefined;
    isSisterCompany?: boolean | undefined;
    npwp?: string | undefined;
}, {
    version: number;
    name?: string | undefined;
    type?: "PT" | "CV" | "FIRMA" | "KOPERASI" | "PERORANGAN" | undefined;
    address?: string | undefined;
    isSisterCompany?: boolean | undefined;
    npwp?: string | undefined;
}>;
export declare const deactivateCompanySchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const companyHistorySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type ListCompaniesInput = z.infer<typeof listCompaniesSchema>;
export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
