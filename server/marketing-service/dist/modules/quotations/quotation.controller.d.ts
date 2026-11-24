import { Request, Response } from 'express';
export declare const quotationController: {
    preview(_req: Request, res: Response): Promise<void>;
    submit(req: Request, res: Response): Promise<void>;
    reject(req: Request, res: Response): Promise<void>;
    revise(req: Request, res: Response): Promise<void>;
    approve(req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    getReference(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    addItem(req: Request, res: Response): Promise<void>;
    deleteItem(req: Request, res: Response): Promise<void>;
};
