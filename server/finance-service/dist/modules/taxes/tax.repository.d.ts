import { Prisma } from '@prisma/client';
import { type AuditActor } from '../../utils/audit.js';
export declare const taxRepository: {
    create(input: unknown, officeBranchId: string, actor: AuditActor): Promise<{
        officeBranchId: string;
        id: string;
        createdById: string;
        createdByName: string;
        createdAt: Date;
        percentage: Prisma.Decimal;
        effectiveFrom: Date;
        effectiveUntil: Date | null;
        updatedById: string | null;
        updatedByName: string | null;
        updatedAt: Date;
    }>;
    createWithEvent(input: unknown, officeBranchId: string, actor: AuditActor): Promise<{
        tax: {
            officeBranchId: string;
            id: string;
            createdById: string;
            createdByName: string;
            createdAt: Date;
            percentage: Prisma.Decimal;
            effectiveFrom: Date;
            effectiveUntil: Date | null;
            updatedById: string | null;
            updatedByName: string | null;
            updatedAt: Date;
        };
        event: {
            officeBranchId: string;
            payload: Prisma.JsonValue;
            id: string;
            version: number;
            createdAt: Date;
        };
    }>;
};
export declare function enqueueTaxSnapshot(tx: Prisma.TransactionClient, officeBranchId: string): Promise<{
    officeBranchId: string;
    payload: Prisma.JsonValue;
    id: string;
    version: number;
    createdAt: Date;
}>;
export declare function applicableTax(tx: Prisma.TransactionClient, officeBranchId: string, day: Date): Promise<{
    officeBranchId: string;
    id: string;
    createdById: string;
    createdByName: string;
    createdAt: Date;
    percentage: Prisma.Decimal;
    effectiveFrom: Date;
    effectiveUntil: Date | null;
    updatedById: string | null;
    updatedByName: string | null;
    updatedAt: Date;
}>;
