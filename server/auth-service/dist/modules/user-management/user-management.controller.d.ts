import { Request, Response } from 'express';
export declare const userManagementController: {
    list(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
};
