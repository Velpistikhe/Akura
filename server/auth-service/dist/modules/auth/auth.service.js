"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const db_js_1 = require("../../config/db.js");
const auth_repository_js_1 = require("./auth.repository.js");
const httpError_js_1 = require("../../utils/httpError.js");
const tokenExpiry_js_1 = require("../../utils/tokenExpiry.js");
const tokens_js_1 = require("../../utils/tokens.js");
const userMapper_js_1 = require("../../utils/userMapper.js");
const userHistory_js_1 = require("../../utils/userHistory.js");
const env_js_1 = require("../../config/env.js");
// Self-service mutations are always performed by the affected user.
const selfActor = (user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim() || user.username,
});
class AuthService {
    async register(username, password, firstName, lastName, email, telp, context) {
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        await db_js_1.prisma.$transaction(async (tx) => {
            const created = await auth_repository_js_1.authRepository.createUser(tx, username, passwordHash, firstName, lastName, email, telp);
            // The registration is recorded in the same transaction as the user row,
            // so the audit trail can never show a registration that did not happen.
            await (0, userHistory_js_1.saveSecurityAudit)(tx, {
                module: 'auth',
                eventType: 'REGISTER',
                action: 'REGISTER',
                outcome: 'SUCCESS',
                userId: created?.id ?? null,
                username,
                context,
            });
        });
    }
    async login(username, password, context) {
        const user = await auth_repository_js_1.authRepository.findUserByUsername(username);
        if (!user?.password) {
            // A login attempt for an unknown username is recorded, so a brute force
            // attempt is visible in the audit trail.
            await (0, userHistory_js_1.saveSecurityAudit)(db_js_1.prisma, {
                module: 'auth',
                eventType: 'LOGIN_FAILED',
                action: 'LOGIN',
                outcome: 'FAILURE',
                username,
                context,
                detail: { reason: 'unknown username' },
            });
            throw new httpError_js_1.HttpError('Invalid username or password', 401);
        }
        if (!await bcryptjs_1.default.compare(password, user.password.passwordHash)) {
            await (0, userHistory_js_1.saveSecurityAudit)(db_js_1.prisma, {
                module: 'auth',
                eventType: 'LOGIN_FAILED',
                action: 'LOGIN',
                outcome: 'FAILURE',
                userId: user.id,
                username,
                officeBranchId: user.officeBranchId,
                context,
                detail: { reason: 'wrong password' },
            });
            throw new httpError_js_1.HttpError('Invalid username or password', 401);
        }
        if (!user.isActive) {
            await (0, userHistory_js_1.saveSecurityAudit)(db_js_1.prisma, {
                module: 'auth',
                eventType: 'LOGIN_FAILED',
                action: 'LOGIN',
                outcome: 'FAILURE',
                userId: user.id,
                username,
                officeBranchId: user.officeBranchId,
                context,
                detail: { reason: 'inactive account' },
            });
            throw new httpError_js_1.HttpError('Account is inactive. Please contact administrator.', 403);
        }
        const tokens = (0, tokens_js_1.createAuthTokens)(user);
        await auth_repository_js_1.authRepository.saveRefreshToken(db_js_1.prisma, user.id, tokens.refreshToken, (0, tokenExpiry_js_1.createRefreshTokenExpiry)(), (0, uuid_1.v4)());
        await (0, userHistory_js_1.saveSecurityAudit)(db_js_1.prisma, {
            module: 'auth',
            eventType: 'LOGIN',
            action: 'LOGIN',
            outcome: 'SUCCESS',
            userId: user.id,
            username: user.username,
            officeBranchId: user.officeBranchId,
            context,
        });
        return { user: (0, userMapper_js_1.sanitizeUser)(user), tokens };
    }
    async refreshToken(refreshToken, context) {
        try {
            (0, tokens_js_1.verifyRefreshToken)(refreshToken);
        }
        catch (error) {
            if (error instanceof httpError_js_1.HttpError) {
                await auth_repository_js_1.authRepository.revokeRefreshToken(db_js_1.prisma, refreshToken);
                // A rejected token is recorded: a replayed or tampered token is a
                // security event.
                await (0, userHistory_js_1.saveSecurityAudit)(db_js_1.prisma, {
                    module: 'auth',
                    eventType: 'TOKEN_REFRESH_REJECTED',
                    action: 'TOKEN_REFRESH',
                    outcome: 'FAILURE',
                    context,
                    detail: { reason: error.message },
                });
                throw new httpError_js_1.RefreshTokenRejectedError(error.message, error.statusCode);
            }
            throw error;
        }
        const result = await db_js_1.prisma.$transaction(async (tx) => {
            const tokenRow = await auth_repository_js_1.authRepository.findRefreshTokenForUpdate(tx, refreshToken);
            if (!tokenRow) {
                return { success: false, statusCode: 401, message: 'Refresh token is invalid' };
            }
            if (tokenRow.isRevoked) {
                await auth_repository_js_1.authRepository.revokeTokenFamily(tx, tokenRow.familyId);
                return {
                    success: false,
                    statusCode: 401,
                    message: 'Refresh token reuse detected. All sessions in this token family have been revoked.',
                };
            }
            if (tokenRow.expiresAt < new Date()) {
                await auth_repository_js_1.authRepository.revokeRefreshToken(tx, refreshToken);
                return { success: false, statusCode: 401, message: 'Refresh token has expired' };
            }
            const now = new Date();
            const idleMilliseconds = env_js_1.env.JWT_REFRESH_IDLE_TIMEOUT_MINUTES * 60 * 1_000;
            if (now.getTime() - tokenRow.lastActivityAt.getTime() >= idleMilliseconds) {
                await auth_repository_js_1.authRepository.revokeTokenFamily(tx, tokenRow.familyId);
                return {
                    success: false,
                    statusCode: 401,
                    message: `Refresh token session expired after ${env_js_1.env.JWT_REFRESH_IDLE_TIMEOUT_MINUTES} minutes of inactivity`,
                };
            }
            const user = await auth_repository_js_1.authRepository.findUserByIdForUpdate(tx, tokenRow.userId);
            if (!user) {
                return { success: false, statusCode: 401, message: 'Associated user no longer exists' };
            }
            if (!user.isActive) {
                await auth_repository_js_1.authRepository.revokeTokenFamily(tx, tokenRow.familyId);
                return { success: false, statusCode: 403, message: 'Account is inactive' };
            }
            await auth_repository_js_1.authRepository.revokeRefreshToken(tx, refreshToken, now);
            const tokens = (0, tokens_js_1.createAuthTokens)(user);
            await auth_repository_js_1.authRepository.saveRefreshToken(tx, user.id, tokens.refreshToken, (0, tokenExpiry_js_1.createRefreshTokenExpiry)(), tokenRow.familyId, now);
            // The rotation is recorded in the same transaction as the token change.
            await (0, userHistory_js_1.saveSecurityAudit)(tx, {
                module: 'auth',
                eventType: 'TOKEN_REFRESH',
                action: 'TOKEN_REFRESH',
                outcome: 'SUCCESS',
                userId: user.id,
                username: user.username,
                officeBranchId: user.officeBranchId,
                context,
            });
            return { success: true, tokens };
        });
        if (!result.success) {
            // Every refusal is recorded: a replayed or expired token is a security
            // event that the operator has to be able to see.
            await (0, userHistory_js_1.saveSecurityAudit)(db_js_1.prisma, {
                module: 'auth',
                eventType: 'TOKEN_REFRESH_REJECTED',
                action: 'TOKEN_REFRESH',
                outcome: 'FAILURE',
                context,
                detail: { reason: result.message },
            });
            throw new httpError_js_1.RefreshTokenRejectedError(result.message, result.statusCode);
        }
        return result.tokens;
    }
    async logout(refreshToken, context) {
        if (refreshToken) {
            await auth_repository_js_1.authRepository.revokeRefreshToken(db_js_1.prisma, refreshToken);
        }
        // The logout is recorded, so the audit trail shows when a session ended.
        await (0, userHistory_js_1.saveSecurityAudit)(db_js_1.prisma, {
            module: 'auth',
            eventType: 'LOGOUT',
            action: 'LOGOUT',
            outcome: 'SUCCESS',
            context,
        });
    }
    async updateProfile(userId, firstName, lastName, email, telp) {
        const updatedUser = await db_js_1.prisma.$transaction(async (tx) => {
            const user = await auth_repository_js_1.authRepository.findUserByIdForUpdate(tx, userId);
            if (!user) {
                throw new httpError_js_1.HttpError('User not found', 404);
            }
            const updated = await auth_repository_js_1.authRepository.updateProfileAtomic(tx, userId, firstName, lastName, user.version, email, telp);
            // Self-service profile edit: the authenticated user is the actor.
            await (0, userHistory_js_1.saveUserHistory)(tx, updated, user, selfActor(user), 'UPDATE');
            return updated;
        });
        return (0, userMapper_js_1.sanitizeUser)(updatedUser);
    }
    async changePassword(userId, oldPassword, newPassword) {
        return db_js_1.prisma.$transaction(async (tx) => {
            const userPassword = await auth_repository_js_1.authRepository.findPasswordByUserIdForUpdate(tx, userId);
            if (!userPassword) {
                throw new httpError_js_1.HttpError('User password record not found', 404);
            }
            if (!await bcryptjs_1.default.compare(oldPassword, userPassword.passwordHash)) {
                throw new httpError_js_1.HttpError('Incorrect current password', 400);
            }
            const passwordHash = await bcryptjs_1.default.hash(newPassword, 10);
            await auth_repository_js_1.authRepository.updatePasswordAtomic(tx, userId, passwordHash, userPassword.version);
            await auth_repository_js_1.authRepository.revokeAllUserRefreshTokens(tx, userId);
            const user = await auth_repository_js_1.authRepository.findUserById(tx, userId);
            if (!user) {
                throw new httpError_js_1.HttpError('User not found', 404);
            }
            // Password hashes never enter history: only the redacted action is recorded.
            await (0, userHistory_js_1.saveUserHistory)(tx, user, user, selfActor(user), 'PASSWORD_CHANGE');
            return (0, userMapper_js_1.sanitizeUser)(user);
        });
    }
    async getProfile(userId) {
        const user = await auth_repository_js_1.authRepository.findUserById(db_js_1.prisma, userId);
        if (!user) {
            throw new httpError_js_1.HttpError('User not found', 404);
        }
        return (0, userMapper_js_1.sanitizeUser)(user);
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map