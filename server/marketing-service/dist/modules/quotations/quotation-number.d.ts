import { Prisma } from '@prisma/client';
export declare const quotationDate: (now?: Date) => Date;
export declare const quotationNumberYear: (now?: Date) => number;
export declare function lockNextQuotationNumber(tx: Prisma.TransactionClient, officeBranchId: string, year: number): Promise<number>;
