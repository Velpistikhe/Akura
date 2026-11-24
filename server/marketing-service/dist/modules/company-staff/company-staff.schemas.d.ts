import { z } from 'zod';
export declare const companyStaffIdSchema: z.ZodObject<{
    companyStaffId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    companyStaffId: string;
}, {
    companyStaffId: string;
}>;
export declare const companyStaffHistorySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const listCompanyStaffSchema: z.ZodObject<{
    companyId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodNativeEnum<{
        mr: "mr";
        mrs: "mrs";
    }>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["name" | "version" | "updatedAt" | "companyId" | "title", ...("name" | "version" | "updatedAt" | "companyId" | "title")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    companyId?: string | undefined;
    title?: "mr" | "mrs" | undefined;
    sortBy?: "name" | "version" | "updatedAt" | "companyId" | "title" | undefined;
    search?: string | undefined;
}, {
    companyId?: string | undefined;
    title?: "mr" | "mrs" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "name" | "version" | "updatedAt" | "companyId" | "title" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>;
export declare const createCompanyStaffSchema: z.ZodObject<{
    companyId: z.ZodString;
    name: z.ZodString;
    title: z.ZodNativeEnum<{
        mr: "mr";
        mrs: "mrs";
    }>;
    telp: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    email: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, "strict", z.ZodTypeAny, {
    name: string;
    companyId: string;
    title: "mr" | "mrs";
    telp: string | null;
    email: string | null;
}, {
    name: string;
    companyId: string;
    title: "mr" | "mrs";
    telp?: string | null | undefined;
    email?: string | null | undefined;
}>;
export declare const updateCompanyStaffSchema: z.ZodEffects<z.ZodObject<{
    version: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodNativeEnum<{
        mr: "mr";
        mrs: "mrs";
    }>>;
    telp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    version: number;
    name?: string | undefined;
    title?: "mr" | "mrs" | undefined;
    telp?: string | null | undefined;
    email?: string | null | undefined;
}, {
    version: number;
    name?: string | undefined;
    title?: "mr" | "mrs" | undefined;
    telp?: string | null | undefined;
    email?: string | null | undefined;
}>, {
    version: number;
    name?: string | undefined;
    title?: "mr" | "mrs" | undefined;
    telp?: string | null | undefined;
    email?: string | null | undefined;
}, {
    version: number;
    name?: string | undefined;
    title?: "mr" | "mrs" | undefined;
    telp?: string | null | undefined;
    email?: string | null | undefined;
}>;
export declare const deactivateCompanyStaffSchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export type ListCompanyStaffInput = z.infer<typeof listCompanyStaffSchema>;
export type CreateCompanyStaffInput = z.infer<typeof createCompanyStaffSchema>;
export type UpdateCompanyStaffInput = z.infer<typeof updateCompanyStaffSchema>;
