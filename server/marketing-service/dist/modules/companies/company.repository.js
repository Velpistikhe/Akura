"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRepository = void 0;
const normalizeName_js_1 = require("../../utils/normalizeName.js");
const companyAudit_js_1 = require("../../utils/companyAudit.js");
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
const dateOnly_js_1 = require("../../utils/dateOnly.js");
const select = {
    createdById: true, updatedById: true,
    id: true, npwp: true, officeBranchId: true, name: true, normalizeName: true, type: true, address: true,
    isSisterCompany: true, revoked: true, version: true, createdAt: true, updatedAt: true,
    _count: { select: { staffs: { where: { revoked: false } } } },
};
const selectWithContract = () => ({
    ...select,
    contracts: {
        where: {
            status: 'APPROVED',
            effectiveFrom: { lte: new Date() },
            effectiveUntil: { gt: new Date() },
        },
        orderBy: { effectiveFrom: 'asc' },
        take: 1,
        include: { _count: { select: { prices: true } } },
    },
});
const withCurrentContract = ({ contracts, ...company }) => ({
    ...company,
    contract: company.revoked || !contracts[0] ? null : (() => {
        const { _count, ...contract } = contracts[0];
        return (0, dateOnly_js_1.formatContractDates)({ ...contract, hasList: _count.prices > 0 });
    })(),
});
const saveHistory = async (tx, companyId, actor, action) => {
    const company = await tx.company.findUniqueOrThrow({ where: { id: companyId } });
    await tx.companyHistory.create({ data: {
            companyId, version: company.version, action, snapshot: JSON.parse(JSON.stringify(company)), createdById: actor.id, createdByName: actor.name,
        } });
};
exports.companyRepository = {
    async list(input, officeBranchId) {
        const query = (0, listQuery_js_1.buildListQuery)(input, {
            filters: {
                isSisterCompany: (isSisterCompany) => ({ isSisterCompany }),
                search: (search) => ({ OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { type: { in: Object.values(client_1.CompanyType).filter((type) => type.toLowerCase().includes(search.toLowerCase())) } },
                        { address: { contains: search, mode: 'insensitive' } },
                    ] }),
            },
            defaultSort: { createdAt: 'desc' },
            sorts: (0, listQuery_js_1.defineSortRules)({
                name: (direction) => ({ name: direction }), type: (direction) => ({ type: direction }),
                address: (direction) => ({ address: direction }), isSisterCompany: (direction) => ({ isSisterCompany: direction }),
                version: (direction) => ({ version: direction }), updatedAt: (direction) => ({ updatedAt: direction }),
            }),
        });
        const where = { AND: [{ officeBranchId, revoked: false }, query.where] };
        const [companies, total] = await Promise.all([
            db_js_1.prisma.company.findMany({ ...query, where, select: selectWithContract() }),
            db_js_1.prisma.company.count({ where }),
        ]);
        return { companies: companies.map(withCurrentContract), pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    },
    findById: (id, officeBranchId) => db_js_1.prisma.company.findFirst({
        where: { id, officeBranchId, revoked: false }, select: selectWithContract(),
    }).then(company => company ? withCurrentContract(company) : null),
    findByNormalizeName: (normalizeName, officeBranchId, excludeId) => db_js_1.prisma.company.findFirst({
        where: { normalizeName, officeBranchId, revoked: false, ...(excludeId && { id: { not: excludeId } }) },
        select: { id: true },
    }),
    async create(data, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, data.officeBranchId);
            const duplicate = await tx.company.findFirst({ where: { normalizeName: data.normalizeName, officeBranchId: data.officeBranchId, revoked: false } });
            if (duplicate)
                throw new httpError_js_1.HttpError('Company name already exists', 409);
            const created = await tx.company.create({ data: { ...data, createdById: actor.id, version: 0 }, select });
            await saveHistory(tx, created.id, actor, 'CREATE');
            return { ...created, contract: null };
        });
    },
    async update(id, officeBranchId, data, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const current = await tx.company.findFirst({ where: { id, officeBranchId } });
            if (!current)
                throw new httpError_js_1.HttpError('Company not found', 404);
            if (current.revoked)
                throw new httpError_js_1.HttpError('Company is already revoked', 409);
            (0, companyAudit_js_1.requireCurrentVersion)(current, data.version);
            const normalized = (0, normalizeName_js_1.normalizeName)(data.name ?? current.name);
            if (await tx.company.findFirst({ where: { normalizeName: normalized, officeBranchId, revoked: false, id: { not: id } } })) {
                throw new httpError_js_1.HttpError('Company name already exists', 409);
            }
            const { version, ...changes } = data;
            await tx.company.update({ where: { id, version, revoked: false }, data: {
                    ...changes, normalizeName: normalized, version: { increment: 1 }, updatedById: actor.id,
                } });
            await saveHistory(tx, id, actor, 'UPDATE');
            return withCurrentContract(await tx.company.findUniqueOrThrow({ where: { id }, select: selectWithContract() }));
        });
    },
    history: (id, officeBranchId, input) => db_js_1.prisma.$transaction(async (tx) => {
        if (!await tx.company.findFirst({ where: { id, officeBranchId }, select: { id: true } }))
            throw new httpError_js_1.HttpError('Company not found', 404);
        const where = { companyId: id };
        const history = await tx.companyHistory.findMany({ where, orderBy: { version: 'desc' }, skip: (input.page - 1) * input.limit, take: input.limit });
        const total = await tx.companyHistory.count({ where });
        return { companyId: id, history, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    }, { isolationLevel: 'RepeatableRead' }),
    staffHistory: (id, officeBranchId, input) => db_js_1.prisma.$transaction(async (tx) => {
        if (!await tx.company.findFirst({ where: { id, officeBranchId }, select: { id: true } }))
            throw new httpError_js_1.HttpError('Company not found', 404);
        const where = { companyStaff: { companyId: id } };
        const history = await tx.companyStaffHistory.findMany({
            where,
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            skip: (input.page - 1) * input.limit,
            take: input.limit,
        });
        const total = await tx.companyStaffHistory.count({ where });
        return { companyId: id, history, pagination: (0, listQuery_js_1.buildPagination)(input.page, input.limit, total) };
    }, { isolationLevel: 'RepeatableRead' }),
    revoke(id, officeBranchId, version, actor) {
        return db_js_1.prisma.$transaction(async (tx) => {
            await (0, companyAudit_js_1.lockCompanyBranch)(tx, officeBranchId);
            const current = await tx.company.findFirst({
                where: { id, officeBranchId }, include: { staffs: { where: { revoked: false } } },
            });
            if (!current)
                throw new httpError_js_1.HttpError('Company not found', 404);
            (0, companyAudit_js_1.requireCurrentVersion)(current, version);
            const openContract = await tx.companyContract.findFirst({
                where: { companyId: id, status: { in: ['DRAFT', 'APPROVED'] } },
                select: { id: true, status: true },
            });
            if (openContract)
                throw new httpError_js_1.HttpError('Company cannot be deleted while it has a draft or approved contract', 409);
            for (const staff of current.staffs) {
                await tx.companyStaff.update({
                    where: { id: staff.id }, data: { revoked: true, version: { increment: 1 }, updatedById: actor.id },
                });
                await (0, companyAudit_js_1.saveCompanyStaffHistory)(tx, staff.id, actor, 'DEACTIVATE');
            }
            const updated = await tx.company.update({
                where: { id, officeBranchId, version, revoked: false },
                data: { revoked: true, version: { increment: 1 }, updatedById: actor.id }, select,
            });
            await saveHistory(tx, id, actor, 'DEACTIVATE');
            return { ...updated, contract: null };
        });
    },
};
//# sourceMappingURL=company.repository.js.map