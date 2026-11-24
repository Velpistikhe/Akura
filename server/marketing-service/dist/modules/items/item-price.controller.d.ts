import { Request, Response } from 'express';
export declare const itemPriceController: {
    itemHistory: (req: Request, res: Response) => Promise<void>;
    sizeHistory: (req: Request, res: Response) => Promise<void>;
    priceHistory: (req: Request, res: Response) => Promise<void>;
    resolvedPrices: (req: Request, res: Response) => Promise<void>;
    contractPriceOptions: (req: Request, res: Response) => Promise<void>;
    updateItem: (req: Request, res: Response) => Promise<void>;
    createPrice: (req: Request, res: Response) => Promise<void>;
    updatePrice: (req: Request, res: Response) => Promise<void>;
    createContract: (req: Request, res: Response) => Promise<void>;
    updateContract: (req: Request, res: Response) => Promise<void>;
    removeContract: (req: Request, res: Response) => Promise<void>;
    getSize: (req: Request, res: Response) => Promise<void>;
};
