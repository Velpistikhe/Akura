import { ListAuditTrailInput } from './audit-trail.schemas.js';
export interface AuditTrailEntry {
    id: string;
    module: string;
    entityType: string;
    entityId: string;
    /**
     * The version of the entity state this entry describes.
     *
     * It is a string, because the database holds a BigInt and JSON has no
     * BigInt.
     */
    version: string;
    action: string;
    before: unknown;
    after: unknown;
    officeBranchId: string | null;
    createdById: string;
    createdByName: string;
    createdAt: Date;
}
export interface PaginatedAuditTrail {
    entries: AuditTrailEntry[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
declare class AuditTrailRepository {
    /**
     * The version is a BigInt in the database, because it holds both a plain
     * counter and a timestamp in milliseconds. JSON has no BigInt, so it is
     * serialised as a string.
     */
    private static toEntry;
    list(input: ListAuditTrailInput): Promise<PaginatedAuditTrail>;
    /** The trail of one entity, newest first. */
    listForEntity(entityId: string): Promise<AuditTrailEntry[]>;
}
export declare const auditTrailRepository: AuditTrailRepository;
export {};
