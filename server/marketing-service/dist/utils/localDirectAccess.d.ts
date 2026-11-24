import { Request } from 'express';
/**
 * Direct browser access to a service running on the developer machine.
 *
 * Enabled only while NODE_ENV is development and the process is not hosted on
 * Vercel. A deployed service keeps the unconditional gateway-secret check even
 * when NODE_ENV is development.
 */
export declare const allowsLocalDirectAccess: () => boolean;
/** Internal callbacks and delivery endpoints stay gateway-only. */
export declare const isGatewayOnlyPath: (req: Request) => boolean;
