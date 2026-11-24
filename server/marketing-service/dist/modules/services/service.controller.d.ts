import { Request, Response } from 'express';
export declare const serviceController: {
    list(req: Request, res: Response): Promise<void>;
    history(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    createMaintenanceScope(req: Request, res: Response): Promise<void>;
    deleteMaintenanceScope(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    createInspectionScope(req: Request, res: Response): Promise<void>;
    deleteInspectionScope(req: Request, res: Response): Promise<void>;
};
