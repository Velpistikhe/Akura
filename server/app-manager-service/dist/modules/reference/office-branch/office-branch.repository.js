"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.officeBranchRepository = void 0;
const db_js_1 = require("../../../config/db.js");
const httpError_js_1 = require("../../../utils/httpError.js");
const listQuery_js_1 = require("../../../utils/listQuery.js");
const audit_js_1 = require("../../../utils/audit.js");
const officeBranchSelect = {
    id: true,
    name: true,
    address: true,
    telp: true,
    email: true,
    isHead: true,
    createdAt: true,
    updatedAt: true,
};
/**
 * The version of an office branch for the audit trail.
 *
 * The row has no version column, so the timestamp of the change is used. The
 * audit entry is unique per (entity, version), and the timestamp changes on
 * every write, so each write produces exactly one entry.
 */
const auditVersion = (row) => row.updatedAt.getTime();
const throwHeadConflict = (error) => {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        throw new httpError_js_1.HttpError('A head office branch already exists', 409);
    }
    throw error;
};
class OfficeBranchRepository {
    listOptions() {
        return db_js_1.prisma.officeBranch.findMany({
            select: { id: true, name: true },
            orderBy: [{ isHead: 'desc' }, { name: 'asc' }],
        });
    }
    async list(input) {
        const query = (0, listQuery_js_1.buildListQuery)(input, {
            filters: {
                search: (search) => ({ OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { address: { contains: search, mode: 'insensitive' } },
                        { telp: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                    ] }),
                isHead: (isHead) => ({ isHead }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                name: (direction) => ({ name: direction }),
                address: (direction) => ({ address: direction }),
                telp: (direction) => ({ telp: direction }),
                email: (direction) => ({ email: direction }),
                isHead: (direction) => ({ isHead: direction }),
                updatedAt: (direction) => ({ updatedAt: direction }),
            }),
        });
        const [officeBranches, total] = await Promise.all([
            db_js_1.prisma.officeBranch.findMany({ ...query, select: officeBranchSelect }),
            db_js_1.prisma.officeBranch.count({ where: query.where }),
        ]);
        return { officeBranches, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    }
    findById(id) {
        return db_js_1.prisma.officeBranch.findUnique({ where: { id }, select: officeBranchSelect });
    }
    async create(data, actor) {
        try {
            if (data.isHead) {
                return await db_js_1.prisma.$transaction(async (tx) => {
                    await tx.$executeRaw `SELECT pg_advisory_xact_lock(hashtext('office_branch_head'))`;
                    const existingHead = await tx.officeBranch.findFirst({ where: { isHead: true }, select: { id: true } });
                    if (existingHead)
                        throw new httpError_js_1.HttpError('A head office branch already exists', 409);
                    const created = await tx.officeBranch.create({ data, select: officeBranchSelect });
                    await (0, audit_js_1.recordAudit)(tx, {
                        module: 'reference',
                        entityType: 'OFFICE_BRANCH',
                        entityId: created.id,
                        version: auditVersion(created),
                        action: 'CREATE',
                        before: null,
                        after: created,
                        actor,
                    });
                    return created;
                });
            }
            const created = await db_js_1.prisma.$transaction(async (tx) => {
                const row = await tx.officeBranch.create({ data, select: officeBranchSelect });
                await (0, audit_js_1.recordAudit)(tx, {
                    module: 'reference',
                    entityType: 'OFFICE_BRANCH',
                    entityId: row.id,
                    version: auditVersion(row),
                    action: 'CREATE',
                    before: null,
                    after: row,
                    actor,
                });
                return row;
            });
            return created;
        }
        catch (error) {
            return throwHeadConflict(error);
        }
    }
    async update(id, data, actor) {
        try {
            if (data.isHead) {
                return await db_js_1.prisma.$transaction(async (tx) => {
                    await tx.$executeRaw `SELECT pg_advisory_xact_lock(hashtext('office_branch_head'))`;
                    const existingHead = await tx.officeBranch.findFirst({
                        where: { isHead: true, id: { not: id } },
                        select: { id: true },
                    });
                    if (existingHead)
                        throw new httpError_js_1.HttpError('A head office branch already exists', 409);
                    const before = await tx.officeBranch.findUniqueOrThrow({ where: { id }, select: officeBranchSelect });
                    const updated = await tx.officeBranch.update({ where: { id }, data, select: officeBranchSelect });
                    await (0, audit_js_1.recordAudit)(tx, {
                        module: 'reference',
                        entityType: 'OFFICE_BRANCH',
                        entityId: updated.id,
                        version: auditVersion(updated),
                        action: 'UPDATE',
                        before,
                        after: updated,
                        actor,
                    });
                    return updated;
                });
            }
            const updated = await db_js_1.prisma.$transaction(async (tx) => {
                const before = await tx.officeBranch.findUniqueOrThrow({ where: { id }, select: officeBranchSelect });
                const row = await tx.officeBranch.update({ where: { id }, data, select: officeBranchSelect });
                await (0, audit_js_1.recordAudit)(tx, {
                    module: 'reference',
                    entityType: 'OFFICE_BRANCH',
                    entityId: row.id,
                    version: auditVersion(row),
                    action: 'UPDATE',
                    before,
                    after: row,
                    actor,
                });
                return row;
            });
            return updated;
        }
        catch (error) {
            return throwHeadConflict(error);
        }
    }
}
exports.officeBranchRepository = new OfficeBranchRepository();
//# sourceMappingURL=office-branch.repository.js.map