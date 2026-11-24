import { NextFunction, Request, RequestHandler, Response } from 'express';
type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const asyncHandler: (handler: Handler) => RequestHandler;
export {};
