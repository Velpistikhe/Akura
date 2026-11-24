"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_js_1 = require("../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const contract_price_history_repository_js_1 = require("./contract-price-history.repository.js");
const contract_price_history_schemas_js_1 = require("./contract-price-history.schemas.js");
const router = (0, express_1.Router)();
router.get('/', (0, validate_middleware_js_1.validate)('query', contract_price_history_schemas_js_1.listContractPricesSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const data = await contract_price_history_repository_js_1.contractPriceHistoryRepository.listPrices({ ...(0, officeBranch_js_1.restrictListVisibility)(res, res.locals.query), isActive: true }, (0, officeBranch_js_1.getOfficeBranchId)(res));
    res.status(200).json({ status: 200, success: true, data, requestId: req.headers['x-request-id'] });
}));
router.get('/:contractPriceId/history', (0, validate_middleware_js_1.validate)('params', contract_price_history_schemas_js_1.contractPriceHistoryParamsSchema), (0, validate_middleware_js_1.validate)('query', contract_price_history_schemas_js_1.contractPriceHistoryQuerySchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const data = await contract_price_history_repository_js_1.contractPriceHistoryRepository.list(res.locals.params.contractPriceId, res.locals.query, (0, officeBranch_js_1.getOfficeBranchId)(res));
    res.status(200).json({ status: 200, success: true, data, requestId: req.headers['x-request-id'] });
}));
exports.default = router;
//# sourceMappingURL=contract-price-history.routes.js.map