"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthenticated = exports.requireAppManager = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const env_js_1 = require("../config/env.js");
const requestTokens_js_1 = require("../utils/requestTokens.js");
const readHeader = (req, name) => {
    const value = req.headers[name];
    return typeof value === 'string' && value.length > 0 ? value : undefined;
};
/**
 * Identity for this service comes from the API Gateway, which verifies the
 * access token and forwards the result in the X-User-* headers. The gateway
 * strips any inbound X-User-* header before injecting its own, so a client
 * cannot spoof them. Because the gateway secret already proves the request
 * arrived through the gateway, this service does not verify the token itself.
 */
const liveProfileSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    username: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    role: zod_1.z.string(),
    section: zod_1.z.string().nullable(),
    officeBranchId: zod_1.z.string().uuid().nullable(),
    isActive: zod_1.z.boolean(),
});
const resolveLiveProfile = async (req, requestId) => {
    const token = (0, requestTokens_js_1.getAccessToken)(req);
    if (!token)
        return null;
    try {
        const response = await fetch(`${env_js_1.env.API_GATEWAY_URL}/api/v1/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...(requestId ? { 'x-request-id': requestId } : {}),
            },
            signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok)
            return null;
        const body = await response.json();
        const parsed = liveProfileSchema.safeParse(body.data);
        if (!parsed.success || !parsed.data.isActive)
            return null;
        const profile = parsed.data;
        if (!Object.values(client_1.UserRole).includes(profile.role))
            return null;
        const role = profile.role;
        const section = profile.section && Object.values(client_1.UserSection).includes(profile.section)
            ? profile.section
            : null;
        return {
            id: profile.id,
            role,
            section,
            officeBranchId: profile.officeBranchId,
            firstName: profile.firstName,
            lastName: profile.lastName,
            username: profile.username,
        };
    }
    catch {
        return null;
    }
};
const readGatewayIdentity = (req) => {
    const id = readHeader(req, 'x-user-id');
    const role = readHeader(req, 'x-user-role');
    if (!id || !role || !Object.values(client_1.UserRole).includes(role))
        return null;
    const sectionHeader = readHeader(req, 'x-user-section');
    const section = sectionHeader && Object.values(client_1.UserSection).includes(sectionHeader)
        ? sectionHeader
        : null;
    return {
        id,
        role,
        section,
        officeBranchId: readHeader(req, 'x-office-branch-id') ?? null,
        firstName: readHeader(req, 'x-user-name'),
        username: readHeader(req, 'x-user-username'),
    };
};
/**
 * Factory middleware: resolve the gateway-verified identity and validate the
 * role.
 *
 * Flow:
 *  1. Read the identity headers the gateway injected after verifying the JWT
 *  2. Validate the role -> continue or reject the request
 *  3. Store the identity in res.locals for the controller
 */
const requireRole = (allowedRoles) => async (req, res, next) => {
    const requestId = typeof req.headers['x-request-id'] === 'string'
        ? req.headers['x-request-id']
        : undefined;
    const authUser = res.locals.arrivedViaGateway === true
        ? readGatewayIdentity(req)
        : await resolveLiveProfile(req, requestId);
    if (!authUser) {
        res.status(401).json({
            status: 401,
            success: false,
            message: res.locals.arrivedViaGateway === true
                ? 'Unauthorized: missing or invalid identity'
                : 'Unauthorized',
            requestId,
        });
        return;
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(authUser.role)) {
        res.status(403).json({
            status: 403,
            success: false,
            message: `Access denied: required role is ${allowedRoles.join(' or ')}`,
            requestId,
        });
        return;
    }
    res.locals.authUser = authUser;
    next();
};
/** Hanya user dengan role app_manager */
exports.requireAppManager = requireRole([client_1.UserRole.APP_MANAGER]);
/** Semua role aktif - hanya memvalidasi identitas dari gateway */
exports.requireAuthenticated = requireRole([client_1.UserRole.USER, client_1.UserRole.ADMIN, client_1.UserRole.APP_MANAGER]);
//# sourceMappingURL=authorize.middleware.js.map