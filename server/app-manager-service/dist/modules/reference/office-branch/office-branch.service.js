"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.officeBranchService = void 0;
const httpError_js_1 = require("../../../utils/httpError.js");
const audit_js_1 = require("../../../utils/audit.js");
const office_branch_repository_js_1 = require("./office-branch.repository.js");
class OfficeBranchService {
    listOptions() {
        return office_branch_repository_js_1.officeBranchRepository.listOptions();
    }
    list(input) {
        return office_branch_repository_js_1.officeBranchRepository.list(input);
    }
    async get(id) {
        const officeBranch = await office_branch_repository_js_1.officeBranchRepository.findById(id);
        if (!officeBranch)
            throw new httpError_js_1.HttpError('Office branch not found', 404);
        return officeBranch;
    }
    async create(data, res) {
        return office_branch_repository_js_1.officeBranchRepository.create(data, (0, audit_js_1.getAuditActor)(res));
    }
    async update(id, data, res) {
        if (!await office_branch_repository_js_1.officeBranchRepository.findById(id))
            throw new httpError_js_1.HttpError('Office branch not found', 404);
        return office_branch_repository_js_1.officeBranchRepository.update(id, data, (0, audit_js_1.getAuditActor)(res));
    }
}
exports.officeBranchService = new OfficeBranchService();
//# sourceMappingURL=office-branch.service.js.map