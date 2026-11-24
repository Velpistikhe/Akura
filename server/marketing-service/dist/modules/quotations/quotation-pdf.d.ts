import { Prisma } from '@prisma/client';
import { AuditActor } from '../../types/auth.types.js';
import './pdfkit-standard-fonts.js';
type PdfQuotation = Prisma.QuotationGetPayload<{
    include: {
        items: true;
    };
}>;
export declare function renderQuotationPdf(quote: PdfQuotation, actor: AuditActor, approvedAt: Date, preview?: boolean): Promise<Buffer>;
export {};
