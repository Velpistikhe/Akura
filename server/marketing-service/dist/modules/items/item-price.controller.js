"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemPriceController = void 0;
const db_js_1 = require("../../config/db.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const httpError_js_1 = require("../../utils/httpError.js");
const item_write_repository_js_1 = require("./item-write.repository.js");
const item_repository_js_1 = require("./item.repository.js");
const item_history_repository_js_1 = require("./item-history.repository.js");
const send = (req, res, data, status = 200) => {
    res.status(status).json({ status, success: true, data, requestId: req.headers['x-request-id'] });
};
exports.itemPriceController = {
    itemHistory: async (req, res) => { send(req, res, await item_history_repository_js_1.itemHistoryRepository.read('ITEM', res.locals.params.itemId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query)); },
    sizeHistory: async (req, res) => { send(req, res, await item_history_repository_js_1.itemHistoryRepository.read('ITEM_SIZE', res.locals.params.itemSizeId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query)); },
    priceHistory: async (req, res) => { send(req, res, await item_history_repository_js_1.itemHistoryRepository.read('ITEM_PRICE', res.locals.params.itemSizeId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query)); },
    resolvedPrices: async (req, res) => {
        const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
        send(req, res, await item_repository_js_1.itemRepository.listSizes(res.locals.query, branch, res.locals.query.companyId, true));
    },
    contractPriceOptions: async (req, res) => {
        const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
        send(req, res, await item_repository_js_1.itemRepository.listContractPriceOptions(res.locals.query, res.locals.params.contractId, branch));
    },
    updateItem: async (req, res) => { send(req, res, await item_write_repository_js_1.itemWriteRepository.updateItem(res.locals.params.itemId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    createPrice: async (req, res) => { send(req, res, await item_write_repository_js_1.itemWriteRepository.savePrice(res.locals.params.itemSizeId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res), true), 201); },
    updatePrice: async (req, res) => { send(req, res, await item_write_repository_js_1.itemWriteRepository.savePrice(res.locals.params.itemSizeId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    createContract: async (req, res) => { send(req, res, await item_write_repository_js_1.itemWriteRepository.createContract(res.locals.params.itemSizeId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)), 201); },
    updateContract: async (req, res) => { send(req, res, await item_write_repository_js_1.itemWriteRepository.changeContract(res.locals.params.contractPriceId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    removeContract: async (req, res) => { send(req, res, await item_write_repository_js_1.itemWriteRepository.changeContract(res.locals.params.contractPriceId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res), true)); },
    getSize: async (req, res) => {
        const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
        const size = await db_js_1.prisma.itemSize.findFirst({ where: { id: res.locals.params.itemSizeId, item: { officeBranchId: branch } }, include: { price: true, item: { include: { service: true } } } });
        if (!size)
            throw new httpError_js_1.HttpError('Item size not found', 404);
        send(req, res, size);
    },
};
//# sourceMappingURL=item-price.controller.js.map