import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../auth/auth.middleware.js';
export declare const requireAppManager: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
