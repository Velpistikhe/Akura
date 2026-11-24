"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyService = void 0;
const httpError_js_1 = require("../../utils/httpError.js");
const normalizeName_js_1 = require("../../utils/normalizeName.js");
const company_repository_js_1 = require("./company.repository.js");
exports.companyService = {
    list: (input, officeBranchId) => company_repository_js_1.companyRepository.list(input, officeBranchId),
    async get(id, officeBranchId) {
        const company = await company_repository_js_1.companyRepository.findById(id, officeBranchId);
        if (!company)
            throw new httpError_js_1.HttpError('Company not found', 404);
        return company;
    },
    async create(data, officeBranchId, actor) {
        const normalized = (0, normalizeName_js_1.normalizeName)(data.name);
        if (await company_repository_js_1.companyRepository.findByNormalizeName(normalized, officeBranchId))
            throw new httpError_js_1.HttpError('Company name already exists', 409);
        return company_repository_js_1.companyRepository.create({ ...data, normalizeName: normalized, officeBranchId }, actor);
    },
    async update(id, data, officeBranchId, actor) {
        return company_repository_js_1.companyRepository.update(id, officeBranchId, data, actor);
    },
};
//# sourceMappingURL=company.service.js.map