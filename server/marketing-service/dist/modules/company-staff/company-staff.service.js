"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyStaffService = void 0;
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const normalizeName_js_1 = require("../../utils/normalizeName.js");
const company_staff_repository_js_1 = require("./company-staff.repository.js");
const ensureCompany = async (companyId, officeBranchId) => {
    if (!await db_js_1.prisma.company.findFirst({ where: { id: companyId, officeBranchId, revoked: false }, select: { id: true } }))
        throw new httpError_js_1.HttpError('Company not found', 404);
};
exports.companyStaffService = {
    history: (id, officeBranchId, input) => company_staff_repository_js_1.companyStaffRepository.history(id, officeBranchId, input),
    list: (input, officeBranchId) => company_staff_repository_js_1.companyStaffRepository.list(input, officeBranchId),
    async get(id, officeBranchId) {
        const staff = await company_staff_repository_js_1.companyStaffRepository.findById(id, officeBranchId);
        if (!staff)
            throw new httpError_js_1.HttpError('Company staff not found', 404);
        return staff;
    },
    async create(data, officeBranchId, actor) {
        await ensureCompany(data.companyId, officeBranchId);
        const normalized = (0, normalizeName_js_1.normalizeName)(data.name);
        if (await company_staff_repository_js_1.companyStaffRepository.findByNormalizeName(normalized, officeBranchId))
            throw new httpError_js_1.HttpError('Company staff name already exists', 409);
        return company_staff_repository_js_1.companyStaffRepository.create({ ...data, normalizeName: normalized }, officeBranchId, actor);
    },
    async update(id, data, officeBranchId, actor) {
        const normalized = data.name ? (0, normalizeName_js_1.normalizeName)(data.name) : undefined;
        if (normalized && await company_staff_repository_js_1.companyStaffRepository.findByNormalizeName(normalized, officeBranchId, id))
            throw new httpError_js_1.HttpError('Company staff name already exists', 409);
        return company_staff_repository_js_1.companyStaffRepository.update(id, officeBranchId, { ...data, ...(normalized && { normalizeName: normalized }) }, actor);
    },
    async delete(id, officeBranchId, version, actor) {
        return company_staff_repository_js_1.companyStaffRepository.revoke(id, officeBranchId, version, actor);
    },
};
//# sourceMappingURL=company-staff.service.js.map