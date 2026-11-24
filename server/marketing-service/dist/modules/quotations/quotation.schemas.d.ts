import { z } from 'zod';
export declare const quotationIdSchema: z.ZodObject<{
    quotationId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    quotationId: string;
}, {
    quotationId: string;
}>;
export declare const listQuotationsSchema: z.ZodEffects<z.ZodObject<{
    isActive: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    dateFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    dateTo: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    no: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodNativeEnum<{
        CREATED: "CREATED";
        SUBMITTED: "SUBMITTED";
        REJECTED: "REJECTED";
        APPROVED: "APPROVED";
        REVISED: "REVISED";
        CONFIRMED: "CONFIRMED";
        ON_PROGRESS: "ON_PROGRESS";
        WORK_ORDER_COMPLETE: "WORK_ORDER_COMPLETE";
        COMPLETE: "COMPLETE";
    }>>;
    company: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    status?: "SUBMITTED" | "REJECTED" | "APPROVED" | "REVISED" | "CREATED" | "CONFIRMED" | "ON_PROGRESS" | "WORK_ORDER_COMPLETE" | "COMPLETE" | undefined;
    isActive?: boolean | undefined;
    company?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
    no?: number | undefined;
}, {
    status?: "SUBMITTED" | "REJECTED" | "APPROVED" | "REVISED" | "CREATED" | "CONFIRMED" | "ON_PROGRESS" | "WORK_ORDER_COMPLETE" | "COMPLETE" | undefined;
    isActive?: "true" | "false" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    company?: string | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    no?: number | undefined;
}>, {
    page: number;
    limit: number;
    status?: "SUBMITTED" | "REJECTED" | "APPROVED" | "REVISED" | "CREATED" | "CONFIRMED" | "ON_PROGRESS" | "WORK_ORDER_COMPLETE" | "COMPLETE" | undefined;
    isActive?: boolean | undefined;
    company?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
    no?: number | undefined;
}, {
    status?: "SUBMITTED" | "REJECTED" | "APPROVED" | "REVISED" | "CREATED" | "CONFIRMED" | "ON_PROGRESS" | "WORK_ORDER_COMPLETE" | "COMPLETE" | undefined;
    isActive?: "true" | "false" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    company?: string | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    no?: number | undefined;
}>;
export type ListQuotationsInput = z.infer<typeof listQuotationsSchema>;
declare const item: z.ZodEffects<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    itemSizeId: z.ZodString;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    quantityInspection: z.ZodUnion<[z.ZodString, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodString>]>;
    quantityMaintenance: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodString>]>>;
    discount: z.ZodDefault<z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodEffects<z.ZodString, string, string>>]>>;
}, "strict", z.ZodTypeAny, {
    itemSizeId: string;
    quantityInspection: string;
    quantityMaintenance: string;
    discount: string;
    id?: string | undefined;
    note?: string | null | undefined;
}, {
    itemSizeId: string;
    quantityInspection: string | number;
    id?: string | undefined;
    note?: string | null | undefined;
    quantityMaintenance?: string | number | undefined;
    discount?: string | number | undefined;
}>, {
    itemSizeId: string;
    quantityInspection: string;
    quantityMaintenance: string;
    discount: string;
    id?: string | undefined;
    note?: string | null | undefined;
}, {
    itemSizeId: string;
    quantityInspection: string | number;
    id?: string | undefined;
    note?: string | null | undefined;
    quantityMaintenance?: string | number | undefined;
    discount?: string | number | undefined;
}>;
export declare const createQuotationSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    date: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, Date, string>>>;
    jobStart: z.ZodString;
    inquiryMethod: z.ZodNativeEnum<{
        EMAIL: "EMAIL";
        WHATSAPP: "WHATSAPP";
        VERBAL: "VERBAL";
        JOB_ORDER_REQUEST: "JOB_ORDER_REQUEST";
    }>;
    inquiryDate: z.ZodEffects<z.ZodString, Date, string>;
    subject: z.ZodString;
    termOfPayment: z.ZodString;
    validity: z.ZodString;
    supplyAkura: z.ZodString;
    supplyCustomer: z.ZodString;
    location: z.ZodString;
    accomplished: z.ZodString;
    deliveryReports: z.ZodString;
    deliveryInvoice: z.ZodString;
    companyId: z.ZodOptional<z.ZodString>;
    staffId: z.ZodString;
    items: z.ZodEffects<z.ZodEffects<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        itemSizeId: z.ZodString;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        quantityInspection: z.ZodUnion<[z.ZodString, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodString>]>;
        quantityMaintenance: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodString>]>>;
        discount: z.ZodDefault<z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodEffects<z.ZodString, string, string>>]>>;
    }, "strict", z.ZodTypeAny, {
        itemSizeId: string;
        quantityInspection: string;
        quantityMaintenance: string;
        discount: string;
        id?: string | undefined;
        note?: string | null | undefined;
    }, {
        itemSizeId: string;
        quantityInspection: string | number;
        id?: string | undefined;
        note?: string | null | undefined;
        quantityMaintenance?: string | number | undefined;
        discount?: string | number | undefined;
    }>, {
        itemSizeId: string;
        quantityInspection: string;
        quantityMaintenance: string;
        discount: string;
        id?: string | undefined;
        note?: string | null | undefined;
    }, {
        itemSizeId: string;
        quantityInspection: string | number;
        id?: string | undefined;
        note?: string | null | undefined;
        quantityMaintenance?: string | number | undefined;
        discount?: string | number | undefined;
    }>, "many">, {
        itemSizeId: string;
        quantityInspection: string;
        quantityMaintenance: string;
        discount: string;
        id?: string | undefined;
        note?: string | null | undefined;
    }[], {
        itemSizeId: string;
        quantityInspection: string | number;
        id?: string | undefined;
        note?: string | null | undefined;
        quantityMaintenance?: string | number | undefined;
        discount?: string | number | undefined;
    }[]>, {
        itemSizeId: string;
        quantityInspection: string;
        quantityMaintenance: string;
        discount: string;
        id?: string | undefined;
        note?: string | null | undefined;
    }[], {
        itemSizeId: string;
        quantityInspection: string | number;
        id?: string | undefined;
        note?: string | null | undefined;
        quantityMaintenance?: string | number | undefined;
        discount?: string | number | undefined;
    }[]>;
}, "strict", z.ZodTypeAny, {
    items: {
        itemSizeId: string;
        quantityInspection: string;
        quantityMaintenance: string;
        discount: string;
        id?: string | undefined;
        note?: string | null | undefined;
    }[];
    jobStart: string;
    inquiryMethod: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST";
    inquiryDate: Date;
    subject: string;
    termOfPayment: string;
    validity: string;
    supplyAkura: string;
    supplyCustomer: string;
    location: string;
    accomplished: string;
    deliveryReports: string;
    deliveryInvoice: string;
    staffId: string;
    date?: Date | null | undefined;
    companyId?: string | undefined;
}, {
    items: {
        itemSizeId: string;
        quantityInspection: string | number;
        id?: string | undefined;
        note?: string | null | undefined;
        quantityMaintenance?: string | number | undefined;
        discount?: string | number | undefined;
    }[];
    jobStart: string;
    inquiryMethod: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST";
    inquiryDate: string;
    subject: string;
    termOfPayment: string;
    validity: string;
    supplyAkura: string;
    supplyCustomer: string;
    location: string;
    accomplished: string;
    deliveryReports: string;
    deliveryInvoice: string;
    staffId: string;
    date?: string | null | undefined;
    companyId?: string | undefined;
}>, {
    items: {
        itemSizeId: string;
        quantityInspection: string;
        quantityMaintenance: string;
        discount: string;
        id?: string | undefined;
        note?: string | null | undefined;
    }[];
    jobStart: string;
    inquiryMethod: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST";
    inquiryDate: Date;
    subject: string;
    termOfPayment: string;
    validity: string;
    supplyAkura: string;
    supplyCustomer: string;
    location: string;
    accomplished: string;
    deliveryReports: string;
    deliveryInvoice: string;
    staffId: string;
    date?: Date | null | undefined;
    companyId?: string | undefined;
}, {
    items: {
        itemSizeId: string;
        quantityInspection: string | number;
        id?: string | undefined;
        note?: string | null | undefined;
        quantityMaintenance?: string | number | undefined;
        discount?: string | number | undefined;
    }[];
    jobStart: string;
    inquiryMethod: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST";
    inquiryDate: string;
    subject: string;
    termOfPayment: string;
    validity: string;
    supplyAkura: string;
    supplyCustomer: string;
    location: string;
    accomplished: string;
    deliveryReports: string;
    deliveryInvoice: string;
    staffId: string;
    date?: string | null | undefined;
    companyId?: string | undefined;
}>, {
    items: {
        itemSizeId: string;
        quantityInspection: string;
        quantityMaintenance: string;
        discount: string;
        id?: string | undefined;
        note?: string | null | undefined;
    }[];
    jobStart: string;
    inquiryMethod: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST";
    inquiryDate: Date;
    subject: string;
    termOfPayment: string;
    validity: string;
    supplyAkura: string;
    supplyCustomer: string;
    location: string;
    accomplished: string;
    deliveryReports: string;
    deliveryInvoice: string;
    staffId: string;
    date?: Date | null | undefined;
    companyId?: string | undefined;
}, {
    items: {
        itemSizeId: string;
        quantityInspection: string | number;
        id?: string | undefined;
        note?: string | null | undefined;
        quantityMaintenance?: string | number | undefined;
        discount?: string | number | undefined;
    }[];
    jobStart: string;
    inquiryMethod: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST";
    inquiryDate: string;
    subject: string;
    termOfPayment: string;
    validity: string;
    supplyAkura: string;
    supplyCustomer: string;
    location: string;
    accomplished: string;
    deliveryReports: string;
    deliveryInvoice: string;
    staffId: string;
    date?: string | null | undefined;
    companyId?: string | undefined;
}>;
export declare const deactivateQuotationSchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const approveQuotationSchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const submitQuotationSchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const rejectQuotationSchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const reviseQuotationSchema: z.ZodObject<{
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
}, {
    version: number;
}>;
export declare const quotationHistoryQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    action: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["version", "createdAt", "action"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "version" | "createdAt" | "action";
    sortOrder: "asc" | "desc";
    action?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "version" | "createdAt" | "action" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    action?: string | undefined;
}>;
export declare const updateQuotationSchema: z.ZodEffects<z.ZodObject<{
    jobStart: z.ZodOptional<z.ZodString>;
    inquiryMethod: z.ZodOptional<z.ZodNativeEnum<{
        EMAIL: "EMAIL";
        WHATSAPP: "WHATSAPP";
        VERBAL: "VERBAL";
        JOB_ORDER_REQUEST: "JOB_ORDER_REQUEST";
    }>>;
    inquiryDate: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    subject: z.ZodOptional<z.ZodString>;
    termOfPayment: z.ZodOptional<z.ZodString>;
    validity: z.ZodOptional<z.ZodString>;
    supplyAkura: z.ZodOptional<z.ZodString>;
    supplyCustomer: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    accomplished: z.ZodOptional<z.ZodString>;
    deliveryReports: z.ZodOptional<z.ZodString>;
    deliveryInvoice: z.ZodOptional<z.ZodString>;
    staffId: z.ZodOptional<z.ZodString>;
    version: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    version: number;
    jobStart?: string | undefined;
    inquiryMethod?: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST" | undefined;
    inquiryDate?: Date | undefined;
    subject?: string | undefined;
    termOfPayment?: string | undefined;
    validity?: string | undefined;
    supplyAkura?: string | undefined;
    supplyCustomer?: string | undefined;
    location?: string | undefined;
    accomplished?: string | undefined;
    deliveryReports?: string | undefined;
    deliveryInvoice?: string | undefined;
    staffId?: string | undefined;
}, {
    version: number;
    jobStart?: string | undefined;
    inquiryMethod?: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST" | undefined;
    inquiryDate?: string | undefined;
    subject?: string | undefined;
    termOfPayment?: string | undefined;
    validity?: string | undefined;
    supplyAkura?: string | undefined;
    supplyCustomer?: string | undefined;
    location?: string | undefined;
    accomplished?: string | undefined;
    deliveryReports?: string | undefined;
    deliveryInvoice?: string | undefined;
    staffId?: string | undefined;
}>, {
    version: number;
    jobStart?: string | undefined;
    inquiryMethod?: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST" | undefined;
    inquiryDate?: Date | undefined;
    subject?: string | undefined;
    termOfPayment?: string | undefined;
    validity?: string | undefined;
    supplyAkura?: string | undefined;
    supplyCustomer?: string | undefined;
    location?: string | undefined;
    accomplished?: string | undefined;
    deliveryReports?: string | undefined;
    deliveryInvoice?: string | undefined;
    staffId?: string | undefined;
}, {
    version: number;
    jobStart?: string | undefined;
    inquiryMethod?: "EMAIL" | "WHATSAPP" | "VERBAL" | "JOB_ORDER_REQUEST" | undefined;
    inquiryDate?: string | undefined;
    subject?: string | undefined;
    termOfPayment?: string | undefined;
    validity?: string | undefined;
    supplyAkura?: string | undefined;
    supplyCustomer?: string | undefined;
    location?: string | undefined;
    accomplished?: string | undefined;
    deliveryReports?: string | undefined;
    deliveryInvoice?: string | undefined;
    staffId?: string | undefined;
}>;
export declare const addQuotationItemSchema: z.ZodObject<{
    version: z.ZodNumber;
    itemSizeId: z.ZodString;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    quantityInspection: z.ZodUnion<[z.ZodString, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodString>]>;
    quantityMaintenance: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodString>]>>;
    discount: z.ZodDefault<z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodPipeline<z.ZodEffects<z.ZodNumber, string, number>, z.ZodEffects<z.ZodString, string, string>>]>>;
}, "strict", z.ZodTypeAny, {
    version: number;
    itemSizeId: string;
    quantityInspection: string;
    quantityMaintenance: string;
    discount: string;
    note?: string | null | undefined;
}, {
    version: number;
    itemSizeId: string;
    quantityInspection: string | number;
    note?: string | null | undefined;
    quantityMaintenance?: string | number | undefined;
    discount?: string | number | undefined;
}>;
export declare const deleteQuotationItemSchema: z.ZodObject<{
    quotationVersion: z.ZodNumber;
    itemVersion: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    itemVersion: number;
    quotationVersion: number;
}, {
    itemVersion: number;
    quotationVersion: number;
}>;
export type QuotationItemInput = z.infer<typeof item>;
export type UpdateQuotationInput = z.infer<typeof updateQuotationSchema>;
export {};
