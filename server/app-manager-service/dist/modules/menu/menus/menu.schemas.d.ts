import { z } from 'zod';
export declare const menuIdSchema: z.ZodObject<{
    menuId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    menuId: string;
}, {
    menuId: string;
}>;
export declare const listMenusSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    hasItem: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["isActive" | "key" | "label" | "hasItem" | "order" | "updatedAt", ...("isActive" | "key" | "label" | "hasItem" | "order" | "updatedAt")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    isActive?: boolean | undefined;
    sortBy?: "isActive" | "key" | "label" | "hasItem" | "order" | "updatedAt" | undefined;
    hasItem?: boolean | undefined;
    search?: string | undefined;
}, {
    isActive?: "true" | "false" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "isActive" | "key" | "label" | "hasItem" | "order" | "updatedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    hasItem?: "true" | "false" | undefined;
    search?: string | undefined;
}>;
export declare const createMenuSchema: z.ZodDiscriminatedUnion<"hasItem", [z.ZodObject<{
    hasItem: z.ZodLiteral<true>;
    items: z.ZodEffects<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        order: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        key: string;
        label: string;
        order: number;
    }, {
        key: string;
        label: string;
        order?: number | undefined;
    }>, "many">, {
        key: string;
        label: string;
        order: number;
    }[], {
        key: string;
        label: string;
        order?: number | undefined;
    }[]>;
    key: z.ZodString;
    label: z.ZodString;
    order: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    key: string;
    label: string;
    hasItem: true;
    order: number;
    items: {
        key: string;
        label: string;
        order: number;
    }[];
}, {
    key: string;
    label: string;
    hasItem: true;
    items: {
        key: string;
        label: string;
        order?: number | undefined;
    }[];
    order?: number | undefined;
}>, z.ZodObject<{
    hasItem: z.ZodLiteral<false>;
    key: z.ZodString;
    label: z.ZodString;
    order: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    key: string;
    label: string;
    hasItem: false;
    order: number;
}, {
    key: string;
    label: string;
    hasItem: false;
    order?: number | undefined;
}>]>;
export declare const updateMenuSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    hasItem: z.ZodOptional<z.ZodBoolean>;
    order: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    isActive?: boolean | undefined;
    key?: string | undefined;
    label?: string | undefined;
    hasItem?: boolean | undefined;
    order?: number | undefined;
}, {
    isActive?: boolean | undefined;
    key?: string | undefined;
    label?: string | undefined;
    hasItem?: boolean | undefined;
    order?: number | undefined;
}>;
export type ListMenusInput = z.infer<typeof listMenusSchema>;
export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;
export type MenuIdParams = z.infer<typeof menuIdSchema>;
