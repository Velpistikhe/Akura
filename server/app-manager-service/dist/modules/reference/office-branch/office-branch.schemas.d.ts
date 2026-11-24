import { z } from 'zod';
export declare const officeBranchIdSchema: z.ZodObject<{
    officeBranchId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    officeBranchId: string;
}, {
    officeBranchId: string;
}>;
export declare const listOfficeBranchesSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    isHead: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["name" | "updatedAt" | "address" | "telp" | "email" | "isHead", ...("name" | "updatedAt" | "address" | "telp" | "email" | "isHead")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: "name" | "updatedAt" | "address" | "telp" | "email" | "isHead" | undefined;
    isHead?: boolean | undefined;
    search?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "name" | "updatedAt" | "address" | "telp" | "email" | "isHead" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    isHead?: "true" | "false" | undefined;
    search?: string | undefined;
}>;
export declare const createOfficeBranchSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    telp: z.ZodString;
    email: z.ZodEffects<z.ZodString, string, string>;
    isHead: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strict", z.ZodTypeAny, {
    name: string;
    address: string;
    telp: string;
    email: string;
    isHead: boolean;
}, {
    name: string;
    address: string;
    telp: string;
    email: string;
    isHead?: boolean | undefined;
}>;
export declare const updateOfficeBranchSchema: z.ZodEffects<z.ZodObject<{
    address: z.ZodOptional<z.ZodString>;
    telp: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    isHead: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    address?: string | undefined;
    telp?: string | undefined;
    email?: string | undefined;
    isHead?: boolean | undefined;
}, {
    address?: string | undefined;
    telp?: string | undefined;
    email?: string | undefined;
    isHead?: boolean | undefined;
}>, {
    address?: string | undefined;
    telp?: string | undefined;
    email?: string | undefined;
    isHead?: boolean | undefined;
}, {
    address?: string | undefined;
    telp?: string | undefined;
    email?: string | undefined;
    isHead?: boolean | undefined;
}>;
export type ListOfficeBranchesInput = z.infer<typeof listOfficeBranchesSchema>;
export type CreateOfficeBranchInput = z.infer<typeof createOfficeBranchSchema>;
export type UpdateOfficeBranchInput = z.infer<typeof updateOfficeBranchSchema>;
