"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditTrailController = void 0;
const audit_trail_repository_js_1 = require("./audit-trail.repository.js");
exports.auditTrailController = {
    async list(req, res) {
        const result = await audit_trail_repository_js_1.auditTrailRepository.list(res.locals.query);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Audit trail retrieved successfully',
            data: result,
            requestId: req.headers['x-request-id'],
        });
    },
    async listForEntity(req, res) {
        const entries = await audit_trail_repository_js_1.auditTrailRepository.listForEntity(res.locals.params.entityId);
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Audit trail retrieved successfully',
            data: entries,
            requestId: req.headers['x-request-id'],
        });
    },
};
//# sourceMappingURL=audit-trail.controller.js.map