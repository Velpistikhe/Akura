"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationController = void 0;
const quotation_approval_service_js_1 = require("./quotation-approval.service.js");
const quotation_repository_js_1 = require("./quotation.repository.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const httpError_js_1 = require("../../utils/httpError.js");
const send = (req, res, status, message, data) => {
    res.status(status).json({ status, success: true, message, data, requestId: req.headers['x-request-id'] });
};
exports.quotationController = {
    async preview(_req, res) {
        const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
        const { pdf, fileName } = await quotation_approval_service_js_1.quotationApproval.preview(res.locals.params.quotationId, branch, (0, officeBranch_js_1.getAuditActor)(res));
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        res.setHeader('Content-Length', pdf.length);
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        res.status(200).send(pdf);
    },
    async submit(req, res) {
        send(req, res, 200, 'Quotation submitted successfully', await quotation_repository_js_1.quotationRepository.submit(res.locals.params.quotationId, res.locals.body.version, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async reject(req, res) {
        send(req, res, 200, 'Quotation rejected successfully', await quotation_repository_js_1.quotationRepository.reject(res.locals.params.quotationId, res.locals.body.version, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async revise(req, res) {
        const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
        const quotationId = res.locals.params.quotationId;
        const quote = await quotation_repository_js_1.quotationRepository.findActive(quotationId, branch);
        // The mirrored Work Order reference is authoritative. Field Service writes it
        // in the same transaction that creates the Work Order, so the quotation row
        // and the Work Order cannot disagree about a live link.
        if (quote.hasWorkOrder || quote.workOrderId) {
            throw new httpError_js_1.HttpError('A quotation with an active Work Order cannot be revised until the Work Order is revoked', 409);
        }
        send(req, res, 201, 'Quotation revised successfully', await quotation_repository_js_1.quotationRepository.revise(quotationId, res.locals.body.version, branch, (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async approve(req, res) {
        const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
        send(req, res, 200, 'Quotation approved and PDF generated successfully', await quotation_approval_service_js_1.quotationApproval.approve(res.locals.params.quotationId, res.locals.body, branch, (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async list(req, res) {
        send(req, res, 200, 'Quotations retrieved successfully', await quotation_repository_js_1.quotationRepository.list((0, officeBranch_js_1.restrictListVisibility)(res, res.locals.query), (0, officeBranch_js_1.getOfficeBranchId)(res)));
    },
    async get(req, res) {
        send(req, res, 200, 'Quotation retrieved successfully', await quotation_approval_service_js_1.quotationApproval.get(res.locals.params.quotationId, (0, officeBranch_js_1.getOfficeBranchId)(res)));
    },
    async getReference(req, res) {
        send(req, res, 200, 'Quotation retrieved successfully', await quotation_repository_js_1.quotationRepository.findActive(res.locals.params.quotationId, (0, officeBranch_js_1.getOfficeBranchId)(res)));
    },
    async create(req, res) {
        // Validation middleware already checked the request. The repository also parses
        // raw input for non-HTTP callers, including converting date strings to Date.
        send(req, res, 201, 'Quotation created successfully', await quotation_repository_js_1.quotationRepository.create(req.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async delete(req, res) {
        const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
        const quotationId = res.locals.params.quotationId;
        const quote = await quotation_repository_js_1.quotationRepository.findActive(quotationId, branch);
        if (quote.hasWorkOrder || quote.workOrderId) {
            throw new httpError_js_1.HttpError('A quotation with an active Work Order cannot be deleted until the Work Order is revoked', 409);
        }
        send(req, res, 200, 'Quotation deleted successfully', await quotation_repository_js_1.quotationRepository.deactivate(quotationId, res.locals.body, branch, (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async update(req, res) {
        send(req, res, 200, 'Quotation updated successfully', await quotation_repository_js_1.quotationRepository.update(res.locals.params.quotationId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async addItem(req, res) {
        send(req, res, 201, 'Quotation item added successfully', await quotation_repository_js_1.quotationRepository.addItem(res.locals.params.quotationId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async deleteItem(req, res) {
        send(req, res, 200, 'Quotation item deleted successfully', await quotation_repository_js_1.quotationRepository.deleteItem(res.locals.params.quotationId, res.locals.params.itemId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
};
//# sourceMappingURL=quotation.controller.js.map