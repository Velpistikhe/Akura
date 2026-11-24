import { z } from 'zod';
export declare const MENU_LIST_CONFIG: {
    readonly sortFields: readonly ["key", "label", "hasItem", "order", "isActive", "updatedAt"];
    readonly filterFields: {
        readonly search: z.ZodOptional<z.ZodString>;
        readonly hasItem: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
        readonly isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: number;
        readonly maxLimit: 100;
    };
};
export declare const MENU_ACCESS_LIST_CONFIG: {
    readonly sortFields: readonly ["menuItemId", "role", "section", "updatedAt"];
    readonly filterFields: {
        readonly menuItemId: z.ZodOptional<z.ZodString>;
        readonly role: z.ZodOptional<z.ZodNativeEnum<{
            USER: "USER";
            ADMIN: "ADMIN";
            APP_MANAGER: "APP_MANAGER";
        }>>;
        readonly section: z.ZodOptional<z.ZodNativeEnum<{
            ACCOUNTING: "ACCOUNTING";
            FINANCE: "FINANCE";
            HRD_MANAGEMENT: "HRD_MANAGEMENT";
            MARKETING: "MARKETING";
            FIELD_SERVICE: "FIELD_SERVICE";
        }>>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: number;
        readonly maxLimit: 100;
    };
};
export declare const MENU_ITEM_LIST_CONFIG: {
    readonly sortFields: readonly ["menuId", "key", "label", "order", "isActive", "updatedAt"];
    readonly filterFields: {
        readonly menuId: z.ZodOptional<z.ZodString>;
        readonly isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
        readonly search: z.ZodOptional<z.ZodString>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: number;
        readonly maxLimit: 100;
    };
};
export declare const OFFICE_BRANCH_LIST_CONFIG: {
    readonly sortFields: readonly ["name", "address", "telp", "email", "isHead", "updatedAt"];
    readonly filterFields: {
        readonly search: z.ZodOptional<z.ZodString>;
        readonly isHead: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: number;
        readonly maxLimit: 100;
    };
};
