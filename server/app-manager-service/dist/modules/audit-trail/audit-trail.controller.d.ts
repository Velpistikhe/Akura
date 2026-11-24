import { Request, Response } from 'express';
export declare const auditTrailController: {
    list(req: Request, res: Response): Promise<void>;
    listForEntity(req: Request, res: Response): Promise<void>;
};
