import { type AuditActor } from '../../../utils/audit.js';
import { CreateOfficeBranchInput, ListOfficeBranchesInput, UpdateOfficeBranchInput } from './office-branch.schemas.js';
import { ManagedOfficeBranch, OfficeBranchOption, PaginatedOfficeBranches } from './office-branch.types.js';
declare class OfficeBranchRepository {
    listOptions(): Promise<OfficeBranchOption[]>;
    list(input: ListOfficeBranchesInput): Promise<PaginatedOfficeBranches>;
    findById(id: string): Promise<ManagedOfficeBranch | null>;
    create(data: CreateOfficeBranchInput, actor: AuditActor): Promise<ManagedOfficeBranch>;
    update(id: string, data: UpdateOfficeBranchInput, actor: AuditActor): Promise<ManagedOfficeBranch>;
}
export declare const officeBranchRepository: OfficeBranchRepository;
export {};
