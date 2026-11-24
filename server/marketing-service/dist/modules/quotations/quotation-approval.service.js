"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationApproval = void 0;
const node_crypto_1 = require("node:crypto");
const quotation_repository_js_1 = require("./quotation.repository.js");
const quotation_schemas_js_1 = require("./quotation.schemas.js");
const quotation_pdf_js_1 = require("./quotation-pdf.js");
const quotation_storage_js_1 = require("./quotation-storage.js");
const httpError_js_1 = require("../../utils/httpError.js");
const logger_js_1 = require("../../utils/logger.js");
exports.quotationApproval = {
    async get(id, officeBranchId) {
        const quote = await quotation_repository_js_1.quotationRepository.find(id, officeBranchId);
        return quote.pdfDocument ? { ...quote, pdf: { ...quote.pdfDocument,
                ...await quotation_storage_js_1.quotationStorage.downloadUrl(quote.pdfDocument.bucket, quote.pdfDocument.key) } } : quote;
    },
    async preview(id, officeBranchId, actor) {
        const quote = await quotation_repository_js_1.quotationRepository.findActive(id, officeBranchId);
        const approvedAt = new Date();
        const pdf = await (0, quotation_pdf_js_1.renderQuotationPdf)(quote, actor, approvedAt, true);
        const fileName = quote.no === null
            ? `quotation-preview-${id}.pdf`
            : `Q-${quote.no}-R${quote.revision}-${quote.numberYear}.pdf`;
        return { pdf, fileName };
    },
    async approve(id, input, officeBranchId, actor) {
        const { version } = quotation_schemas_js_1.approveQuotationSchema.parse(input);
        const quote = await quotation_repository_js_1.quotationRepository.findActive(id, officeBranchId);
        if (quote.version !== version)
            throw new httpError_js_1.HttpError('Quotation has changed; reload before retrying', 409);
        // Retrying the latest approved version returns the existing document, without another upload/history entry.
        if (quote.status === 'APPROVED' && quote.pdfDocument) {
            const document = quote.pdfDocument;
            return { ...quote, pdf: { ...document, ...await quotation_storage_js_1.quotationStorage.downloadUrl(document.bucket, document.key) } };
        }
        if (!quotation_repository_js_1.approvableStatuses.includes(quote.status))
            throw new httpError_js_1.HttpError('Quotation status cannot be approved', 409);
        if (!quote.items.length)
            throw new httpError_js_1.HttpError('Quotation must contain active items before approval', 409);
        const bucket = quotation_storage_js_1.quotationStorage.bucket();
        const key = `quotation/${id}-r${quote.revision}-${(0, node_crypto_1.randomUUID)()}.pdf`;
        let uploaded = false;
        let download;
        try {
            const approved = await quotation_repository_js_1.quotationRepository.approve(id, version, officeBranchId, actor, async (numbered) => {
                const approvedAt = new Date();
                const pdf = await (0, quotation_pdf_js_1.renderQuotationPdf)(numbered, actor, approvedAt, false);
                const fileName = `Q-${numbered.no}-R${numbered.revision}-${numbered.numberYear}.pdf`;
                download = await quotation_storage_js_1.quotationStorage.downloadUrl(bucket, key);
                uploaded = true; // Includes a PUT whose successful response is lost.
                await quotation_storage_js_1.quotationStorage.upload(bucket, key, pdf, fileName);
                return { bucket, key, fileName, contentType: 'application/pdf', size: pdf.length,
                    sha256: (0, node_crypto_1.createHash)('sha256').update(pdf).digest('hex'), revision: numbered.revision, version: numbered.version,
                    approvedAt: approvedAt.toISOString(), approvedById: actor.id, approvedByName: actor.name };
            });
            return { ...approved, pdf: { ...approved.pdfDocument, ...download } };
        }
        catch (error) {
            if (uploaded) {
                // A database connection can fail after COMMIT. Never delete an object referenced by a committed approval.
                try {
                    const stored = await quotation_repository_js_1.quotationRepository.findPdf(bucket, key);
                    if (stored) {
                        const saved = await quotation_repository_js_1.quotationRepository.find(id, officeBranchId);
                        if (saved.pdfDocument?.id === stored.id) {
                            return { ...saved, pdf: { ...stored, ...await quotation_storage_js_1.quotationStorage.downloadUrl(bucket, key) } };
                        }
                    }
                    else {
                        await quotation_storage_js_1.quotationStorage.remove(bucket, key);
                    }
                }
                catch {
                    logger_js_1.logger.warn('Unable to reconcile quotation PDF; retain object for recovery', { quotationId: id, key });
                }
            }
            if (error instanceof httpError_js_1.HttpError)
                throw error;
            logger_js_1.logger.error('Quotation PDF approval failed', { quotationId: id });
            throw new httpError_js_1.HttpError('Unable to generate or store quotation PDF; reload quotation before retrying', 503);
        }
    },
};
//# sourceMappingURL=quotation-approval.service.js.map