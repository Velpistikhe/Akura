import { Prisma } from '@prisma/client';
import { AuditActor } from '../types/auth.types.js';
export declare const lockCompanyBranch: (tx: Prisma.TransactionClient, branch: string) => Promise<void>;
export declare const requireCurrentVersion: (row: {
    version: number;
    revoked: boolean;
}, version: number) => void;
export declare const saveCompanyStaffHistory: (tx: Prisma.TransactionClient, companyStaffId: string, actor: AuditActor, action: "CREATE" | "UPDATE" | "DEACTIVATE") => Promise<void>;
