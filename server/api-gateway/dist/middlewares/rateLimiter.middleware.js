"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRateLimiter = exports.globalRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_js_1 = require("../config/env.js");
exports.globalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_js_1.env.RATE_LIMIT_WINDOW_MS,
    max: env_js_1.env.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (_req, res) => Boolean(res.locals.serviceCaller),
    message: {
        status: 429,
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
});
/**
 * A tighter limit for credential submission endpoints. The global limiter is
 * per IP over a long window, which is too permissive for brute-force attempts
 * against a single account. This one caps attempts per IP on a short window.
 */
exports.authRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_js_1.env.AUTH_RATE_LIMIT_WINDOW_MS,
    max: env_js_1.env.AUTH_RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    // Internal service traffic does not submit user credentials and must not be
    // throttled by the user-facing authentication limit.
    skip: (_req, res) => Boolean(res.locals.serviceCaller),
    message: {
        status: 429,
        success: false,
        message: 'Too many authentication attempts, please try again later.',
    },
});
//# sourceMappingURL=rateLimiter.middleware.js.map