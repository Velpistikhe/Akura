import { Request, Response, NextFunction } from 'express';
export interface Actor {
    id: string;
    name: string;
    officeBranchId: string;
}
export declare const requireActor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requireWorkOrderSection: (...sections: string[]) => (_req: Request, res: Response, next: NextFunction) => void;
/**
 * Work Order creation from a company and Work Order update: MARKETING section
 * with the USER role only. ADMIN and APP_MANAGER are rejected, so the
 * marketing officer who owns the document is the only actor allowed to write
 * a Work Order.
 */
export declare const requireMarketingUser: (_req: Request, res: Response, next: NextFunction) => void;
/**
 * Work Order creation from a quotation: MARKETING section with the USER role
 * or the ADMIN role. The marketing admin who approves the quotation may also
 * turn it into a Work Order, so the marketing officer is not the only actor
 * allowed to write it. The section stays MARKETING: an ADMIN of another section
 * and the APP_MANAGER role are still rejected with 403.
 */
export declare const requireMarketingUserOrAdmin: (_req: Request, res: Response, next: NextFunction) => void;
