import { Request, Response } from 'express';
export declare const companyController: {
    history(req: Request, res: Response): Promise<void>;
    staffHistory(req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
};
