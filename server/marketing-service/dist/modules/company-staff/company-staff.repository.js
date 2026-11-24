"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyStaffRepository = void 0;
const companyAudit_js_1 = require("../../utils/companyAudit.js");
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
const select = {
    createdById: true, updatedById: true,
    id: true, companyId: true, name: true, normalizeName: true, title: true,
    telp: true, email: true, revoked: true, version: true, createdAt: true, updatedAt: true,
    company: { select: { id: true, name: true, type: true, version: true } },
};
const isUniqueError = (error) => (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
    && error.meta?.modelName === 'CompanyStaff');
exports.companyStaffRepository = {
    async list(input, officeBranchId) {
        const query = (0, listQuery_js_1.buildListQuery)(input, {
            filters: {
                companyId: (companyId) => ({ companyId }), title: (title) => ({ title }),
                search: (search) => ({ OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { telp: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                    ] }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                companyId: (direction) => ({ companyId: direction }), name: (direction) => ({ name: direction }),
                title: (direction) => ({ title: direction }), version: (direction) => ({ version: direction }),
                updatedAt: (direction) => ({ updatedAt: direction }),
            }),
        });
        const where = { AND: [{ revoked: false }, { company: { officeBranchId, revoked: false } }, query.where] };
        const [staffs, total] = await Promise.all([
            db_js_1.prisma.companyStaff.findMany({ ...query, where, select }),
            db_js_1.prisma.companyStaff.count({ where }),
        ]);
        return { staffs, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    },
    findById: (id, officeBranchId) => db_js_1.prisma.companyStaff.findFirst({
        where: { id, revoked: false, company: { officeBranchId, revoked: false } }, select,
    }),
    findByNormalizeName: (normalizeName, officeBranchId, excludeId) => db_js_1.prisma.companyStaff.findFirst({
        where: { normalizeName, revoked: false, company: { officeBranchId, revoked: false }, ...(excludeId && { id: { not: excludeId } }) },
        select: { id: true },
    }),
    async create(data, officeBranchId, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const parent = await tx.company.findFirst({ where: { id: data.companyId, officeBranchId, revoked: false } });
            if (!parent)
                throw new httpError_js_1.HttpError('Company not found or inactive', 404);
            const duplicate = await tx.companyStaff.findFirst({ where: { normalizeName: data.normalizeName, revoked: false, company: { officeBranchId, revoked: false } } });
            if (duplicate)
                throw new httpError_js_1.HttpError('Company staff name already exists', 409);
            const created = await tx.companyStaff.create({ data: { ...data, createdById: actor.id, version: 0 }, select });
            await (0, companyAudit_js_1.saveCompanyStaffHistory)(tx, created.id, actor, 'CREATE');
            return created;
        });
    },
    async update(id, officeBranchId, data, actor) {
        try {
            return await db_js_1.prisma.$transaction(async (tx) => {
                await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
                const current = await tx.companyStaff.findFirst({ where: { id, company: { officeBranchId } }, select });
                if (!current)
                    throw new httpError_js_1.HttpError('Company staff not found', 404);
                (0, companyAudit_js_1.requireCurrentVersion)(current, data.version);
                const parent = await tx.company.findFirst({ where: { id: current.companyId, officeBranchId, revoked: false } });
                if (!parent)
                    throw new httpError_js_1.HttpError('Company not found or inactive', 409);
                const duplicate = await tx.companyStaff.findFirst({
                    where: { id: { not: id }, normalizeName: data.normalizeName ?? current.normalizeName, revoked: false, company: { officeBranchId, revoked: false } },
                });
                if (duplicate)
                    throw new httpError_js_1.HttpError('Company staff name already exists', 409);
                const { version, ...changes } = data;
                const updated = await tx.companyStaff.update({
                    where: { id, version, revoked: false },
                    data: { ...changes, version: { increment: 1 }, updatedById: actor.id }, select,
                });
                await (0, companyAudit_js_1.saveCompanyStaffHistory)(tx, id, actor, 'UPDATE');
                return updated;
            });
        }
        catch (error) {
            if (isUniqueError(error))
                throw new httpError_js_1.HttpError('Company staff name already exists', 409);
            throw error;
        }
    },
    history: (id, officeBranchId, input) => db_js_1.prisma.$transaction(async (tx) => {
        if (!await tx.companyStaff.findFirst({ where: { id, company: { officeBranchId } }, select: { id: true } })) {
            throw new httpError_js_1.HttpError('Company staff not found', 404);
        }
        const where = { companyStaffId: id };
        const history = await tx.companyStaffHistory.findMany({ where, orderBy: { version: 'desc' }, skip: (input.page - 1) * input.limit, take: input.limit });
        const total = await tx.companyStaffHistory.count({ where });
        return { companyStaffId: id, history, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    }, { isolationLevel: 'RepeatableRead' }),
    revoke(id, officeBranchId, version, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const current = await tx.companyStaff.findFirst({ where: { id, company: { officeBranchId } }, select });
            if (!current)
                throw new httpError_js_1.HttpError('Company staff not found', 404);
            (0, companyAudit_js_1.requireCurrentVersion)(current, version);
            const updated = await tx.companyStaff.update({
                where: { id, version, revoked: false },
                data: { revoked: true, version: { increment: 1 }, updatedById: actor.id }, select,
            });
            await (0, companyAudit_js_1.saveCompanyStaffHistory)(tx, id, actor, 'DEACTIVATE');
            return updated;
        });
    },
};
//# sourceMappingURL=company-staff.repository.js.map