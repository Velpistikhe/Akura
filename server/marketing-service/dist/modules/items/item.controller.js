"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemController = exports.listItems = void 0;
const item_service_js_1 = require("./item.service.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const send = (req, res, status, data) => {
    res.status(status).json({ status, success: true, data, requestId: req.headers['x-request-id'] });
};
const listItems = async (req, res) => {
    send(req, res, 200, await (0, item_service_js_1.itemList)(res.locals.query, (0, officeBranch_js_1.getOfficeBranchId)(res)));
};
exports.listItems = listItems;
exports.itemController = {
    create: async (req, res) => {
        send(req, res, 201, await item_service_js_1.itemService.create(res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    addSize: async (req, res) => {
        send(req, res, 201, await item_service_js_1.itemService.addSize(res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    addInspectionScopes: async (req, res) => {
        send(req, res, 201, await item_service_js_1.itemService.addInspectionScopes(res.locals.params.itemId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res)));
    },
    listSizes: async (req, res) => {
        send(req, res, 200, await item_service_js_1.itemService.listSizes(res.locals.query, (0, officeBranch_js_1.getOfficeBranchId)(res)));
    },
    listContractSizes: async (req, res) => {
        send(req, res, 200, await item_service_js_1.itemService.listContractSizes(res.locals.query, (0, officeBranch_js_1.getOfficeBranchId)(res)));
    },
    removeSize: async (req, res) => {
        send(req, res, 200, await item_service_js_1.itemService.removeSize(res.locals.params.itemSizeId, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res), res.locals.body.version));
    },
    get: async (req, res) => {
        send(req, res, 200, await item_service_js_1.itemService.get(res.locals.params.itemId, (0, officeBranch_js_1.getOfficeBranchId)(res)));
    },
    remove: async (req, res) => {
        send(req, res, 200, await item_service_js_1.itemService.remove(res.locals.params.itemId, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res), res.locals.body.version));
    },
};
//# sourceMappingURL=item.controller.js.map