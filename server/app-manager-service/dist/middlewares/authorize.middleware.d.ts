import { NextFunction, Request, Response } from 'express';
import { UserRole, UserSection } from '@prisma/client';
export interface AuthUser {
    id: string;
    role: UserRole;
    section: UserSection | null;
    officeBranchId?: string | null;
    firstName?: string;
    lastName?: string;
    username?: string;
}
declare global {
    namespace Express {
        interface Locals {
            authUser?: AuthUser;
        }
    }
}
/** Hanya user dengan role app_manager */
export declare const requireAppManager: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/** Semua role aktif - hanya memvalidasi identitas dari gateway */
export declare const requireAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<void>;
