import { Prisma } from '@prisma/client';
import { AuditActor } from '../types/auth.types.js';
export type CatalogEntity = 'SERVICE' | 'SERVICE_SCOPE' | 'MAINTENANCE_SCOPE' | 'ITEM' | 'ITEM_SIZE' | 'ITEM_PRICE' | 'COMPANY_CONTRACT_PRICE' | 'COMPANY_CONTRACT';
export declare const requireCatalogVersion: (row: {
    version: number;
    isActive?: boolean;
}, version: number, allowInactive?: boolean) => void;
export declare const recordCatalogAudit: (tx: Prisma.TransactionClient, officeBranchId: string, entityType: CatalogEntity, before: unknown, after: {
    id: string;
    version: number;
}, actor: AuditActor, action: string) => Prisma.Prisma__CatalogAuditLogClient<{
    officeBranchId: string;
    version: number;
    id: string;
    createdAt: Date;
    createdById: string;
    createdByName: string;
    action: string;
    entityType: string;
    entityId: string;
    before: Prisma.JsonValue | null;
    after: Prisma.JsonValue;
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
/**
 * Records a catalogue change in both audit tables.
 *
 * The catalogue table is the module's own trail, and the generic table is the
 * platform-wide trail that every module writes to. Both are written in the
 * same transaction, so they can never disagree.
 */
export declare const recordCatalogAuditWithPlatform: (tx: Prisma.TransactionClient, officeBranchId: string, entityType: CatalogEntity, before: unknown, after: {
    id: string;
    version: number;
}, actor: AuditActor, action: string) => Promise<void>;
