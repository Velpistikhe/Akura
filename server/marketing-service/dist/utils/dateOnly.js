"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatContractDates = exports.formatDateOnly = void 0;
const formatDateOnly = (value) => {
    if (value === null)
        return null;
    if (typeof value === 'string')
        return value.slice(0, 10);
    return value.toISOString().slice(0, 10);
};
exports.formatDateOnly = formatDateOnly;
const formatContractDates = (contract) => ({
    ...contract,
    ...(contract.contractDate === undefined ? {} : { contractDate: (0, exports.formatDateOnly)(contract.contractDate) }),
    effectiveFrom: (0, exports.formatDateOnly)(contract.effectiveFrom ?? null),
    effectiveUntil: (0, exports.formatDateOnly)(contract.effectiveUntil ?? null),
});
exports.formatContractDates = formatContractDates;
//# sourceMappingURL=dateOnly.js.map