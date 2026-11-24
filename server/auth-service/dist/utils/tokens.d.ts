import { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { AuthTokens } from '../types/auth.types.js';
interface AccessTokenPayload extends JwtPayload {
    sub: string;
    name: string;
    username: string;
    role: string;
    section?: string | null;
    officeBranchId: string | null;
    type: 'access';
}
export declare const createAuthTokens: (user: User) => AuthTokens;
export declare const verifyAccessToken: (token: string) => AccessTokenPayload;
export declare const verifyRefreshToken: (token: string) => void;
export {};
