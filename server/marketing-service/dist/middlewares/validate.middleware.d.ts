import { RequestHandler } from 'express';
import { z } from 'zod';
type Source = 'body' | 'query' | 'params';
export declare const validate: (source: Source, schema: z.ZodTypeAny) => RequestHandler;
export {};
