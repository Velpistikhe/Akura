import { z } from 'zod';
export declare const COMPANY_LIST_CONFIG: {
    readonly sortFields: readonly ["name", "type", "address", "isSisterCompany", "version", "updatedAt"];
    readonly filterFields: {
        readonly search: z.ZodOptional<z.ZodString>;
        readonly isSisterCompany: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: 20;
        readonly maxLimit: 100;
    };
};
export declare const SERVICE_LIST_CONFIG: {
    readonly sortFields: readonly ["name", "type", "isActive"];
    readonly filterFields: {
        readonly type: z.ZodOptional<z.ZodNativeEnum<{
            TUBULAR: "TUBULAR";
            OCTG: "OCTG";
            OTHER: "OTHER";
        }>>;
        readonly name: z.ZodOptional<z.ZodString>;
        readonly isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
        readonly hasMaintenance: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: 20;
        readonly maxLimit: 100;
    };
};
export declare const ITEM_LIST_CONFIG: {
    readonly sortFields: readonly ["name", "serviceName"];
    readonly filterFields: {
        readonly name: z.ZodOptional<z.ZodString>;
        readonly serviceName: z.ZodOptional<z.ZodString>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: 20;
        readonly maxLimit: 100;
    };
};
export declare const ITEM_SIZE_LIST_CONFIG: {
    readonly sortFields: readonly ["size"];
    readonly filterFields: {
        readonly notIn: z.ZodOptional<z.ZodPipeline<z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">>>;
        readonly size: z.ZodOptional<z.ZodString>;
        readonly itemName: z.ZodOptional<z.ZodString>;
        readonly serviceName: z.ZodOptional<z.ZodString>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: 20;
        readonly maxLimit: 100;
    };
};
export declare const COMPANY_STAFF_LIST_CONFIG: {
    readonly sortFields: readonly ["companyId", "name", "title", "version", "updatedAt"];
    readonly filterFields: {
        readonly companyId: z.ZodOptional<z.ZodString>;
        readonly search: z.ZodOptional<z.ZodString>;
        readonly title: z.ZodOptional<z.ZodNativeEnum<{
            mr: "mr";
            mrs: "mrs";
        }>>;
    };
    readonly pagination: {
        readonly defaultPage: 1;
        readonly defaultLimit: 20;
        readonly maxLimit: 100;
    };
};
