import { Response } from 'express';
import { AuthTokens } from '../types/auth.types.js';
export declare const setTokenCookies: (res: Response, tokens: AuthTokens) => void;
export declare const clearTokenCookies: (res: Response) => void;
