import { Request } from 'express';
export declare const getAuthenticatedUserId: (req: Request) => string;
export declare const getAuthenticatedActor: (req: Request) => {
    id: string;
    name: string;
};
/**
 * The identity of the caller, together with the office branch and the role the
 * access token was issued for.
 *
 * The branch comes from the verified token, so it is the branch the caller was
 * authenticated against. It scopes a read to the caller's own branch.
 */
export declare const getAuthenticatedActorContext: (req: Request) => {
    id: string;
    name: string;
    role: string;
    officeBranchId: string | null;
};
