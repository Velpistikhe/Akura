"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManagementService = void 0;
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const userHistory_js_1 = require("../../utils/userHistory.js");
const user_management_repository_js_1 = require("./user-management.repository.js");
const ensureActiveVersion = (user, version) => {
    if (user.version !== version) {
        throw new httpError_js_1.HttpError('Concurrent update detected. Reload the user and try again.', 409);
    }
    if (!user.isActive) {
        throw new httpError_js_1.HttpError('Inactive users cannot be updated', 409);
    }
};
// Exposes the stored office branch display name under the public `branch` key
// while keeping officeBranchId for assignment/filtering. The summary projection
// carries the branch name under the same public key, so a caller reads one
// shape for the branch in both roles.
const presentUser = ({ officeBranchName, ...user }) => ({
    ...user,
    branch: officeBranchName ?? null,
});
exports.userManagementService = {
    list: async (input, scope) => {
        const result = await user_management_repository_js_1.userManagementRepository.list(input, scope);
        // An app manager reads the full profile; any other caller reads the
        // summary projection, which the repository already selected.
        return { ...result, users: result.users.map(presentUser) };
    },
    async get(userId) {
        const user = await user_management_repository_js_1.userManagementRepository.findById(userId);
        if (!user)
            throw new httpError_js_1.HttpError('User not found', 404);
        return presentUser(user);
    },
    async update(actor, userId, data) {
        const updated = await db_js_1.prisma.$transaction(async (tx) => {
            const user = await user_management_repository_js_1.userManagementRepository.lockById(tx, userId);
            if (!user)
                throw new httpError_js_1.HttpError('User not found', 404);
            ensureActiveVersion(user, data.version);
            const roleChanged = data.role !== undefined && data.role !== user.role;
            const statusChanged = data.isActive !== undefined && data.isActive !== user.isActive;
            const sectionChanged = data.section !== undefined && data.section !== user.section;
            const branchChanged = data.officeBranchId !== undefined
                && (data.officeBranchId !== user.officeBranchId || data.branch !== user.officeBranchName);
            const emailChanged = data.email !== undefined && data.email !== user.email;
            const telpChanged = data.telp !== undefined && data.telp !== user.telp;
            if (actor.id === userId && roleChanged) {
                throw new httpError_js_1.HttpError('App managers cannot change their own role', 409);
            }
            if (actor.id === userId && statusChanged) {
                throw new httpError_js_1.HttpError('App managers cannot change their own active status', 409);
            }
            if (!roleChanged && !statusChanged && !sectionChanged && !branchChanged && !emailChanged && !telpChanged) {
                return user_management_repository_js_1.userManagementRepository.findById(userId);
            }
            if (roleChanged || statusChanged)
                await user_management_repository_js_1.userManagementRepository.lockInvariant(tx);
            const removesActiveAppManager = user.role === client_1.UserRole.APP_MANAGER
                && user.isActive
                && ((roleChanged && data.role !== client_1.UserRole.APP_MANAGER) || (statusChanged && data.isActive === false));
            if (removesActiveAppManager && await user_management_repository_js_1.userManagementRepository.countActiveAppManagers(tx) <= 1) {
                throw new httpError_js_1.HttpError('The last active app manager cannot be demoted or deactivated', 409);
            }
            const updated = await user_management_repository_js_1.userManagementRepository.update(tx, userId, data.version, {
                ...(roleChanged && { role: data.role }),
                ...(sectionChanged && { section: data.section }),
                // The branch id and its display name are always written together.
                ...(branchChanged && { officeBranchId: data.officeBranchId, officeBranchName: data.branch }),
                ...(emailChanged && { email: data.email ?? null }),
                ...(telpChanged && { telp: data.telp ?? null }),
                ...(statusChanged && { isActive: data.isActive }),
            });
            // Every administrative change writes one append-only history row inside the
            // same transaction, including the old/new branch id AND branch name.
            await (0, userHistory_js_1.saveUserHistory)(tx, updated, user, actor, 'UPDATE');
            if (statusChanged && data.isActive === false) {
                await user_management_repository_js_1.userManagementRepository.revokeRefreshTokens(tx, userId);
            }
            return updated;
        });
        return updated ? presentUser(updated) : updated;
    },
};
//# sourceMappingURL=user-management.service.js.map