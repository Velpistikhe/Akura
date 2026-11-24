import { Response } from 'express';
import { CreateMenuItemInput, ListMenuItemsInput, UpdateMenuItemInput } from './menu-item.schemas.js';
import { ManagedMenuItem, PaginatedMenuItems } from './menu-item.types.js';
declare class MenuItemService {
    list(input: ListMenuItemsInput): Promise<PaginatedMenuItems>;
    get(id: string): Promise<ManagedMenuItem>;
    create(data: CreateMenuItemInput, res: Response): Promise<ManagedMenuItem>;
    update(id: string, data: UpdateMenuItemInput, res: Response): Promise<ManagedMenuItem>;
    delete(id: string, res: Response): Promise<ManagedMenuItem>;
}
export declare const menuItemService: MenuItemService;
export {};
