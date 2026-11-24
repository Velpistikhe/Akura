import { Prisma } from '@prisma/client';
/**
 * The identity of the actor that performed a change.
 *
 * The name is stored next to the id, so the audit trail still names the person
 * when the user record has been removed or renamed since.
 */
export interface AuditActor {
    id: string;
    name: string;
}
/**
 * The actor for a change that no user performed.
 *
 * Events that are replicated from another service (a tax snapshot, a user
 * profile sync) have no user behind them. A fixed sentinel UUID keeps the
 * `createdById` column valid while the name still identifies the service.
 */
export declare const SYSTEM_ACTOR: AuditActor;
/** The actor for a change performed by a named service. */
export declare const serviceActor: (name: string) => AuditActor;
/**
 * The modules that write to the audit trail.
 */
export type AuditModule = 'companies' | 'company-staff' | 'contract-prices' | 'contracts' | 'items' | 'quotations' | 'services' | 'taxes';
/** The entities that write to the audit trail. */
export type AuditEntity = 'COMPANY' | 'COMPANY_STAFF' | 'QUOTATION' | 'TAX';
/** The action that produced an audit entry. */
export type AuditAction = string;
/**
 * Records one audit entry.
 *
 * The write must run inside the same transaction as the change it describes,
 * so the audit trail and the data can never disagree: either both are
 * committed, or neither is.
 *
 * The version makes the entry unique per entity state, so a retried write
 * cannot produce a second entry for the same state.
 */
export declare const recordAudit: (tx: Prisma.TransactionClient, input: {
    module: AuditModule;
    entityType: AuditEntity;
    entityId: string;
    version: number | bigint;
    action: AuditAction;
    before: unknown;
    after: unknown;
    officeBranchId?: string | null;
    actor: AuditActor;
}) => Promise<void>;
