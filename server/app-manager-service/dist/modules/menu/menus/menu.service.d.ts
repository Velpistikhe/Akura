import { UserRole, UserSection } from '@prisma/client';
import { Response } from 'express';
import { CreateMenuInput, ListMenusInput, UpdateMenuInput } from './menu.schemas.js';
import { ManagedMenu, MenusForUserResult, PaginatedMenus } from './menu.types.js';
declare class MenuService {
    list(input: ListMenusInput): Promise<PaginatedMenus>;
    get(id: string): Promise<ManagedMenu>;
    create(data: CreateMenuInput, res: Response): Promise<ManagedMenu>;
    update(id: string, data: UpdateMenuInput, res: Response): Promise<ManagedMenu>;
    delete(id: string, res: Response): Promise<ManagedMenu>;
    getMenusForUser(role: UserRole, section: UserSection | null): Promise<MenusForUserResult>;
}
export declare const menuService: MenuService;
export {};
