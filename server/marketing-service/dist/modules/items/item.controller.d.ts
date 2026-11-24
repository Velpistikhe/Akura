import { Request, Response } from 'express';
export declare const listItems: (req: Request, res: Response) => Promise<void>;
export declare const itemController: {
    create: (req: Request, res: Response) => Promise<void>;
    addSize: (req: Request, res: Response) => Promise<void>;
    addInspectionScopes: (req: Request, res: Response) => Promise<void>;
    listSizes: (req: Request, res: Response) => Promise<void>;
    listContractSizes: (req: Request, res: Response) => Promise<void>;
    removeSize: (req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
};
