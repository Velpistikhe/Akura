"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictListVisibility = exports.getAuditActor = exports.getOfficeBranchId = void 0;
const httpError_js_1 = require("./httpError.js");
const getOfficeBranchId = (res) => {
    const officeBranchId = res.locals.authUser?.officeBranchId;
    if (!officeBranchId)
        throw new httpError_js_1.HttpError('Office branch assignment is required', 403);
    return officeBranchId;
};
exports.getOfficeBranchId = getOfficeBranchId;
const getAuditActor = (res) => {
    const user = res.locals.authUser;
    if (!user)
        throw new httpError_js_1.HttpError('Authenticated user is required', 401);
    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`.trim() || user.username,
        role: user.role,
        section: user.section,
    };
};
exports.getAuditActor = getAuditActor;
const restrictListVisibility = (res, query) => {
    const user = res.locals.authUser;
    if (!user)
        throw new httpError_js_1.HttpError('Authenticated user is required', 401);
    return user.role === 'ADMIN' ? query : { ...query, isActive: true };
};
exports.restrictListVisibility = restrictListVisibility;
//# sourceMappingURL=officeBranch.js.map