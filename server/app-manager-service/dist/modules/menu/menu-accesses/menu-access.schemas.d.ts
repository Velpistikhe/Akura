import { z } from 'zod';
export declare const menuAccessIdSchema: z.ZodObject<{
    menuAccessId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    menuAccessId: string;
}, {
    menuAccessId: string;
}>;
export declare const listMenuAccessesSchema: z.ZodObject<{
    menuItemId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        APP_MANAGER: "APP_MANAGER";
    }>>;
    section: z.ZodOptional<z.ZodNativeEnum<{
        ACCOUNTING: "ACCOUNTING";
        FINANCE: "FINANCE";
        HRD_MANAGEMENT: "HRD_MANAGEMENT";
        MARKETING: "MARKETING";
        FIELD_SERVICE: "FIELD_SERVICE";
    }>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["role" | "section" | "updatedAt" | "menuItemId", ...("role" | "section" | "updatedAt" | "menuItemId")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | undefined;
    sortBy?: "role" | "section" | "updatedAt" | "menuItemId" | undefined;
    menuItemId?: string | undefined;
}, {
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "role" | "section" | "updatedAt" | "menuItemId" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    menuItemId?: string | undefined;
}>;
export declare const createMenuAccessSchema: z.ZodObject<{
    menuItemId: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        APP_MANAGER: "APP_MANAGER";
    }>>>>;
    section: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
        ACCOUNTING: "ACCOUNTING";
        FINANCE: "FINANCE";
        HRD_MANAGEMENT: "HRD_MANAGEMENT";
        MARKETING: "MARKETING";
        FIELD_SERVICE: "FIELD_SERVICE";
    }>>>>;
}, "strict", z.ZodTypeAny, {
    role: "USER" | "ADMIN" | "APP_MANAGER" | null;
    section: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null;
    menuItemId: string;
}, {
    menuItemId: string;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | null | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
}>;
export declare const updateMenuAccessSchema: z.ZodEffects<z.ZodObject<{
    menuItemId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        APP_MANAGER: "APP_MANAGER";
    }>>>;
    section: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
        ACCOUNTING: "ACCOUNTING";
        FINANCE: "FINANCE";
        HRD_MANAGEMENT: "HRD_MANAGEMENT";
        MARKETING: "MARKETING";
        FIELD_SERVICE: "FIELD_SERVICE";
    }>>>;
}, "strict", z.ZodTypeAny, {
    role?: "USER" | "ADMIN" | "APP_MANAGER" | null | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    menuItemId?: string | undefined;
}, {
    role?: "USER" | "ADMIN" | "APP_MANAGER" | null | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    menuItemId?: string | undefined;
}>, {
    role?: "USER" | "ADMIN" | "APP_MANAGER" | null | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    menuItemId?: string | undefined;
}, {
    role?: "USER" | "ADMIN" | "APP_MANAGER" | null | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    menuItemId?: string | undefined;
}>;
export type ListMenuAccessesInput = z.infer<typeof listMenuAccessesSchema>;
export type CreateMenuAccessInput = z.infer<typeof createMenuAccessSchema>;
export type UpdateMenuAccessInput = z.infer<typeof updateMenuAccessSchema>;
