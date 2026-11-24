import { z } from 'zod';
export declare const contractStatusSchema: z.ZodEnum<["DRAFT", "SUBMITTED", "REJECTED", "APPROVED", "TERMINATED", "REVISED"]>;
export declare const createContractSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    effectiveFrom: z.ZodEffects<z.ZodString, Date, string>;
    effectiveUntil: z.ZodEffects<z.ZodString, Date, string>;
    companyId: z.ZodString;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodString, Date, string>;
}, "strict", z.ZodTypeAny, {
    companyId: string;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    companyId: string;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>, {
    companyId: string;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    companyId: string;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>, {
    companyId: string;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    companyId: string;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>;
export declare const updateContractSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    version: z.ZodNumber;
} & {
    effectiveFrom: z.ZodEffects<z.ZodString, Date, string>;
    effectiveUntil: z.ZodEffects<z.ZodString, Date, string>;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodString, Date, string>;
}, "strict", z.ZodTypeAny, {
    version: number;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    version: number;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>, {
    version: number;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    version: number;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>, {
    version: number;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    version: number;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>;
export declare const reviseContractSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    version: z.ZodNumber;
} & {
    effectiveFrom: z.ZodEffects<z.ZodString, Date, string>;
    effectiveUntil: z.ZodEffects<z.ZodString, Date, string>;
    contractNumber: z.ZodString;
    contractDate: z.ZodEffects<z.ZodString, Date, string>;
}, "strict", z.ZodTypeAny, {
    version: number;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    version: number;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>, {
    version: number;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    version: number;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>, {
    version: number;
    contractNumber: string;
    contractDate: Date;
    effectiveFrom: Date;
    effectiveUntil: Date;
}, {
    version: number;
    contractNumber: string;
    contractDate: string;
    effectiveFrom: string;
    effectiveUntil: string;
}>;
export declare const terminateContractSchema: z.ZodObject<{
    version: z.ZodNumber;
} & {
    terminatedAt: z.ZodEffects<z.ZodString, Date, string>;
}, "strict", z.ZodTypeAny, {
    version: number;
    terminatedAt: Date;
}, {
    version: number;
    terminatedAt: string;
}>;
export declare const contractIdSchema: z.ZodObject<{
    contractId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    contractId: string;
}, {
    contractId: string;
}>;
export declare const listContractsSchema: z.ZodObject<{
    companyId: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SUBMITTED", "REJECTED", "APPROVED", "TERMINATED", "REVISED"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    status?: "DRAFT" | "SUBMITTED" | "REJECTED" | "APPROVED" | "TERMINATED" | "REVISED" | undefined;
    companyId?: string | undefined;
}, {
    status?: "DRAFT" | "SUBMITTED" | "REJECTED" | "APPROVED" | "TERMINATED" | "REVISED" | undefined;
    companyId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const contractHistoryQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type ContractPeriod = z.infer<typeof updateContractSchema>;
export type CreateContractInput = z.infer<typeof createContractSchema>;
export type ListContractsInput = z.infer<typeof listContractsSchema>;
export type ContractHistoryQueryInput = z.infer<typeof contractHistoryQuerySchema>;
