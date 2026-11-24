"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManagementRepository = void 0;
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
const select = {
    id: true, username: true, firstName: true, lastName: true, email: true, telp: true, role: true, section: true,
    officeBranchId: true, officeBranchName: true, isActive: true, version: true, createdAt: true, updatedAt: true,
};
/**
 * The projection returned to a caller that is not an app manager.
 *
 * It exposes the contact details and the assignment of a user, but not the
 * account metadata: the username, the branch id, the version, and the
 * activation state are all omitted.
 */
const summarySelect = {
    id: true, firstName: true, lastName: true, email: true, telp: true, role: true, section: true,
    officeBranchName: true,
};
exports.userManagementRepository = {
    async list(input, scope) {
        // The branch and the activation filter are part of the response of a
        // non-app-manager caller, so a client-supplied value for either of them
        // cannot widen the scope: the filter is overridden, not merged.
        const scopedInput = scope.isAppManager
            ? input
            : { ...input, officeBranchId: undefined, isActive: undefined };
        const query = (0, listQuery_js_1.buildListQuery)(scopedInput, {
            filters: {
                role: (role) => ({ role }),
                section: (section) => ({ section }),
                officeBranchId: (officeBranchId) => ({ officeBranchId }),
                isActive: (isActive) => ({ isActive }),
                search: (search) => ({ OR: [
                        { username: { contains: search, mode: 'insensitive' } },
                        { firstName: { contains: search, mode: 'insensitive' } },
                        { lastName: { contains: search, mode: 'insensitive' } },
                    ] }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                username: (direction) => ({ username: direction }),
                firstName: (direction) => ({ firstName: direction }),
                lastName: (direction) => ({ lastName: direction }),
                role: (direction) => ({ role: direction }),
                section: (direction) => ({ section: direction }),
                officeBranchId: (direction) => ({ officeBranchId: direction }),
                isActive: (direction) => ({ isActive: direction }),
                updatedAt: (direction) => ({ updatedAt: direction }),
            }),
        });
        // A non-app-manager caller is scoped to their own branch and to the active
        // users only. A caller without a branch assignment has no branch to scope
        // to, so the list stays empty for them. The empty case is handled here
        // rather than with a null branch filter, because a null filter matches the
        // users without a branch instead of matching nothing.
        if (!scope.isAppManager && !scope.officeBranchId) {
            return { users: [], pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, 0) };
        }
        const where = scope.isAppManager
            ? query.where
            : { AND: [{ officeBranchId: scope.officeBranchId }, { isActive: true }, query.where] };
        const projection = scope.isAppManager ? select : summarySelect;
        const [users, total] = await Promise.all([
            db_js_1.prisma.user.findMany({ ...query, where, select: projection }),
            db_js_1.prisma.user.count({ where }),
        ]);
        return { users, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    },
    findById: (userId) => db_js_1.prisma.user.findUnique({ where: { id: userId }, select }),
    async lockById(tx, userId) {
        const rows = await tx.$queryRaw `
      SELECT id, username, normalize_username as "normalizeUsername", first_name as "firstName",
        last_name as "lastName", email, telp, role, section, office_branch_id as "officeBranchId",
        office_branch_name as "officeBranchName",
        is_active as "isActive", version,
        created_at as "createdAt", updated_at as "updatedAt"
      FROM "users" WHERE id = ${userId}::uuid FOR UPDATE
    `;
        return rows[0] ?? null;
    },
    lockInvariant: (tx) => tx.$executeRaw `SELECT pg_advisory_xact_lock(hashtext('app_manager_invariant'))`,
    countActiveAppManagers: (tx) => tx.user.count({ where: { role: client_1.UserRole.APP_MANAGER, isActive: true } }),
    async update(tx, userId, version, data) {
        const result = await tx.user.updateMany({ where: { id: userId, version }, data: { ...data, version: { increment: 1 } } });
        if (result.count === 0)
            throw new httpError_js_1.HttpError('Concurrent update detected. Reload the user and try again.', 409);
        return tx.user.findUniqueOrThrow({ where: { id: userId }, select });
    },
    revokeRefreshTokens: (tx, userId) => tx.refreshToken.updateMany({ where: { userId, isRevoked: false }, data: { isRevoked: true } }),
};
//# sourceMappingURL=user-management.repository.js.map