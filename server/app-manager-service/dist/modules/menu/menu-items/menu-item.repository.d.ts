import { type AuditActor } from '../../../utils/audit.js';
import { ListMenuItemsInput } from './menu-item.schemas.js';
import { ManagedMenuItem, MenuItemCreate, MenuItemUpdate, PaginatedMenuItems } from './menu-item.types.js';
declare class MenuItemRepository {
    list(input: ListMenuItemsInput): Promise<PaginatedMenuItems>;
    findById(id: string): Promise<ManagedMenuItem | null>;
    findActiveById(id: string): Promise<ManagedMenuItem | null>;
    findByKey(key: string): Promise<ManagedMenuItem | null>;
    create(data: MenuItemCreate, actor: AuditActor): Promise<ManagedMenuItem>;
    update(id: string, data: MenuItemUpdate, actor: AuditActor): Promise<ManagedMenuItem>;
    delete(id: string, actor: AuditActor): Promise<ManagedMenuItem>;
}
export declare const menuItemRepository: MenuItemRepository;
export {};
