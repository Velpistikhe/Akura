import { UserRole, UserSection } from '@prisma/client';
import { type AuditActor } from '../../../utils/audit.js';
import { ListMenuAccessesInput } from './menu-access.schemas.js';
import { ManagedMenuAccess, MenuAccessCreate, MenuAccessUpdate, PaginatedMenuAccesses } from './menu-access.types.js';
declare class MenuAccessRepository {
    list(input: ListMenuAccessesInput): Promise<PaginatedMenuAccesses>;
    findById(id: string): Promise<ManagedMenuAccess | null>;
    findActiveById(id: string): Promise<ManagedMenuAccess | null>;
    findByRule(menuItemId: string, role: UserRole | null, section: UserSection | null, excludeId?: string): Promise<ManagedMenuAccess | null>;
    create(data: MenuAccessCreate, actor: AuditActor): Promise<ManagedMenuAccess>;
    update(id: string, data: MenuAccessUpdate, actor: AuditActor): Promise<ManagedMenuAccess>;
    delete(id: string, actor: AuditActor): Promise<ManagedMenuAccess>;
}
export declare const menuAccessRepository: MenuAccessRepository;
export {};
