import { Prisma, PrismaClient } from '@prisma/client';
import { Request } from 'express';
export type UserAuditActor = {
    id: string;
    name: string;
};
/** The modules that write to the security audit trail. */
export type SecurityAuditModule = 'auth' | 'user-management';
/**
 * The security events that are recorded.
 *
 * The user profile changes live in `UserHistory`. These are the events of the
 * other modules that describe who did what, and when.
 */
export type SecurityEventType = 'REGISTER' | 'LOGIN' | 'LOGIN_FAILED' | 'TOKEN_REFRESH' | 'TOKEN_REFRESH_REJECTED' | 'LOGOUT' | 'PROMOTE' | 'DEACTIVATE' | 'REACTIVATE';
/** Whether the event describes a success or a refusal. */
export type SecurityOutcome = 'SUCCESS' | 'FAILURE';
/** The request context that is recorded next to the event. */
export interface SecurityAuditContext {
    ipAddress?: string | null;
    userAgent?: string | null;
}
/**
 * The request context that is recorded next to a security event.
 *
 * The address identifies the client that made the request, and the user agent
 * describes the client software. Both are taken from the request, so they
 * cannot be forged by the request body.
 */
export declare const getAuditContext: (req: Request) => SecurityAuditContext;
/**
 * Records one security audit entry.
 *
 * The write runs in the same transaction as the change it describes whenever
 * one exists, so the audit trail and the data cannot disagree. A failed login
 * has no data change to commit, so it is written on its own.
 */
export declare const saveSecurityAudit: (tx: Prisma.TransactionClient | PrismaClient, input: {
    module: SecurityAuditModule;
    eventType: SecurityEventType;
    action: string;
    outcome: SecurityOutcome;
    userId?: string | null;
    username?: string | null;
    officeBranchId?: string | null;
    context?: SecurityAuditContext;
    detail?: unknown;
}) => Promise<void>;
interface UserSnapshotSource {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string | null;
    telp: string | null;
    role: string;
    section: string | null;
    officeBranchId: string | null;
    officeBranchName?: string | null;
    branch?: string | null;
    isActive: boolean;
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const userSnapshot: (user: UserSnapshotSource) => Record<string, unknown>;
export declare function saveUserHistory(tx: Prisma.TransactionClient | PrismaClient, user: UserSnapshotSource, before: UserSnapshotSource | null, actor: UserAuditActor, action: 'CREATE' | 'UPDATE' | 'PASSWORD_CHANGE'): Promise<void>;
export {};
