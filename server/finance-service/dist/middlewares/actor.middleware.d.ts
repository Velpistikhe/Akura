import { Request, Response, NextFunction } from 'express';
export interface Actor {
    id: string;
    name: string;
    officeBranchId: string;
}
export declare const requireActor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
