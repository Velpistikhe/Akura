"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceService = void 0;
const httpError_js_1 = require("../../utils/httpError.js");
const service_repository_js_1 = require("./service.repository.js");
exports.serviceService = {
    list: (input, officeBranchId) => service_repository_js_1.serviceRepository.list(input, officeBranchId),
    history: (id, officeBranchId, input) => service_repository_js_1.serviceRepository.history(id, officeBranchId, input),
    async get(id, officeBranchId) {
        const service = await service_repository_js_1.serviceRepository.findById(id, officeBranchId);
        if (!service)
            throw new httpError_js_1.HttpError('Service not found', 404);
        return service;
    },
    async create(data, officeBranchId, actor) {
        return service_repository_js_1.serviceRepository.create(data, officeBranchId, actor);
    },
    async update(id, data, officeBranchId, actor) {
        const current = await service_repository_js_1.serviceRepository.findById(id, officeBranchId);
        if (!current)
            throw new httpError_js_1.HttpError('Service not found', 404);
        return service_repository_js_1.serviceRepository.update(id, officeBranchId, data, actor);
    },
    async createMaintenanceScope(serviceId, data, officeBranchId, actor) {
        const service = await service_repository_js_1.serviceRepository.findById(serviceId, officeBranchId);
        if (!service)
            throw new httpError_js_1.HttpError('Service not found', 404);
        if (!service.isActive)
            throw new httpError_js_1.HttpError('Service is inactive', 409);
        if (!service.hasMaintenance)
            throw new httpError_js_1.HttpError('Service does not provide maintenance', 409);
        const existing = await service_repository_js_1.serviceRepository.findMaintenanceScopeByName(serviceId, data.scope, officeBranchId);
        if (existing && !existing.revoked)
            throw new httpError_js_1.HttpError(`Maintenance scope '${data.scope}' already exists`, 409);
        const scope = await service_repository_js_1.serviceRepository.createMaintenanceScope(serviceId, data.scope, officeBranchId, actor);
        if (!scope)
            throw new httpError_js_1.HttpError('Service is inactive or does not provide maintenance', 409);
        return scope;
    },
    async deleteMaintenanceScope(serviceId, scopeId, officeBranchId, actor) {
        const service = await service_repository_js_1.serviceRepository.findById(serviceId, officeBranchId);
        if (!service)
            throw new httpError_js_1.HttpError('Service not found', 404);
        if (!service.isActive)
            throw new httpError_js_1.HttpError('Service is inactive', 409);
        if (!service.hasMaintenance)
            throw new httpError_js_1.HttpError('Service does not provide maintenance', 409);
        const scope = await service_repository_js_1.serviceRepository.revokeMaintenanceScope(serviceId, scopeId, officeBranchId, actor);
        if (!scope)
            throw new httpError_js_1.HttpError('Maintenance scope not found', 404);
        return scope;
    },
    async delete(id, version, officeBranchId, actor) {
        const service = await service_repository_js_1.serviceRepository.findById(id, officeBranchId);
        if (!service)
            throw new httpError_js_1.HttpError('Service not found', 404);
        if (!service.isActive)
            throw new httpError_js_1.HttpError('Service is already inactive', 409);
        return service_repository_js_1.serviceRepository.deactivate(id, version, officeBranchId, actor);
    },
    async createInspectionScope(serviceId, data, officeBranchId, actor) {
        if (!await service_repository_js_1.serviceRepository.findById(serviceId, officeBranchId))
            throw new httpError_js_1.HttpError('Service not found', 404);
        const existing = await service_repository_js_1.serviceRepository.findInspectionScopeByName(serviceId, data.inspectionScope, officeBranchId);
        if (existing && !existing.revoked)
            throw new httpError_js_1.HttpError(`Inspection scope '${data.inspectionScope}' already exists`, 409);
        const inspectionScope = await service_repository_js_1.serviceRepository.createInspectionScope(serviceId, data.inspectionScope, officeBranchId, actor);
        if (!inspectionScope)
            throw new httpError_js_1.HttpError('Service is inactive', 409);
        return inspectionScope;
    },
    async deleteInspectionScope(serviceId, inspectionScopeId, officeBranchId, actor) {
        const service = await service_repository_js_1.serviceRepository.findById(serviceId, officeBranchId);
        if (!service)
            throw new httpError_js_1.HttpError('Service not found', 404);
        if (!service.isActive)
            throw new httpError_js_1.HttpError('Service is inactive', 409);
        const inspectionScope = await service_repository_js_1.serviceRepository.revokeInspectionScope(serviceId, inspectionScopeId, officeBranchId, actor);
        if (!inspectionScope)
            throw new httpError_js_1.HttpError('Inspection scope not found', 404);
        return inspectionScope;
    },
};
//# sourceMappingURL=service.service.js.map