"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordContractHistory = void 0;
const recordContractHistory = (tx, before, after, actor, action) => {
    const changedFields = before
        ? Object.keys(after).filter(key => JSON.stringify(before[key]) !== JSON.stringify(after[key]))
        : Object.keys(after);
    return tx.companyContractHistory.create({ data: {
            companyContractId: after.id,
            version: after.version,
            action,
            snapshot: JSON.parse(JSON.stringify({ oldData: before, newData: after, changedFields })),
            createdById: actor.id,
            createdByName: actor.name,
        } });
};
exports.recordContractHistory = recordContractHistory;
//# sourceMappingURL=contract-history.js.map