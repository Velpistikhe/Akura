import { Prisma, PrismaClient, RefreshToken, User, UserPassword } from '@prisma/client';
type TxClient = Prisma.TransactionClient | PrismaClient;
declare class AuthRepository {
    createUser(client: TxClient, username: string, passwordHash: string, firstName: string, lastName: string, email?: string | null, telp?: string | null): Promise<User>;
    findUserByUsername(username: string): Promise<(User & {
        password: UserPassword | null;
    }) | null>;
    findUserById(client: TxClient, id: string): Promise<User | null>;
    findUserByIdForUpdate(client: TxClient, id: string): Promise<User | null>;
    findPasswordByUserIdForUpdate(client: TxClient, userId: string): Promise<UserPassword | null>;
    updateProfileAtomic(client: TxClient, userId: string, firstName: string, lastName: string, expectedVersion: number, email?: string | null, telp?: string | null): Promise<User>;
    updatePasswordAtomic(client: TxClient, userId: string, passwordHash: string, expectedVersion: number): Promise<UserPassword>;
    saveRefreshToken(client: TxClient, userId: string, token: string, expiresAt: Date, familyId: string, lastActivityAt?: Date): Promise<RefreshToken>;
    findRefreshTokenForUpdate(client: TxClient, token: string): Promise<RefreshToken | null>;
    revokeRefreshToken(client: TxClient, token: string, lastActivityAt?: Date): Promise<boolean>;
    revokeTokenFamily(client: TxClient, familyId: string): Promise<number>;
    revokeAllUserRefreshTokens(client: TxClient, userId: string): Promise<number>;
}
export declare const authRepository: AuthRepository;
export {};
