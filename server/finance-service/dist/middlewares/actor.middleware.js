"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireActor = void 0;
const zod_1 = require("zod");
const gateway_js_1 = require("../integrations/gateway.js");
const httpError_js_1 = require("../utils/httpError.js");
const profileSchema = zod_1.z.object({ id: zod_1.z.string().uuid(), officeBranchId: zod_1.z.string().uuid().nullable(), isActive: zod_1.z.boolean(), role: zod_1.z.string(), section: zod_1.z.string().nullable(), firstName: zod_1.z.string(), lastName: zod_1.z.string(), username: zod_1.z.string() });
const resolveActor = (allowedSections, allowAdministrativeRoles = true) => async (req, res, next) => {
    try {
        const result = profileSchema.safeParse(await (0, gateway_js_1.gatewayGet)('auth/me', req));
        if (!result.success)
            throw new httpError_js_1.HttpError('Invalid user profile response', 502);
        const profile = result.data;
        if (profile.id !== req.user?.sub)
            throw new httpError_js_1.HttpError('User identity mismatch', 401);
        if (!profile.isActive || !profile.officeBranchId)
            throw new httpError_js_1.HttpError('Active user and office branch assignment are required', 403);
        if (req.user?.officeBranchId !== profile.officeBranchId)
            throw new httpError_js_1.HttpError('Office branch assignment has changed; please sign in again', 401);
        if (!(allowAdministrativeRoles && ['ADMIN', 'APP_MANAGER'].includes(profile.role)) && !allowedSections.includes(profile.section ?? ''))
            throw new httpError_js_1.HttpError('Access to this section is required', 403);
        res.locals.financeAccessAllowed = ['ADMIN', 'APP_MANAGER'].includes(profile.role) || ['FINANCE', 'ACCOUNTING', 'MARKETING'].includes(profile.section ?? '');
        res.locals.taxWriteAllowed = profile.role === 'ADMIN' && ['FINANCE', 'MARKETING'].includes(profile.section ?? '');
        res.locals.documentActor = { id: profile.id, name: `${profile.firstName} ${profile.lastName}`.trim() || profile.username, officeBranchId: profile.officeBranchId };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.requireActor = resolveActor(['FINANCE', 'ACCOUNTING', 'MARKETING']);
//# sourceMappingURL=actor.middleware.js.map