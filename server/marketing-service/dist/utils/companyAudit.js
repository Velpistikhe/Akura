"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCompanyStaffHistory = exports.requireCurrentVersion = exports.lockCompanyBranch = void 0;
const httpError_js_1 = require("./httpError.js");
// Shared by company and staff writes, including parent version changes.
const lockCompanyBranch = async (tx, branch) => {
    await tx.$executeRaw `SELECT pg_advisory_xact_lock(hashtext(${'company-branch:' + branch}))`;
};
exports.lockCompanyBranch = lockCompanyBranch;
const requireCurrentVersion = (row, version) => {
    if (row.revoked || row.version !== version) {
        throw new httpError_js_1.HttpError('Data has changed or is inactive; reload before retrying', 409);
    }
};
exports.requireCurrentVersion = requireCurrentVersion;
const saveCompanyStaffHistory = async (tx, companyStaffId, actor, action) => {
    const staff = await tx.companyStaff.findUniqueOrThrow({
        where: { id: companyStaffId },
        include: {
            company: { select: { id: true, name: true, type: true, version: true } },
        },
    });
    await tx.companyStaffHistory.create({ data: {
            companyStaffId, version: staff.version, action,
            snapshot: JSON.parse(JSON.stringify(staff)), createdById: actor.id, createdByName: actor.name,
        } });
};
exports.saveCompanyStaffHistory = saveCompanyStaffHistory;
//# sourceMappingURL=companyAudit.js.map