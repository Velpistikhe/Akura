"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_js_1 = require("./auth.service.js");
const authenticatedUser_js_1 = require("../../utils/authenticatedUser.js");
const cookies_js_1 = require("../../utils/cookies.js");
const httpError_js_1 = require("../../utils/httpError.js");
const requestTokens_js_1 = require("../../utils/requestTokens.js");
const userHistory_js_1 = require("../../utils/userHistory.js");
exports.authController = {
    async register(req, res) {
        const body = req.body;
        await auth_service_js_1.authService.register(body.username, body.password, body.firstName, body.lastName, body.email, body.telp, (0, userHistory_js_1.getAuditContext)(req));
        res.status(201).json({
            status: 201,
            success: true,
            message: 'User registered successfully',
            requestId: req.headers['x-request-id'],
        });
    },
    async login(req, res) {
        const body = req.body;
        const result = await auth_service_js_1.authService.login(body.username, body.password, (0, userHistory_js_1.getAuditContext)(req));
        (0, cookies_js_1.setTokenCookies)(res, result.tokens);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Login successful',
            // The refresh token stays in the httpOnly cookie only. The access token is
            // also returned so development microfrontends can authenticate direct
            // microservice calls with Authorization: Bearer.
            data: { user: result.user, accessToken: result.tokens.accessToken },
            requestId: req.headers['x-request-id'],
        });
    },
    async refreshToken(req, res) {
        const refreshToken = (0, requestTokens_js_1.getRefreshToken)(req);
        if (!refreshToken) {
            throw new httpError_js_1.HttpError('Refresh token is required in cookie or x-refresh-token header', 400);
        }
        try {
            const tokens = await auth_service_js_1.authService.refreshToken(refreshToken, (0, userHistory_js_1.getAuditContext)(req));
            (0, cookies_js_1.setTokenCookies)(res, tokens);
            res.status(200).json({
                status: 200,
                success: true,
                message: 'Token refreshed successfully',
                // Keeps the rotated access token available to development
                // microfrontends that authenticate direct microservice calls.
                data: { accessToken: tokens.accessToken },
                requestId: req.headers['x-request-id'],
            });
        }
        catch (error) {
            if (error instanceof httpError_js_1.RefreshTokenRejectedError)
                (0, cookies_js_1.clearTokenCookies)(res);
            throw error;
        }
    },
    async logout(req, res) {
        await auth_service_js_1.authService.logout((0, requestTokens_js_1.getRefreshToken)(req), (0, userHistory_js_1.getAuditContext)(req));
        (0, cookies_js_1.clearTokenCookies)(res);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Logout successful',
            requestId: req.headers['x-request-id'],
        });
    },
    async getProfile(req, res) {
        const user = await auth_service_js_1.authService.getProfile((0, authenticatedUser_js_1.getAuthenticatedUserId)(req));
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Profile retrieved successfully',
            data: user,
            // The already verified access token is echoed so development
            // microfrontends can restore a Bearer token after a page reload.
            accessToken: (0, requestTokens_js_1.getAccessToken)(req),
            requestId: req.headers['x-request-id'],
        });
    },
    async updateProfile(req, res) {
        const body = req.body;
        const user = await auth_service_js_1.authService.updateProfile((0, authenticatedUser_js_1.getAuthenticatedUserId)(req), body.firstName, body.lastName, body.email, body.telp);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Profile updated successfully',
            data: user,
            requestId: req.headers['x-request-id'],
        });
    },
    async changePassword(req, res) {
        const body = req.body;
        const user = await auth_service_js_1.authService.changePassword((0, authenticatedUser_js_1.getAuthenticatedUserId)(req), body.oldPassword, body.newPassword);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Password changed successfully',
            data: user,
            requestId: req.headers['x-request-id'],
        });
    },
};
//# sourceMappingURL=auth.controller.js.map