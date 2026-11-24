import { Request, RequestHandler, Response } from 'express';
export declare const uploadContractWorkbook: RequestHandler;
export declare const contractExcelController: {
    download: (_req: Request, res: Response) => Promise<void>;
    upload: (req: Request, res: Response) => Promise<void>;
};
