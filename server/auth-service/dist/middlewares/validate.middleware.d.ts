import { RequestHandler } from 'express';
import { z } from 'zod';
type RequestSource = 'body' | 'query' | 'params';
export declare const validate: (source: RequestSource, schema: z.ZodTypeAny) => RequestHandler;
export declare const validateBody: (schema: z.ZodTypeAny) => RequestHandler;
export {};
