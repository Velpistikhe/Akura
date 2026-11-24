"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.createAuthTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const accessKey_js_1 = require("../config/accessKey.js");
const env_js_1 = require("../config/env.js");
const duration_js_1 = require("./duration.js");
const httpError_js_1 = require("./httpError.js");
const generateAccessToken = (user) => jsonwebtoken_1.default.sign({
    name: `${user.firstName} ${user.lastName}`.trim(),
    username: user.username,
    role: user.role,
    // The department/section is part of the access token so that services which
    // rely on the gateway-verified identity headers can authorize section-scoped
    // resources without calling back into the auth service.
    section: user.section,
    officeBranchId: user.officeBranchId,
    type: 'access',
}, accessKey_js_1.accessTokenPrivateKey, {
    algorithm: 'RS256',
    keyid: env_js_1.env.JWT_ACCESS_KEY_ID,
    subject: user.id,
    issuer: env_js_1.env.JWT_ISSUER,
    audience: env_js_1.env.JWT_AUDIENCE,
    expiresIn: env_js_1.env.JWT_ACCESS_EXPIRES_IN,
});
const generateRefreshToken = (userId) => jsonwebtoken_1.default.sign({
    id: (0, uuid_1.v4)(),
    sub: userId,
    type: 'refresh',
}, env_js_1.env.JWT_REFRESH_SECRET, { expiresIn: env_js_1.env.JWT_REFRESH_EXPIRES_IN });
const createAuthTokens = (user) => ({
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user.id),
    expiresInSeconds: Math.floor((0, duration_js_1.durationToMilliseconds)(env_js_1.env.JWT_ACCESS_EXPIRES_IN) / 1_000),
});
exports.createAuthTokens = createAuthTokens;
const verifyAccessToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, accessKey_js_1.accessTokenPublicKey, {
        algorithms: ['RS256'],
        issuer: env_js_1.env.JWT_ISSUER,
        audience: env_js_1.env.JWT_AUDIENCE,
    });
    if (!decoded.sub
        || decoded.type !== 'access'
        || (decoded.officeBranchId !== null && typeof decoded.officeBranchId !== 'string')) {
        throw new httpError_js_1.HttpError('Unauthorized: Access token is invalid or expired', 401);
    }
    return decoded;
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_js_1.env.JWT_REFRESH_SECRET);
        if (decoded.type !== 'refresh' || typeof decoded.id !== 'string' || typeof decoded.sub !== 'string') {
            throw new Error('Invalid refresh token payload');
        }
    }
    catch {
        throw new httpError_js_1.HttpError('Invalid or expired refresh token', 401);
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=tokens.js.map