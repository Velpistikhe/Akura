import { NextFunction, Request, Response } from 'express';
export declare const authenticateJwt: (req: Request, res: Response, next: NextFunction) => Promise<void>;
