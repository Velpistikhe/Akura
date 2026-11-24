"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceController = void 0;
const service_service_js_1 = require("./service.service.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const send = (req, res, status, message, data) => {
    res.status(status).json({ status, success: true, message, data, requestId: req.headers['x-request-id'] });
};
exports.serviceController = {
    async list(req, res) { send(req, res, 200, 'Services retrieved successfully', await service_service_js_1.serviceService.list((0, officeBranch_js_1.restrictListVisibility)(res, res.locals.query), (0, officeBranch_js_1.getOfficeBranchId)(res))); },
    async history(req, res) { send(req, res, 200, 'Service history retrieved successfully', await service_service_js_1.serviceService.history(res.locals.params.serviceId, (0, officeBranch_js_1.getOfficeBranchId)(res), res.locals.query)); },
    async get(req, res) {
        send(req, res, 200, 'Service retrieved successfully', await service_service_js_1.serviceService.get(res.locals.params.serviceId, (0, officeBranch_js_1.getOfficeBranchId)(res)));
    },
    async create(req, res) { send(req, res, 201, 'Service created successfully', await service_service_js_1.serviceService.create(res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    async update(req, res) { send(req, res, 200, 'Service updated successfully', await service_service_js_1.serviceService.update(res.locals.params.serviceId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    async createMaintenanceScope(req, res) {
        const { serviceId } = res.locals.params;
        send(req, res, 201, 'Maintenance scope created successfully', await service_service_js_1.serviceService.createMaintenanceScope(serviceId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async deleteMaintenanceScope(req, res) {
        const params = res.locals.params;
        send(req, res, 200, 'Maintenance scope deleted successfully', await service_service_js_1.serviceService.deleteMaintenanceScope(params.serviceId, params.scopeId, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async delete(req, res) { send(req, res, 200, 'Service deleted successfully', await service_service_js_1.serviceService.delete(res.locals.params.serviceId, res.locals.body.version, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res))); },
    async createInspectionScope(req, res) {
        send(req, res, 201, 'Inspection scope created successfully', await service_service_js_1.serviceService.createInspectionScope(res.locals.params.serviceId, res.locals.body, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
    async deleteInspectionScope(req, res) {
        const params = res.locals.params;
        send(req, res, 200, 'Inspection scope deleted successfully', await service_service_js_1.serviceService.deleteInspectionScope(params.serviceId, params.inspectionScopeId, (0, officeBranch_js_1.getOfficeBranchId)(res), (0, officeBranch_js_1.getAuditActor)(res)));
    },
};
//# sourceMappingURL=service.controller.js.map