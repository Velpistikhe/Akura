import { NextFunction, Request, Response } from 'express';
declare const serviceSecrets: {
    readonly 'auth-service': string;
    readonly 'app-manager-service': string;
    readonly 'marketing-service': string;
    readonly 'finance-service': string | undefined;
    readonly 'fieldservice-service': string | undefined;
};
type ServiceName = keyof typeof serviceSecrets;
declare global {
    namespace Express {
        interface Locals {
            serviceCaller?: ServiceName;
        }
    }
}
export declare const authenticateServiceCaller: (req: Request, res: Response, next: NextFunction) => void;
export {};
