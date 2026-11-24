import { Prisma, User, UserRole, UserSection } from '@prisma/client';
import { ListUsersInput } from './user-management.schemas.js';
declare const select: {
    id: true;
    username: true;
    firstName: true;
    lastName: true;
    email: true;
    telp: true;
    role: true;
    section: true;
    officeBranchId: true;
    officeBranchName: true;
    isActive: true;
    version: true;
    createdAt: true;
    updatedAt: true;
};
export type ManagedUser = Prisma.UserGetPayload<{
    select: typeof select;
}>;
/**
 * The projection returned to a caller that is not an app manager.
 *
 * It exposes the contact details and the assignment of a user, but not the
 * account metadata: the username, the branch id, the version, and the
 * activation state are all omitted.
 */
declare const summarySelect: {
    id: true;
    firstName: true;
    lastName: true;
    email: true;
    telp: true;
    role: true;
    section: true;
    officeBranchName: true;
};
export type ManagedUserSummary = Prisma.UserGetPayload<{
    select: typeof summarySelect;
}>;
/**
 * The visibility scope of a list request.
 *
 * An app manager sees every user of every branch, including the deactivated
 * ones. Any other caller sees only the active users of their own branch, and
 * only the summary projection.
 */
export interface UserListScope {
    isAppManager: boolean;
    officeBranchId: string | null;
}
export declare const userManagementRepository: {
    list(input: ListUsersInput, scope: UserListScope): Promise<{
        users: {
            firstName: string;
            lastName: string;
            email: string | null;
            telp: string | null;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
            section: import(".prisma/client").$Enums.UserSection | null;
            officeBranchName: string | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findById: (userId: string) => Prisma.Prisma__UserClient<{
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
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    lockById(tx: Prisma.TransactionClient, userId: string): Promise<User | null>;
    lockInvariant: (tx: Prisma.TransactionClient) => Prisma.PrismaPromise<number>;
    countActiveAppManagers: (tx: Prisma.TransactionClient) => Prisma.PrismaPromise<number>;
    update(tx: Prisma.TransactionClient, userId: string, version: number, data: {
        role?: UserRole;
        section?: UserSection | null;
        officeBranchId?: string | null;
        officeBranchName?: string | null;
        email?: string | null;
        telp?: string | null;
        isActive?: boolean;
    }): Promise<ManagedUser>;
    revokeRefreshTokens: (tx: Prisma.TransactionClient, userId: string) => Prisma.PrismaPromise<Prisma.BatchPayload>;
};
export {};
