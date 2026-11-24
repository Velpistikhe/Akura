import { Response } from 'express';
import { AuditActor } from '../types/auth.types.js';
export declare const getOfficeBranchId: (res: Response) => string;
export declare const getAuditActor: (res: Response) => AuditActor;
export declare const restrictListVisibility: <T extends object>(res: Response, query: T) => T & {
    isActive?: boolean;
};
