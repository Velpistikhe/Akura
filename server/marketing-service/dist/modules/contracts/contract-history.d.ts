import { Prisma } from '@prisma/client';
import { AuditActor } from '../../types/auth.types.js';
export declare const recordContractHistory: (tx: Prisma.TransactionClient, before: Record<string, unknown> | null, after: Record<string, unknown> & {
    id: string;
    version: number;
}, actor: AuditActor, action: string) => Prisma.Prisma__CompanyContractHistoryClient<{
    version: number;
    id: string;
    createdAt: Date;
    createdById: string;
    createdByName: string;
    action: string;
    snapshot: Prisma.JsonValue;
    companyContractId: string;
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
