"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireQuotationReferenceAccess = exports.requireMarketingAccess = void 0;
const serviceUrl_js_1 = require("../utils/serviceUrl.js");
const requestTokens_js_1 = require("../utils/requestTokens.js");
const gatewayAuthMe_js_1 = require("../utils/gatewayAuthMe.js");
const requireSectionAccess = (sections) => async (req, res, next) => {
    const token = (0, requestTokens_js_1.getAccessToken)(req);
    const tokenPayload = req.user;
    const requestId = typeof req.headers['x-request-id'] === 'string' ? req.headers['x-request-id'] : undefined;
    if (!token || !tokenPayload) {
        res.status(401).json({ status: 401, success: false, message: 'Unauthorized: missing access token', requestId });
        return;
    }
    const viaGateway = res.locals.arrivedViaGateway === true;
    if (viaGateway) {
        const gatewayUserId = req.headers['x-user-id'];
        const gatewayUserRole = req.headers['x-user-role'];
        const gatewayOfficeBranchId = req.headers['x-office-branch-id'];
        if (gatewayUserId !== tokenPayload.sub
            || (tokenPayload.role && gatewayUserRole !== tokenPayload.role)
            || (tokenPayload.officeBranchId && gatewayOfficeBranchId !== tokenPayload.officeBranchId)) {
            res.status(401).json({
                status: 401,
                success: false,
                message: 'Unauthorized: gateway identity does not match access token',
                requestId,
            });
            return;
        }
    }
    try {
        const response = viaGateway
            ? await fetch((0, serviceUrl_js_1.serviceUrl)('auth/me'), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...(0, serviceUrl_js_1.serviceHeaders)('auth/me'),
                    ...(requestId ? { 'x-request-id': requestId } : {}),
                },
            })
            : await (0, gatewayAuthMe_js_1.fetchGatewayAuthMe)(token, requestId);
        if (!response.ok) {
            res.status(response.status === 403 ? 403 : 401).json({ status: response.status === 403 ? 403 : 401, success: false, message: 'Unable to validate the authenticated user', requestId });
            return;
        }
        const body = await response.json();
        const user = body.data;
        if (!user || user.id !== tokenPayload.sub) {
            res.status(401).json({ status: 401, success: false, message: 'Unauthorized: user identity mismatch', requestId });
            return;
        }
        if (!user?.isActive) {
            res.status(403).json({ status: 403, success: false, message: 'Account is inactive', requestId });
            return;
        }
        if (!['ADMIN', 'APP_MANAGER'].includes(user.role) && !sections.includes(user.section ?? '')) {
            res.status(403).json({ status: 403, success: false, message: 'Access to this section is required', requestId });
            return;
        }
        if (!user.officeBranchId) {
            res.status(403).json({ status: 403, success: false, message: 'Office branch assignment is required', requestId });
            return;
        }
        if (tokenPayload.officeBranchId !== user.officeBranchId) {
            res.status(401).json({ status: 401, success: false, message: 'Unauthorized: office branch assignment has changed; please sign in again', requestId });
            return;
        }
        res.locals.authUser = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.requireMarketingAccess = requireSectionAccess(['MARKETING']);
// Read-only quotation references for downstream document creation. Branch checks remain mandatory.
exports.requireQuotationReferenceAccess = requireSectionAccess(['MARKETING', 'FINANCE', 'ACCOUNTING', 'FIELD_SERVICE']);
//# sourceMappingURL=authorize.middleware.js.map