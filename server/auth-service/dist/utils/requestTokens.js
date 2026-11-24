"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshToken = exports.getAccessToken = void 0;
const getAccessToken = (req) => {
    const authorization = req.headers.authorization;
    if (authorization?.startsWith('Bearer ')) {
        return authorization.slice(7);
    }
    return req.cookies?.accessToken;
};
exports.getAccessToken = getAccessToken;
const getRefreshToken = (req) => {
    const token = req.cookies?.refreshToken || req.headers['x-refresh-token'];
    return typeof token === 'string' ? token : undefined;
};
exports.getRefreshToken = getRefreshToken;
//# sourceMappingURL=requestTokens.js.map