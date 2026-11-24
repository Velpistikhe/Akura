import { UserRole, UserSection } from '@prisma/client';
import { type AuditActor } from '../../../utils/audit.js';
import { ListMenusInput } from './menu.schemas.js';
import { ManagedMenu, MenuUpdate, MenusForUserResult, PaginatedMenus } from './menu.types.js';
declare class MenuRepository {
    list(input: ListMenusInput): Promise<PaginatedMenus>;
    findById(id: string): Promise<ManagedMenu | null>;
    findActiveById(id: string): Promise<ManagedMenu | null>;
    findByKey(key: string): Promise<ManagedMenu | null>;
    create(data: {
        key: string;
        label: string;
        hasItem: boolean;
        order: number;
        items?: {
            key: string;
            label: string;
            order: number;
        }[];
    }, actor: AuditActor): Promise<ManagedMenu>;
    update(id: string, data: MenuUpdate, actor: AuditActor): Promise<ManagedMenu>;
    delete(id: string, actor: AuditActor): Promise<ManagedMenu>;
    findMenusForUser(role: UserRole, section: UserSection | null): Promise<MenusForUserResult>;
}
export declare const menuRepository: MenuRepository;
export {};
