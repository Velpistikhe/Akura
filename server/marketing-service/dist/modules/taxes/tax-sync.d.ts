import { Prisma } from '@prisma/client';
export declare function applicableTax(tx: Prisma.TransactionClient, officeBranchId: string, at: Date): Promise<{
    officeBranchId: string;
    effectiveFrom: Date;
    effectiveUntil: Date | null;
    id: string;
    percentage: Prisma.Decimal;
    sourceUpdatedAt: Date;
}>;
