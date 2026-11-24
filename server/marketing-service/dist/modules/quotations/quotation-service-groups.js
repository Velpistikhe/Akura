"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemScopeInclude = exports.serviceScopeInclude = void 0;
exports.serviceScopeSnapshot = serviceScopeSnapshot;
exports.itemScopeSnapshot = itemScopeSnapshot;
exports.groupQuotationItems = groupQuotationItems;
/**
 * Active scopes of a service, ordered by creation. Scope rows carry no version
 * or audit trail, so they are read as a plain snapshot of the current catalog.
 */
exports.serviceScopeInclude = {
    scopes: { where: { revoked: false }, orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] },
};
/** Joins scope texts in catalog order. */
const joined = (scopes) => scopes.join(', ');
function serviceScopeSnapshot(service) {
    const inspection = service.scopes.filter(row => row.type === 'INSPECTION').map(row => row.scope);
    const maintenance = service.hasMaintenance ? service.scopes.filter(row => row.type === 'MAINTENANCE').map(row => row.scope) : [];
    return { serviceId: service.id, serviceScopes: joined([...inspection, ...maintenance]),
        inspectionScopes: joined(inspection), maintenanceScopes: joined(maintenance) };
}
/**
 * Scopes of an item: the ones of its service, or the item's own scopes when the
 * item is standalone. A standalone item cannot own maintenance scopes, so its
 * maintenance list stays empty unless the catalog changed after its creation.
 */
function itemScopeSnapshot(item) {
    if (item.service)
        return serviceScopeSnapshot(item.service);
    const inspection = item.scopes.filter(row => row.type === 'INSPECTION').map(row => row.scope);
    const maintenance = item.scopes.filter(row => row.type === 'MAINTENANCE').map(row => row.scope);
    return { serviceId: null, serviceScopes: joined([...inspection, ...maintenance]),
        inspectionScopes: joined(inspection), maintenanceScopes: joined(maintenance) };
}
/** The catalog rows an item size needs to resolve its scopes. */
exports.itemScopeInclude = {
    item: { include: { service: { include: exports.serviceScopeInclude }, scopes: { where: { revoked: false }, orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] } } },
};
function groupQuotationItems(items) {
    const groups = new Map();
    for (const item of [...items].filter(item => item.isActive).sort((a, b) => a.position - b.position)) {
        const snapshot = item.priceSelection;
        const key = typeof snapshot?.serviceId === 'string' ? snapshot.serviceId : JSON.stringify([item.serviceType, item.serviceName]);
        let group = groups.get(key);
        if (!group) {
            group = { type: item.serviceType, name: item.serviceName, scopes: typeof snapshot?.serviceScopes === 'string' ? snapshot.serviceScopes : '',
                inspectionScopes: typeof snapshot?.inspectionScopes === 'string' ? snapshot.inspectionScopes : '',
                maintenanceScopes: typeof snapshot?.maintenanceScopes === 'string' ? snapshot.maintenanceScopes : '', items: [] };
            groups.set(key, group);
        }
        group.items.push(item);
    }
    return [...groups.values()];
}
//# sourceMappingURL=quotation-service-groups.js.map