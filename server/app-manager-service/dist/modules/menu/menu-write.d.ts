import { Prisma } from '@prisma/client';
export declare const menuWrite: <T>(action: (tx: Prisma.TransactionClient) => Promise<T>) => Promise<T>;
