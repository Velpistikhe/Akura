"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemService = exports.itemList = void 0;
const db_js_1 = require("../../config/db.js");
const httpError_js_1 = require("../../utils/httpError.js");
const item_repository_js_1 = require("./item.repository.js");
const itemList = (query, officeBranchId) => item_repository_js_1.itemRepository.list(query, officeBranchId);
exports.itemList = itemList;
exports.itemService = {
    create: (data, officeBranchId, actor) => item_repository_js_1.itemRepository.create(data, officeBranchId, actor),
    addSize: (data, officeBranchId, actor) => item_repository_js_1.itemRepository.addSize(data, officeBranchId, actor),
    addInspectionScopes: (id, data, officeBranchId) => item_repository_js_1.itemRepository.addInspectionScopes(id, data, officeBranchId),
    async listSizes(data, officeBranchId) {
        await this.validateSizeListItem(data, officeBranchId);
        return item_repository_js_1.itemRepository.listSizes(data, officeBranchId);
    },
    async listContractSizes(data, officeBranchId) {
        const company = await db_js_1.prisma.company.findFirst({
            where: { id: data.companyId, officeBranchId, revoked: false }, select: { id: true },
        });
        if (!company)
            throw new httpError_js_1.HttpError('Company not found', 404);
        await this.validateSizeListItem(data, officeBranchId);
        return item_repository_js_1.itemRepository.listSizes(data, officeBranchId, data.companyId);
    },
    async validateSizeListItem(data, officeBranchId) {
        if (data.itemId) {
            const item = await db_js_1.prisma.item.findFirst({
                where: { id: data.itemId, officeBranchId, isActive: true },
                select: { id: true },
            });
            if (!item)
                throw new httpError_js_1.HttpError('Item not found', 404);
        }
    },
    async get(id, officeBranchId) {
        const item = await item_repository_js_1.itemRepository.findActive(id, officeBranchId);
        if (!item)
            throw new httpError_js_1.HttpError('Item not found', 404);
        return item;
    },
    async removeSize(id, officeBranchId, actor, version) {
        return item_repository_js_1.itemRepository.removeSize(id, officeBranchId, actor, version);
    },
    remove: (id, officeBranchId, actor, version) => item_repository_js_1.itemRepository.remove(id, officeBranchId, actor, version),
};
//# sourceMappingURL=item.service.js.map