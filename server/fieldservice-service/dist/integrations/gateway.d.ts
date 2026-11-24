import { Request } from 'express';
import { z } from 'zod';
export declare function gatewayGet(path: string, req: Request): Promise<unknown>;
export declare const quotationSchema: z.ZodObject<{
    id: z.ZodString;
    officeBranchId: z.ZodString;
    version: z.ZodNumber;
    isActive: z.ZodBoolean;
    no: z.ZodNullable<z.ZodNumber>;
    numberYear: z.ZodNullable<z.ZodNumber>;
    status: z.ZodString;
    revision: z.ZodNumber;
    date: z.ZodNullable<z.ZodString>;
    jobStart: z.ZodString;
    inquiryMethod: z.ZodString;
    inquiryDate: z.ZodString;
    subject: z.ZodString;
    termOfPayment: z.ZodString;
    validity: z.ZodString;
    supplyAkura: z.ZodString;
    supplyCustomer: z.ZodString;
    location: z.ZodString;
    accomplished: z.ZodString;
    deliveryReports: z.ZodString;
    deliveryInvoice: z.ZodString;
    staffId: z.ZodString;
    customerSnapshot: z.ZodString;
    companySnapshot: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    subTotal: z.ZodString;
    tax: z.ZodString;
    taxAmount: z.ZodString;
    total: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    hasWorkOrder: z.ZodBoolean;
    workOrderId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodString;
    officeBranchId: z.ZodString;
    version: z.ZodNumber;
    isActive: z.ZodBoolean;
    no: z.ZodNullable<z.ZodNumber>;
    numberYear: z.ZodNullable<z.ZodNumber>;
    status: z.ZodString;
    revision: z.ZodNumber;
    date: z.ZodNullable<z.ZodString>;
    jobStart: z.ZodString;
    inquiryMethod: z.ZodString;
    inquiryDate: z.ZodString;
    subject: z.ZodString;
    termOfPayment: z.ZodString;
    validity: z.ZodString;
    supplyAkura: z.ZodString;
    supplyCustomer: z.ZodString;
    location: z.ZodString;
    accomplished: z.ZodString;
    deliveryReports: z.ZodString;
    deliveryInvoice: z.ZodString;
    staffId: z.ZodString;
    customerSnapshot: z.ZodString;
    companySnapshot: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    subTotal: z.ZodString;
    tax: z.ZodString;
    taxAmount: z.ZodString;
    total: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    hasWorkOrder: z.ZodBoolean;
    workOrderId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    officeBranchId: z.ZodString;
    version: z.ZodNumber;
    isActive: z.ZodBoolean;
    no: z.ZodNullable<z.ZodNumber>;
    numberYear: z.ZodNullable<z.ZodNumber>;
    status: z.ZodString;
    revision: z.ZodNumber;
    date: z.ZodNullable<z.ZodString>;
    jobStart: z.ZodString;
    inquiryMethod: z.ZodString;
    inquiryDate: z.ZodString;
    subject: z.ZodString;
    termOfPayment: z.ZodString;
    validity: z.ZodString;
    supplyAkura: z.ZodString;
    supplyCustomer: z.ZodString;
    location: z.ZodString;
    accomplished: z.ZodString;
    deliveryReports: z.ZodString;
    deliveryInvoice: z.ZodString;
    staffId: z.ZodString;
    customerSnapshot: z.ZodString;
    companySnapshot: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    subTotal: z.ZodString;
    tax: z.ZodString;
    taxAmount: z.ZodString;
    total: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    hasWorkOrder: z.ZodBoolean;
    workOrderId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        itemSizeId: z.ZodString;
        position: z.ZodNumber;
        serviceName: z.ZodString;
        serviceType: z.ZodString;
        itemName: z.ZodString;
        size: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodString;
        quantityMaintenance: z.ZodString;
        priceInspection: z.ZodString;
        priceMaintenance: z.ZodNullable<z.ZodString>;
        subTotal: z.ZodString;
        priceSelection: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        isActive: z.ZodBoolean;
        version: z.ZodNumber;
        inspectionScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        maintenanceScopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.ZodTypeAny, "passthrough">>, "many">;
}, z.ZodTypeAny, "passthrough">>;
export type QuotationSnapshot = z.infer<typeof quotationSchema>;
declare const quotationItemSnapshotKeys: readonly ["id", "itemSizeId", "position", "serviceName", "serviceType", "itemName", "size", "note", "quantityInspection", "quantityMaintenance", "isActive", "version"];
declare const quotationSnapshotKeys: readonly ["id", "officeBranchId", "no", "numberYear", "revision", "date", "jobStart", "inquiryMethod", "inquiryDate", "subject", "termOfPayment", "validity", "supplyAkura", "supplyCustomer", "location", "accomplished", "deliveryReports", "deliveryInvoice", "customerSnapshot", "companySnapshot", "staffId", "status", "isActive", "version", "createdAt", "updatedAt", "tax"];
export type WorkOrderQuotationSnapshot = Pick<QuotationSnapshot, typeof quotationSnapshotKeys[number]> & {
    items: Pick<QuotationSnapshot['items'][number], typeof quotationItemSnapshotKeys[number]>[];
};
/**
 * Reduces a live Marketing quotation to what a Work Order stores: identity, lifecycle
 * and descriptive content plus its items, with every price excluded (header
 * subTotal/taxAmount/total, item priceInspection/priceMaintenance/subTotal/priceSelection).
 * The approved tax rate is kept because it identifies the document, not a price.
 *
 * Keys are projected through an explicit allowlist rather than a rest-spread, so the
 * upstream passthrough() payload cannot leak an extra Marketing column into the column,
 * and no price field can be stored by accident.
 */
