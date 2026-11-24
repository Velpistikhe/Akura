import { NextFunction, Request, Response } from 'express';
export declare const requireMarketingAccess: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requireQuotationReferenceAccess: (req: Request, res: Response, next: NextFunction) => Promise<void>;
