import { z } from 'zod';
/** The audit trail of one entity is read by its identifier. */
export declare const auditTrailEntitySchema: z.ZodObject<{
    entityId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    entityId: string;
}, {
    entityId: string;
}>;
/** The audit trail can be filtered by module, entity and action. */
export declare const AUDIT_TRAIL_LIST_CONFIG: {
    sortFields: readonly ["createdAt", "module", "entityType", "action"];
    pagination: {
        defaultPage: number;
        defaultLimit: number;
        maxLimit: number;
    };
    filterFields: {
        module: z.ZodOptional<z.ZodEnum<["menu", "reference"]>>;
        entityType: z.ZodOptional<z.ZodEnum<["MENU", "MENU_ITEM", "MENU_ACCESS", "OFFICE_BRANCH"]>>;
        entityId: z.ZodOptional<z.ZodString>;
        action: z.ZodOptional<z.ZodEnum<["CREATE", "UPDATE", "DELETE", "DEACTIVATE", "ACTIVATE"]>>;
    };
};
export declare const listAuditTrailSchema: z.ZodObject<{
    module: z.ZodOptional<z.ZodEnum<["menu", "reference"]>>;
    entityType: z.ZodOptional<z.ZodEnum<["MENU", "MENU_ITEM", "MENU_ACCESS", "OFFICE_BRANCH"]>>;
    entityId: z.ZodOptional<z.ZodString>;
    action: z.ZodOptional<z.ZodEnum<["CREATE", "UPDATE", "DELETE", "DEACTIVATE", "ACTIVATE"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["createdAt" | "module" | "entityType" | "action", ...("createdAt" | "module" | "entityType" | "action")[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: "createdAt" | "module" | "entityType" | "action" | undefined;
    entityId?: string | undefined;
    module?: "menu" | "reference" | undefined;
    entityType?: "MENU" | "MENU_ITEM" | "MENU_ACCESS" | "OFFICE_BRANCH" | undefined;
    action?: "CREATE" | "UPDATE" | "DELETE" | "DEACTIVATE" | "ACTIVATE" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "module" | "entityType" | "action" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    entityId?: string | undefined;
    module?: "menu" | "reference" | undefined;
    entityType?: "MENU" | "MENU_ITEM" | "MENU_ACCESS" | "OFFICE_BRANCH" | undefined;
    action?: "CREATE" | "UPDATE" | "DELETE" | "DEACTIVATE" | "ACTIVATE" | undefined;
}>;
export type ListAuditTrailInput = z.infer<typeof listAuditTrailSchema>;
