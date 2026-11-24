"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedActorContext = exports.getAuthenticatedActor = exports.getAuthenticatedUserId = void 0;
const httpError_js_1 = require("./httpError.js");
const getAuthenticatedUserId = (req) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new httpError_js_1.HttpError('Unauthorized', 401);
    }
    return userId;
};
exports.getAuthenticatedUserId = getAuthenticatedUserId;
const getAuthenticatedActor = (req) => {
    const user = req.user;
    if (!user?.id) {
        throw new httpError_js_1.HttpError('Unauthorized', 401);
    }
    return { id: user.id, name: user.name?.trim() || user.username?.trim() || 'Unknown user' };
};
exports.getAuthenticatedActor = getAuthenticatedActor;
/**
 * The identity of the caller, together with the office branch and the role the
 * access token was issued for.
 *
 * The branch comes from the verified token, so it is the branch the caller was
 * authenticated against. It scopes a read to the caller's own branch.
 */
const getAuthenticatedActorContext = (req) => {
    const user = req.user;
    if (!user?.id) {
        throw new httpError_js_1.HttpError('Unauthorized', 401);
    }
    return {
        id: user.id,
        name: user.name?.trim() || user.username?.trim() || 'Unknown user',
        role: user.role ?? '',
        officeBranchId: user.officeBranchId ?? null,
    };
};
exports.getAuthenticatedActorContext = getAuthenticatedActorContext;
//# sourceMappingURL=authenticatedUser.js.map