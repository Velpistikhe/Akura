"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractRepository = void 0;
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const companyAudit_js_1 = require("../../utils/companyAudit.js");
const catalogAudit_js_1 = require("../../utils/catalogAudit.js");
const businessDate_js_1 = require("../../utils/businessDate.js");
const contract_history_js_1 = require("./contract-history.js");
const dateOnly_js_1 = require("../../utils/dateOnly.js");
const company = async (tx, id, branch) => {
    const row = await tx.company.findFirst({ where: { id, officeBranchId: branch, revoked: false } });
    if (!row)
        throw new httpError_js_1.HttpError('Company not found', 404);
    return row;
};
const saveHistory = (tx, before, contract, actor, action) => (0, contract_history_js_1.recordContractHistory)(tx, before, contract, actor, action);
// Contract versions are checked with requireCatalogVersion below.
// A single advisory lock serializes all contract lifecycle writes for a branch.
exports.contractRepository = {
    resolveCompanyReference: (companyId, branch) => db_js_1.prisma.$transaction(async (tx) => {
        await company(tx, companyId, branch);
        const today = (0, businessDate_js_1.currentBusinessDate)();
        const contracts = await tx.companyContract.findMany({
            where: { companyId, status: 'APPROVED', effectiveFrom: { lte: today }, effectiveUntil: { gt: today },
                company: { officeBranchId: branch, revoked: false } },
            include: { company: true, prices: { where: { isActive: true } } },
            take: 2,
        });
        if (!contracts.length)
            throw new httpError_js_1.HttpError('Company has no APPROVED contract within its effective period', 409);
        if (contracts.length !== 1)
            throw new httpError_js_1.HttpError('Company has multiple effective contracts; resolve the conflict before creating a work order', 409);
        return contracts[0];
    }, { isolationLevel: 'RepeatableRead' }),
    list: async (input, branch) => db_js_1.prisma.$transaction(async (tx) => {
        if (input.companyId)
            await company(tx, input.companyId, branch);
        const where = { ...(input.companyId ? { companyId: input.companyId } : {}), isDeleted: false, status: input.status, company: { officeBranchId: branch, revoked: false } };
        const contracts = await tx.companyContract.findMany({ where, orderBy: [{ effectiveFrom: 'desc' }, { id: 'asc' }], skip: (input.page - 1) * input.limit, take: input.limit, include: { _count: { select: { prices: true } } } });
        const total = await tx.companyContract.count({ where });
        return { contracts: contracts.map(({ _count, ...contract }) => (0, dateOnly_js_1.formatContractDates)({ ...contract, hasList: _count.prices > 0 })), pagination: { page: input.page, limit: input.limit, total, totalPages: Math.ceil(total / input.limit) } };
    }, { isolationLevel: 'RepeatableRead' }),
    history: async (id, branch, input) => {
        const contract = await db_js_1.prisma.companyContract.findFirst({
            where: { id, company: { officeBranchId: branch, revoked: false } },
            select: { id: true },
        });
        if (!contract)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        const where = { companyContractId: id };
        const [history, total] = await db_js_1.prisma.$transaction([
            db_js_1.prisma.companyContractHistory.findMany({ where, orderBy: [{ version: 'desc' }, { createdAt: 'desc' }], skip: (input.page - 1) * input.limit, take: input.limit }),
            db_js_1.prisma.companyContractHistory.count({ where }),
        ], { isolationLevel: 'RepeatableRead' });
        return {
            contractId: id,
            history,
            pagination: { page: input.page, limit: input.limit, total, totalPages: Math.ceil(total / input.limit) },
        };
    },
    get: async (id, branch) => {
        const contract = await db_js_1.prisma.companyContract.findFirst({ where: { id, company: { officeBranchId: branch, revoked: false } }, include: { _count: { select: { prices: true } } } });
        if (!contract)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        const { _count, ...data } = contract;
        return (0, dateOnly_js_1.formatContractDates)({ ...data, hasList: _count.prices > 0 });
    },
    create: (data, branch, actor, _isAdmin) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const owner = await company(tx, data.companyId, branch);
        const existing = await tx.companyContract.findFirst({ where: { companyId: data.companyId, isDeleted: false, status: { in: ['DRAFT', 'REJECTED'] } } });
        if (existing)
            throw new httpError_js_1.HttpError('The company already has a draft or approved contract', 409);
        const row = await tx.companyContract.create({ data: { ...data, status: 'DRAFT', companySnapshot: JSON.parse(JSON.stringify(owner)), createdById: actor.id } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', null, row, actor, 'CREATE');
        await saveHistory(tx, null, row, actor, 'CREATE');
        return row;
    }),
    submit: (id, version, branch, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const before = await tx.companyContract.findFirst({ where: { id, isDeleted: false, company: { officeBranchId: branch, revoked: false } } });
        if (!before)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        (0, catalogAudit_js_1.requireCatalogVersion)(before, version);
        if (before.status !== 'DRAFT' && before.status !== 'REJECTED')
            throw new httpError_js_1.HttpError('Only DRAFT or REJECTED contracts can be submitted', 409);
        const contractPrice = await tx.companyContractPrice.findFirst({ where: { contractId: before.id, isActive: true }, select: { id: true } });
        if (!contractPrice)
            throw new httpError_js_1.HttpError('At least one active contract item price is required before submission', 409);
        const after = await tx.companyContract.update({ where: { id, version }, data: { status: 'SUBMITTED', version: { increment: 1 }, updatedById: actor.id } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', before, after, actor, 'SUBMIT');
        await saveHistory(tx, before, after, actor, 'SUBMIT');
        return after;
    }),
    reject: (id, version, branch, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const before = await tx.companyContract.findFirst({ where: { id, isDeleted: false, company: { officeBranchId: branch, revoked: false } } });
        if (!before)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        (0, catalogAudit_js_1.requireCatalogVersion)(before, version);
        if (before.status !== 'SUBMITTED')
            throw new httpError_js_1.HttpError('Only SUBMITTED contracts can be rejected', 409);
        const after = await tx.companyContract.update({ where: { id, version }, data: { status: 'REJECTED', version: { increment: 1 }, updatedById: actor.id } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', before, after, actor, 'REJECT');
        await saveHistory(tx, before, after, actor, 'REJECT');
        return after;
    }),
    approve: (id, version, branch, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const before = await tx.companyContract.findFirst({ where: { id, isDeleted: false, company: { officeBranchId: branch, revoked: false } } });
        if (!before)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        (0, catalogAudit_js_1.requireCatalogVersion)(before, version);
        if (before.status !== 'SUBMITTED')
            throw new httpError_js_1.HttpError('Only SUBMITTED contracts can be approved', 409);
        if (before.effectiveUntil <= (0, businessDate_js_1.currentBusinessDate)())
            throw new httpError_js_1.HttpError('Expired contracts cannot be approved', 409);
        const excludedContractIds = [id, before.revisionOfId].filter((value) => Boolean(value));
        const conflict = await tx.companyContract.findFirst({ where: { companyId: before.companyId, id: { notIn: excludedContractIds }, status: 'APPROVED', effectiveFrom: { lt: before.effectiveUntil }, effectiveUntil: { gt: before.effectiveFrom } } });
        if (conflict)
            throw new httpError_js_1.HttpError('Approved contract period overlaps another approved contract', 409);
        const after = await tx.companyContract.update({ where: { id, version }, data: { status: 'APPROVED', version: { increment: 1 }, updatedById: actor.id } });
        if (before.revisionOfId) {
            const old = await tx.companyContract.findUnique({ where: { id: before.revisionOfId } });
            if (!old || old.status !== 'APPROVED')
                throw new httpError_js_1.HttpError('The contract being revised is no longer APPROVED', 409);
            const today = (0, businessDate_js_1.currentBusinessDate)();
            const oldIsActive = old.effectiveFrom <= today && old.effectiveUntil > today;
            if (oldIsActive && before.effectiveFrom <= old.effectiveFrom)
                throw new httpError_js_1.HttpError('A revision of an active contract must start after the original contract start date', 409);
            if (old.effectiveFrom <= before.effectiveFrom) {
                const oldUntil = new Date(before.effectiveFrom);
                oldUntil.setUTCDate(oldUntil.getUTCDate() - 1);
                if (oldUntil < old.effectiveFrom || oldUntil >= old.effectiveUntil)
                    throw new httpError_js_1.HttpError('The revision period cannot replace the original contract period', 409);
                const oldAfter = await tx.companyContract.update({ where: { id: old.id, version: old.version }, data: { status: 'REVISED', effectiveUntil: oldUntil, version: { increment: 1 }, updatedById: actor.id } });
                await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', old, oldAfter, actor, 'REVISED');
                await saveHistory(tx, old, oldAfter, actor, 'REVISED');
            }
            else {
                const oldAfter = await tx.companyContract.update({ where: { id: old.id, version: old.version }, data: { status: 'REVISED', effectiveUntil: old.effectiveFrom, version: { increment: 1 }, updatedById: actor.id } });
                await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', old, oldAfter, actor, 'REVISED');
                await saveHistory(tx, old, oldAfter, actor, 'REVISED');
            }
        }
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', before, after, actor, 'APPROVE');
        await saveHistory(tx, before, after, actor, 'APPROVE');
        return after;
    }),
    update: (id, data, branch, actor, isAdmin = true) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const before = await tx.companyContract.findFirst({ where: { id, company: { officeBranchId: branch, revoked: false } } });
        if (!before)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        (0, catalogAudit_js_1.requireCatalogVersion)(before, data.version);
        if (before.status === 'APPROVED' && !isAdmin)
            throw new httpError_js_1.HttpError('Only marketing admin can update approved contracts', 403);
        if (!['DRAFT', 'REJECTED', 'APPROVED'].includes(before.status))
            throw new httpError_js_1.HttpError('Contract status cannot be updated', 409);
        if (before.status === 'REJECTED') {
            // Rejected corrections must re-enter the submit workflow.
        }
        if (before.status === 'APPROVED') {
            const conflict = await tx.companyContract.findFirst({ where: { companyId: before.companyId, id: { not: id }, status: { in: ['APPROVED', 'REVISED', 'TERMINATED'] }, effectiveFrom: { lt: data.effectiveUntil }, effectiveUntil: { gt: data.effectiveFrom } } });
            if (conflict)
                throw new httpError_js_1.HttpError('Contract period overlaps another contract', 409);
        }
        const after = await tx.companyContract.update({ where: { id, version: data.version }, data: {
                status: before.status === 'REJECTED' ? 'DRAFT' : undefined,
                contractNumber: data.contractNumber, contractDate: data.contractDate,
                effectiveFrom: data.effectiveFrom, effectiveUntil: data.effectiveUntil,
                updatedById: actor.id, version: { increment: 1 },
            } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', before, after, actor, 'UPDATE');
        await saveHistory(tx, before, after, actor, 'UPDATE');
        return after;
    }),
    revise: (id, data, branch, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const before = await tx.companyContract.findFirst({ where: { id, company: { officeBranchId: branch, revoked: false } } });
        if (!before)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        (0, catalogAudit_js_1.requireCatalogVersion)(before, data.version);
        if (before.status !== 'APPROVED')
            throw new httpError_js_1.HttpError('Only APPROVED contracts can be revised', 409);
        const existingRevision = await tx.companyContract.findFirst({ where: { revisionOfId: before.id, isDeleted: false, status: { in: ['DRAFT', 'SUBMITTED', 'REJECTED'] } } });
        if (existingRevision)
            throw new httpError_js_1.HttpError('The contract already has a DRAFT revision', 409);
        const row = await tx.companyContract.create({ data: {
                companyId: before.companyId, contractNumber: data.contractNumber, contractDate: data.contractDate,
                effectiveFrom: data.effectiveFrom, effectiveUntil: data.effectiveUntil, status: 'DRAFT',
                companySnapshot: before.companySnapshot ?? client_1.Prisma.DbNull, revisionOfId: before.id, createdById: actor.id,
            } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', null, row, actor, 'REVISE');
        await saveHistory(tx, null, row, actor, 'REVISE');
        return row;
    }),
    terminate: (id, version, terminatedAt, branch, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const before = await tx.companyContract.findFirst({ where: { id, company: { officeBranchId: branch, revoked: false } } });
        if (!before)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        (0, catalogAudit_js_1.requireCatalogVersion)(before, version);
        if (before.status !== 'APPROVED')
            throw new httpError_js_1.HttpError('Only approved contracts can be terminated', 409);
        if (terminatedAt < before.effectiveFrom || terminatedAt > before.effectiveUntil)
            throw new httpError_js_1.HttpError('terminatedAt must be within the contract period', 400);
        const after = await tx.companyContract.update({ where: { id, version }, data: { status: 'TERMINATED', effectiveUntil: terminatedAt, version: { increment: 1 }, updatedById: actor.id } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', before, after, actor, 'DEACTIVATE');
        await saveHistory(tx, before, after, actor, 'TERMINATE');
        return after;
    }),
    delete: (id, version, branch, actor) => db_js_1.prisma.$transaction(async (tx) => {
        await (0, companyAudit_js_1.lockCompanyBranch)(tx, branch);
        const before = await tx.companyContract.findFirst({ where: { id, company: { officeBranchId: branch, revoked: false } } });
        if (!before)
            throw new httpError_js_1.HttpError('Company contract not found', 404);
        (0, catalogAudit_js_1.requireCatalogVersion)(before, version);
        if (before.status !== 'DRAFT' && before.status !== 'REJECTED')
            throw new httpError_js_1.HttpError('Only DRAFT or REJECTED contracts can be deleted', 409);
        if (before.isDeleted)
            throw new httpError_js_1.HttpError('Company contract is already deleted', 409);
        const after = await tx.companyContract.update({ where: { id, version }, data: { isDeleted: true, version: { increment: 1 }, updatedById: actor.id } });
        await (0, catalogAudit_js_1.recordCatalogAuditWithPlatform)(tx, branch, 'COMPANY_CONTRACT', before, after, actor, 'DELETE');
        await saveHistory(tx, before, after, actor, 'DELETE');
        return after;
    }),
};
//# sourceMappingURL=contract.repository.js.map