import { Request, Response } from 'express';
export declare const menuController: {
    list(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    getMyMenus(req: Request, res: Response): Promise<void>;
};
