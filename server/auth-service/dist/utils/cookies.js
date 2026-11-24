"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTokenCookies = exports.setTokenCookies = void 0;
const env_js_1 = require("../config/env.js");
const duration_js_1 = require("./duration.js");
const ACCESS_TOKEN_MAX_AGE = (0, duration_js_1.durationToMilliseconds)(env_js_1.env.JWT_ACCESS_EXPIRES_IN);
const REFRESH_TOKEN_MAX_AGE = (0, duration_js_1.durationToMilliseconds)(env_js_1.env.JWT_REFRESH_EXPIRES_IN);
const isDeployed = env_js_1.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
const cookieOptions = {
    httpOnly: true,
    secure: isDeployed,
    sameSite: isDeployed ? 'none' : 'lax',
    path: '/',
};
const setTokenCookies = (res, tokens) => {
    res.cookie('accessToken', tokens.accessToken, {
        ...cookieOptions,
        maxAge: ACCESS_TOKEN_MAX_AGE,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
        ...cookieOptions,
        maxAge: REFRESH_TOKEN_MAX_AGE,
    });
};
exports.setTokenCookies = setTokenCookies;
const clearTokenCookies = (res) => {
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
};
exports.clearTokenCookies = clearTokenCookies;
//# sourceMappingURL=cookies.js.map