export declare function toQuotationSnapshot(quotation: QuotationSnapshot): WorkOrderQuotationSnapshot;
/**
 * The exact item content a Work Order row stores: the size identity plus the
 * descriptive catalog snapshot taken from the quotation. Only these fields are
 * persisted, so no extra Marketing column and no price can reach the column.
 */
export type WorkOrderItemSnapshot = {
    itemSizeId: string;
    serviceName: string;
    inspectionScope: string;
    maintenanceScope: string;
    itemName: string;
    size: string | null;
};
/**
 * Builds the stored item snapshot from a live quotation line. The description is
 * taken from the quotation line (its historical catalog snapshot) and the scopes
 * from the frozen scope snapshot of that line, so the Work Order item matches the
 * approved document even after the catalog changes.
 */
export declare function toWorkOrderItemSnapshot(item: QuotationSnapshot['items'][number]): WorkOrderItemSnapshot;
/**
 * Live Marketing validation used when a quotation-based Work order starts.
 * Marketing is the source of truth: network failure/timeout/5xx means Marketing
 * is unavailable (503); a 404 or any inactive/non-approved quotation means the
 * local snapshot no longer matches Marketing (409 mismatch).
 */
export declare function loadQuotationForStart(req: Request, id: string, branch: string): Promise<QuotationSnapshot>;
declare const companySchema: z.ZodObject<{
    id: z.ZodString;
    officeBranchId: z.ZodString;
    name: z.ZodString;
    revoked: z.ZodBoolean;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodString;
    officeBranchId: z.ZodString;
    name: z.ZodString;
    revoked: z.ZodBoolean;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    officeBranchId: z.ZodString;
    name: z.ZodString;
    revoked: z.ZodBoolean;
}, z.ZodTypeAny, "passthrough">>;
export type CompanySnapshot = z.infer<typeof companySchema>;
/** Live company profile from Marketing; only non-revoked companies in the caller branch are accepted. */
export declare function loadCompany(req: Request, companyId: string, branch: string): Promise<CompanySnapshot>;
export declare function loadQuotationForBasis(req: Request, id: string, branch: string): Promise<QuotationSnapshot>;
/**
 * The quotation basis of a Work Order that is being created.
 *
 * On top of the branch, lifecycle and approval checks of loadQuotationForBasis,
 * the quotation must not already back a Work Order. Marketing owns the mirrored
 * link, so the same rule Marketing applies when it claims the quotation is
 * checked here: a quotation is "in use" while it has the link flag or the
 * Work Order reference.
 *
 * The mirrored link is cleared when Field Service revokes the Work Order, and
 * that delivery is asynchronous. Until Marketing has accepted the revoke, the
 * quotation is still reported as in use, so a second Work Order for it is
 * rejected instead of being created against a stale mirror.
 */
