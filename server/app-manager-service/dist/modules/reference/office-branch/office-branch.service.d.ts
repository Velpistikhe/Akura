import { Response } from 'express';
import { CreateOfficeBranchInput, ListOfficeBranchesInput, UpdateOfficeBranchInput } from './office-branch.schemas.js';
import { ManagedOfficeBranch, OfficeBranchOption, PaginatedOfficeBranches } from './office-branch.types.js';
declare class OfficeBranchService {
    listOptions(): Promise<OfficeBranchOption[]>;
    list(input: ListOfficeBranchesInput): Promise<PaginatedOfficeBranches>;
    get(id: string): Promise<ManagedOfficeBranch>;
    create(data: CreateOfficeBranchInput, res: Response): Promise<ManagedOfficeBranch>;
    update(id: string, data: UpdateOfficeBranchInput, res: Response): Promise<ManagedOfficeBranch>;
}
export declare const officeBranchService: OfficeBranchService;
export {};
