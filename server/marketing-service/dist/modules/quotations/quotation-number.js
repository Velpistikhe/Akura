"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationNumberYear = exports.quotationDate = void 0;
exports.lockNextQuotationNumber = lockNextQuotationNumber;
const httpError_js_1 = require("../../utils/httpError.js");
// PostgreSQL DATE and PDF rendering use UTC midnight to represent the Jakarta calendar day.
const quotationDate = (now = new Date()) => new Date(`${new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)}T00:00:00.000Z`);
exports.quotationDate = quotationDate;
const quotationNumberYear = (now = new Date()) => Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta', year: 'numeric' }).format(now));
exports.quotationNumberYear = quotationNumberYear;
// The caller must keep this transaction open through PDF upload, approval and
// lastNumber update. FOR UPDATE serializes only the same branch/year pair.
async function lockNextQuotationNumber(tx, officeBranchId, year) {
    // ON CONFLICT also handles concurrent creation of a branch's first sequence.
    // Existing quotations (including soft-deleted ones) seed a missing counter.
    await tx.$executeRaw `
    INSERT INTO quotation_sequences (office_branch_id, year, last_number, created_at, updated_at)
    SELECT ${officeBranchId}::uuid, ${year}, COALESCE(MAX(no), 0), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM quotations WHERE office_branch_id = ${officeBranchId}::uuid AND number_year = ${year}
    ON CONFLICT (office_branch_id, year) DO NOTHING
  `;
    const [sequence] = await tx.$queryRaw `
    SELECT last_number AS "lastNumber" FROM quotation_sequences
    WHERE office_branch_id = ${officeBranchId}::uuid AND year = ${year}
    FOR UPDATE
  `;
    if (!sequence)
        throw new Error('Quotation sequence is missing');
    if (sequence.lastNumber >= 2147483647)
        throw new httpError_js_1.HttpError('Quotation number limit reached for this branch and year', 409);
    return sequence.lastNumber + 1;
}
//# sourceMappingURL=quotation-number.js.map