export declare function loadQuotationForNewWorkOrder(req: Request, id: string, branch: string): Promise<QuotationSnapshot>;
export declare const contractSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    version: z.ZodNumber;
    companyId: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodString;
    effectiveFrom: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    effectiveUntil: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    company: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodString;
    version: z.ZodNumber;
    companyId: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodString;
    effectiveFrom: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    effectiveUntil: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    company: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    version: z.ZodNumber;
    companyId: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodString;
    effectiveFrom: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    effectiveUntil: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    company: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>;
}, z.ZodTypeAny, "passthrough">>, z.objectOutputType<{
    id: z.ZodString;
    version: z.ZodNumber;
    companyId: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodString;
    effectiveFrom: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    effectiveUntil: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    company: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    version: z.ZodNumber;
    companyId: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodString;
    effectiveFrom: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    effectiveUntil: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    company: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>;
}, z.ZodTypeAny, "passthrough">>, {
    isActive: boolean;
    status: string;
    id: string;
    version: number;
    companyId: string;
    effectiveFrom: string;
    effectiveUntil: string;
    contractNumber: string;
    contractDate: string;
    company: {
        name: string;
        officeBranchId: string;
        id: string;
        revoked: boolean;
    } & {
        [k: string]: unknown;
    };
    isDeleted?: boolean | undefined;
}, z.objectInputType<{
    id: z.ZodString;
    version: z.ZodNumber;
    companyId: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodString;
    effectiveFrom: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    effectiveUntil: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodString]>, string, string>;
    company: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        officeBranchId: z.ZodString;
        revoked: z.ZodBoolean;
    }, z.ZodTypeAny, "passthrough">>;
}, z.ZodTypeAny, "passthrough">>;
export type ContractSnapshot = z.infer<typeof contractSchema>;
/**
 * The only contract fields persisted on a Work Order. An explicit projection (not
 * a spread or a pick of known keys) so the upstream price rows, company record and
 * any future Marketing column can never leak into the snapshot column.
 */
export type WorkOrderContractSnapshot = {
    id: string;
    version: number;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
    companyId: string;
    companyName: string;
};
export declare function toContractSnapshot(contract: ContractSnapshot): WorkOrderContractSnapshot;
export declare function loadContract(req: Request, id: string, branch: string): Promise<{
    isActive: boolean;
    status: string;
    id: string;
    version: number;
    companyId: string;
    effectiveFrom: string;
    effectiveUntil: string;
    contractNumber: string;
    contractDate: string;
    company: {
        name: string;
        officeBranchId: string;
        id: string;
        revoked: boolean;
    } & {
        [k: string]: unknown;
    };
    isDeleted?: boolean | undefined;
}>;
/**
 * The catalog identity of one item size, read live from Marketing. Used by the
 * Work Order item snapshot when the document basis carries no quotation line
 * (contract basis), so the stored description is never invented
 * by the client.
 */
declare const itemSizeReferenceSchema: z.ZodObject<{
    itemSizeId: z.ZodString;
    serviceName: z.ZodString;
    inspectionScope: z.ZodString;
    maintenanceScope: z.ZodString;
    itemName: z.ZodString;
    size: z.ZodNullable<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    itemSizeId: z.ZodString;
    serviceName: z.ZodString;
    inspectionScope: z.ZodString;
    maintenanceScope: z.ZodString;
    itemName: z.ZodString;
    size: z.ZodNullable<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    itemSizeId: z.ZodString;
    serviceName: z.ZodString;
    inspectionScope: z.ZodString;
    maintenanceScope: z.ZodString;
    itemName: z.ZodString;
    size: z.ZodNullable<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type ItemSizeReference = z.infer<typeof itemSizeReferenceSchema>;
export declare function loadItemSizeReference(req: Request, id: string): Promise<ItemSizeReference>;
export declare function validateContract(contract: ContractSnapshot): void;
export {};
