"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicableTax = applicableTax;
const httpError_js_1 = require("../../utils/httpError.js");
async function applicableTax(tx, officeBranchId, at) {
    const day = new Date(`${new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(at)}T00:00:00.000Z`);
    const tax = await tx.taxCache.findFirst({ where: { officeBranchId, effectiveFrom: { lte: day },
            OR: [{ effectiveUntil: null }, { effectiveUntil: { gte: day } }] }, orderBy: { effectiveFrom: 'desc' } });
    if (!tax)
        throw new httpError_js_1.HttpError('No synchronized tax is available for this branch and quotation date', 503);
    return tax;
}
//# sourceMappingURL=tax-sync.js.map