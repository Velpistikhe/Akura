import { z } from 'zod';
export declare const userIdSchema: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>;
export declare const listUsersSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
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
    officeBranchId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["username" | "firstName" | "lastName" | "updatedAt" | "officeBranchId" | "role" | "section" | "isActive", ...("username" | "firstName" | "lastName" | "updatedAt" | "officeBranchId" | "role" | "section" | "isActive")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    officeBranchId?: string | undefined;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | undefined;
    isActive?: boolean | undefined;
    search?: string | undefined;
    sortBy?: "username" | "firstName" | "lastName" | "updatedAt" | "officeBranchId" | "role" | "section" | "isActive" | undefined;
}, {
    officeBranchId?: string | undefined;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | undefined;
    isActive?: "true" | "false" | undefined;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "username" | "firstName" | "lastName" | "updatedAt" | "officeBranchId" | "role" | "section" | "isActive" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export declare const updateUserSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    role: z.ZodOptional<z.ZodNativeEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        APP_MANAGER: "APP_MANAGER";
    }>>;
    section: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
        ACCOUNTING: "ACCOUNTING";
        FINANCE: "FINANCE";
        HRD_MANAGEMENT: "HRD_MANAGEMENT";
        MARKETING: "MARKETING";
        FIELD_SERVICE: "FIELD_SERVICE";
    }>>>;
    officeBranchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    branch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    telp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
    email?: string | null | undefined;
    telp?: string | null | undefined;
    officeBranchId?: string | null | undefined;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    branch?: string | null | undefined;
    isActive?: boolean | undefined;
}, {
    version: number;
    email?: string | null | undefined;
    telp?: string | null | undefined;
    officeBranchId?: string | null | undefined;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    branch?: string | null | undefined;
    isActive?: boolean | undefined;
}>, {
    version: number;
    email?: string | null | undefined;
    telp?: string | null | undefined;
    officeBranchId?: string | null | undefined;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    branch?: string | null | undefined;
    isActive?: boolean | undefined;
}, {
    version: number;
    email?: string | null | undefined;
    telp?: string | null | undefined;
    officeBranchId?: string | null | undefined;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    branch?: string | null | undefined;
    isActive?: boolean | undefined;
}>, {
    version: number;
    email?: string | null | undefined;
    telp?: string | null | undefined;
    officeBranchId?: string | null | undefined;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    branch?: string | null | undefined;
    isActive?: boolean | undefined;
}, {
    version: number;
    email?: string | null | undefined;
    telp?: string | null | undefined;
    officeBranchId?: string | null | undefined;
    role?: "USER" | "ADMIN" | "APP_MANAGER" | undefined;
    section?: "ACCOUNTING" | "FINANCE" | "HRD_MANAGEMENT" | "MARKETING" | "FIELD_SERVICE" | null | undefined;
    branch?: string | null | undefined;
    isActive?: boolean | undefined;
}>;
export type ListUsersInput = z.infer<typeof listUsersSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
