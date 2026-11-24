"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = void 0;
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const userHistory_js_1 = require("../../utils/userHistory.js");
class AuthRepository {
    async createUser(client, username, passwordHash, firstName, lastName, email, telp) {
        try {
            const user = await client.user.create({
                data: {
                    username: username.trim(),
                    normalizeUsername: username.toLowerCase().trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email ?? null,
                    telp: telp ?? null,
                },
            });
            await client.userPassword.create({ data: { userId: user.id, passwordHash } });
            // Self-registration has no separate actor: the created user is the actor.
            await (0, userHistory_js_1.saveUserHistory)(client, user, null, {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`.trim() || user.username,
            }, 'CREATE');
            return user;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                const target = Array.isArray(error.meta?.target)
                    ? error.meta.target.map(String)
                    : [String(error.meta?.target ?? '')];
                const usernameConflict = target.some((field) => ['username', 'normalizeUsername', 'normalize_username'].some((name) => field.includes(name)));
                throw new httpError_js_1.HttpError(usernameConflict ? 'Username already registered' : 'Unique value already registered', 409);
            }
            throw error;
        }
    }
    findUserByUsername(username) {
        return db_js_1.prisma.user.findUnique({
            where: { normalizeUsername: username.toLowerCase().trim() },
            include: { password: true },
        });
    }
    findUserById(client, id) {
        return client.user.findUnique({ where: { id } });
    }
    async findUserByIdForUpdate(client, id) {
        const rows = await client.$queryRaw `
      SELECT
        id,
        username,
        normalize_username as "normalizeUsername",
        first_name as "firstName",
        last_name as "lastName",
        email,
        telp,
        role,
        section,
        office_branch_id as "officeBranchId",
        office_branch_name as "officeBranchName",
        is_active as "isActive",
        version,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM "users"
      WHERE id = ${id}::uuid
      FOR UPDATE
    `;
        return rows[0] ?? null;
    }
    async findPasswordByUserIdForUpdate(client, userId) {
        const rows = await client.$queryRaw `
      SELECT
        id,
        user_id as "userId",
        password_hash as "passwordHash",
        version,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM "user_passwords"
      WHERE user_id = ${userId}::uuid
      FOR UPDATE
    `;
        return rows[0] ?? null;
    }
    async updateProfileAtomic(client, userId, firstName, lastName, expectedVersion, email, telp) {
        const updated = await client.user.updateMany({
            where: { id: userId, version: expectedVersion },
            data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                ...(email !== undefined && { email }),
                ...(telp !== undefined && { telp }),
                version: { increment: 1 },
            },
        });
        if (updated.count === 0) {
            throw new httpError_js_1.HttpError('Concurrent update detected. Please try again.', 409);
        }
        return client.user.findUniqueOrThrow({ where: { id: userId } });
    }
    async updatePasswordAtomic(client, userId, passwordHash, expectedVersion) {
        const updated = await client.userPassword.updateMany({
            where: { userId, version: expectedVersion },
            data: {
                passwordHash,
                version: { increment: 1 },
            },
        });
        if (updated.count === 0) {
            throw new httpError_js_1.HttpError('Concurrent update detected. Please try again.', 409);
        }
        return client.userPassword.findUniqueOrThrow({ where: { userId } });
    }
    saveRefreshToken(client, userId, token, expiresAt, familyId, lastActivityAt = new Date()) {
        return client.refreshToken.create({
            data: { userId, token, expiresAt, familyId, lastActivityAt },
        });
    }
    async findRefreshTokenForUpdate(client, token) {
        const rows = await client.$queryRaw `
      SELECT
        id,
        user_id as "userId",
        family_id as "familyId",
        token,
        expires_at as "expiresAt",
        is_revoked as "isRevoked",
        last_activity_at as "lastActivityAt",
        created_at as "createdAt"
      FROM "refresh_tokens"
      WHERE token = ${token}
      FOR UPDATE
    `;
        return rows[0] ?? null;
    }
    async revokeRefreshToken(client, token, lastActivityAt) {
        const updated = await client.refreshToken.updateMany({
            where: { token },
            data: { isRevoked: true, ...(lastActivityAt && { lastActivityAt }) },
        });
        return updated.count > 0;
    }
    async revokeTokenFamily(client, familyId) {
        const updated = await client.refreshToken.updateMany({
            where: { familyId, isRevoked: false },
            data: { isRevoked: true },
        });
        return updated.count;
    }
    async revokeAllUserRefreshTokens(client, userId) {
        const updated = await client.refreshToken.updateMany({
            where: { userId, isRevoked: false },
            data: { isRevoked: true },
        });
        return updated.count;
    }
}
exports.authRepository = new AuthRepository();
//# sourceMappingURL=auth.repository.js.map