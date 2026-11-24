import { z } from 'zod';
export declare const menuItemIdSchema: z.ZodObject<{
    menuItemId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    menuItemId: string;
}, {
    menuItemId: string;
}>;
export declare const listMenuItemsSchema: z.ZodObject<{
    menuId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["isActive" | "key" | "label" | "order" | "updatedAt" | "menuId", ...("isActive" | "key" | "label" | "order" | "updatedAt" | "menuId")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    isActive?: boolean | undefined;
    sortBy?: "isActive" | "key" | "label" | "order" | "updatedAt" | "menuId" | undefined;
    menuId?: string | undefined;
    search?: string | undefined;
}, {
    isActive?: "true" | "false" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "isActive" | "key" | "label" | "order" | "updatedAt" | "menuId" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    menuId?: string | undefined;
    search?: string | undefined;
}>;
export declare const createMenuItemSchema: z.ZodObject<{
    menuId: z.ZodString;
    key: z.ZodString;
    label: z.ZodString;
    order: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    key: string;
    label: string;
    order: number;
    menuId: string;
}, {
    key: string;
    label: string;
    menuId: string;
    order?: number | undefined;
}>;
export declare const updateMenuItemSchema: z.ZodObject<{
    menuId: z.ZodOptional<z.ZodString>;
    key: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    isActive?: boolean | undefined;
    key?: string | undefined;
    label?: string | undefined;
    order?: number | undefined;
    menuId?: string | undefined;
}, {
    isActive?: boolean | undefined;
    key?: string | undefined;
    label?: string | undefined;
    order?: number | undefined;
    menuId?: string | undefined;
}>;
export type ListMenuItemsInput = z.infer<typeof listMenuItemsSchema>;
export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
