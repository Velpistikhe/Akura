"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const express_1 = require("express");
const validate_middleware_js_1 = require("../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const quotation_controller_js_1 = require("./quotation.controller.js");
const quotation_schemas_js_1 = require("./quotation.schemas.js");
const httpError_js_1 = require("../../utils/httpError.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const quotation_repository_js_1 = require("./quotation.repository.js");
const requireMarketingSection = (_req, res, next) => {
    if (res.locals.authUser?.section !== 'MARKETING') {
        next(new httpError_js_1.HttpError('Marketing section is required', 403));
        return;
    }
    next();
};
const requireMarketingAdmin = (_req, res, next) => {
    const user = res.locals.authUser;
    if (user?.role !== 'ADMIN' || user.section !== 'MARKETING') {
        next(new httpError_js_1.HttpError('Marketing admin role is required', 403));
        return;
    }
    next();
};
const router = (0, express_1.Router)();
router.get('/:quotationId/pdf', (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.preview));
router.post('/:quotationId/approve', requireMarketingAdmin, (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.approveQuotationSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.approve));
router.post('/:quotationId/submit', requireMarketingSection, (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.submitQuotationSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.submit));
router.post('/:quotationId/reject', requireMarketingAdmin, (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.rejectQuotationSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.reject));
router.post('/:quotationId/revise', requireMarketingAdmin, (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.reviseQuotationSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.revise));
router.get('/:quotationId/history', (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, validate_middleware_js_1.validate)('query', quotation_schemas_js_1.quotationHistoryQuerySchema), (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
    const data = await quotation_repository_js_1.quotationRepository.history(res.locals.params.quotationId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query);
    res.status(200).json({ status: 200, success: true, message: 'Quotation history retrieved successfully', data, requestId: req.headers['x-request-id'] });
}));
router.get('/', (0, validate_middleware_js_1.validate)('query', quotation_schemas_js_1.listQuotationsSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.list));
router.get('/:quotationId', (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.get));
router.patch('/:quotationId', (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.updateQuotationSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.update));
router.post('/:quotationId/items', (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.addQuotationItemSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.addItem));
router.delete('/:quotationId/items/:itemId', (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema.extend({ itemId: zod_1.z.string().uuid() })), (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.deleteQuotationItemSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.deleteItem));
router.post('/', (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.createQuotationSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.create));
router.delete('/:quotationId', (0, validate_middleware_js_1.validate)('params', quotation_schemas_js_1.quotationIdSchema), (0, validate_middleware_js_1.validate)('body', quotation_schemas_js_1.deactivateQuotationSchema), (0, asyncHandler_js_1.asyncHandler)(quotation_controller_js_1.quotationController.delete));
exports.default = router;
//# sourceMappingURL=quotation.routes.js.map