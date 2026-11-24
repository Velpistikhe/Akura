import { Response } from 'express';
import { CreateMenuAccessInput, ListMenuAccessesInput, UpdateMenuAccessInput } from './menu-access.schemas.js';
import { ManagedMenuAccess, PaginatedMenuAccesses } from './menu-access.types.js';
declare class MenuAccessService {
    list(input: ListMenuAccessesInput): Promise<PaginatedMenuAccesses>;
    get(id: string): Promise<ManagedMenuAccess>;
    create(data: CreateMenuAccessInput, res: Response): Promise<ManagedMenuAccess>;
    update(id: string, data: UpdateMenuAccessInput, res: Response): Promise<ManagedMenuAccess>;
    delete(id: string, res: Response): Promise<ManagedMenuAccess>;
}
export declare const menuAccessService: MenuAccessService;
export {};
