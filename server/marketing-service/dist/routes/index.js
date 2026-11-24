"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = require("../config/db.js");
const officeBranch_js_1 = require("../utils/officeBranch.js");
const contract_schemas_js_1 = require("../modules/contracts/contract.schemas.js");
const item_schemas_js_1 = require("../modules/items/item.schemas.js");
const quotation_service_groups_js_1 = require("../modules/quotations/quotation-service-groups.js");
const company_schemas_js_1 = require("../modules/companies/company.schemas.js");
const contract_repository_js_1 = require("../modules/contracts/contract.repository.js");
const httpError_js_1 = require("../utils/httpError.js");
const validate_middleware_js_1 = require("../middlewares/validate.middleware.js");
const quotation_schemas_js_1 = require("../modules/quotations/quotation.schemas.js");
const quotation_controller_js_1 = require("../modules/quotations/quotation.controller.js");
const express_1 = require("express");
const company_routes_js_1 = __importDefault(require("../modules/companies/company.routes.js"));
const company_staff_routes_js_1 = __importDefault(require("../modules/company-staff/company-staff.routes.js"));
const service_routes_js_1 = __importDefault(require("../modules/services/service.routes.js"));
const item_routes_js_1 = __importDefault(require("../modules/items/item.routes.js"));
const contract_routes_js_1 = __importDefault(require("../modules/contracts/contract.routes.js"));
const quotation_routes_js_1 = __importDefault(require("../modules/quotations/quotation.routes.js"));
const contract_price_history_routes_js_1 = __importDefault(require("../modules/contract-prices/contract-price-history.routes.js"));
const authorize_middleware_js_1 = require("../middlewares/authorize.middleware.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
const router = (0, express_1.Router)();
router.get('/company-contract-references/:companyId', (0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireQuotationReferenceAccess), (0, validate_middleware_js_1.validate)('params', company_schemas_js_1.companyIdSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const contract = await contract_repository_js_1.contractRepository.resolveCompanyReference(res.locals.params.companyId, (0, officeBranch_js_1.getOfficeBranchId)(res));
    res.json({ status: 200, success: true, data: contract, requestId: req.headers['x-request-id'] });
}));
router.get('/quotation-references/:quotationId', (0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireQuotationReferenceAccess), (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.getReference));
router.get('/item-size-references/:itemSizeId', (0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireQuotationReferenceAccess), (0, validate_middleware_js_1.validate)('params', item_schemas_js_1.itemSizeIdSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
    const size = await db_js_1.prisma.itemSize.findFirst({
        where: { id: res.locals.params.itemSizeId, item: { officeBranchId: branch } },
        include: quotation_service_groups_js_1.itemScopeInclude,
    });
    if (!size)
        throw new httpError_js_1.HttpError('Item size not found', 404);
    if (!size.isActive || !size.item.isActive)
        throw new httpError_js_1.HttpError('Item size is inactive', 409);
    const service = size.item.service;
    if (service && (!service.isActive || service.officeBranchId !== branch))
        throw new httpError_js_1.HttpError('Item size is inactive', 409);
    const scopes = (0, quotation_service_groups_js_1.itemScopeSnapshot)(size.item);
    res.json({ status: 200, success: true, message: 'Item size reference retrieved successfully', data: {
            itemSizeId: size.id, serviceName: service?.name ?? size.item.name,
            inspectionScope: scopes.inspectionScopes, maintenanceScope: scopes.maintenanceScopes,
            itemName: size.item.name, size: size.size,
        }, requestId: req.headers['x-request-id'] });
}));
router.get('/contract-references/:contractId', (0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireQuotationReferenceAccess), (0, validate_middleware_js_1.validate)('params', contract_schemas_js_1.contractIdSchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const contract = await db_js_1.prisma.companyContract.findFirst({ where: { id: res.locals.params.contractId, company: { officeBranchId: (0, officeBranch_js_1.getOfficeBranchId)(res), revoked: false } },
        include: { company: true, prices: { where: { isActive: true } } } });
    if (!contract)
        throw new httpError_js_1.HttpError('Contract not found', 404);
    res.json({ status: 200, success: true, data: contract, requestId: req.headers['x-request-id'] });
}));
router.use((0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireMarketingAccess));
router.use('/companies', company_routes_js_1.default);
router.use('/company-staffs', company_staff_routes_js_1.default);
router.use('/services', service_routes_js_1.default);
router.use('/items', item_routes_js_1.default);
router.use('/company-contracts', contract_routes_js_1.default);
router.use('/company-contract-prices', contract_price_history_routes_js_1.default);
router.use('/quotations', quotation_routes_js_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map