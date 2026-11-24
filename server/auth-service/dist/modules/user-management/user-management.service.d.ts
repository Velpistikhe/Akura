import { UserAuditActor } from '../../utils/userHistory.js';
import { ListUsersInput, UpdateUserInput } from './user-management.schemas.js';
import { UserListScope } from './user-management.repository.js';
export declare const userManagementService: {
    list: (input: ListUsersInput, scope: UserListScope) => Promise<{
        users: (Omit<{
            firstName: string;
            lastName: string;
            email: string | null;
            telp: string | null;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
            section: import(".prisma/client").$Enums.UserSection | null;
            officeBranchName: string | null;
        }, "officeBranchName"> & {
            branch: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    get(userId: string): Promise<Omit<{
        username: string;
        firstName: string;
        lastName: string;
        email: string | null;
        telp: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        officeBranchId: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        section: import(".prisma/client").$Enums.UserSection | null;
        isActive: boolean;
        officeBranchName: string | null;
    }, "officeBranchName"> & {
        branch: string | null;
    }>;
    update(actor: UserAuditActor, userId: string, data: UpdateUserInput): Promise<(Omit<{
        username: string;
        firstName: string;
        lastName: string;
        email: string | null;
        telp: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        officeBranchId: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        section: import(".prisma/client").$Enums.UserSection | null;
        isActive: boolean;
        officeBranchName: string | null;
    }, "officeBranchName"> & {
        branch: string | null;
    }) | null>;
};
