import { z } from 'zod';
export declare const USER_LIST_CONFIG: {
    readonly sortFields: readonly ["username", "firstName", "lastName", "role", "section", "officeBranchId", "isActive", "updatedAt"];
    readonly filterFields: {
        readonly search: z.ZodOptional<z.ZodString>;
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
        readonly officeBranchId: z.ZodOptional<z.ZodString>;
        readonly isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: 20;
        readonly maxLimit: 100;
    };
};
