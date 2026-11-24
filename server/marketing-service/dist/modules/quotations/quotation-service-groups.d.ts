import { Prisma, QuotationItem } from '@prisma/client';
/**
 * Active scopes of a service, ordered by creation. Scope rows carry no version
 * or audit trail, so they are read as a plain snapshot of the current catalog.
 */
export declare const serviceScopeInclude: {
    scopes: {
        where: {
            revoked: false;
        };
        orderBy: ({
            createdAt: "asc";
            id?: undefined;
        } | {
            id: "asc";
            createdAt?: undefined;
        })[];
    };
};
export type ServiceWithScopes = Prisma.ServiceGetPayload<{
    include: typeof serviceScopeInclude;
}>;
export declare function serviceScopeSnapshot(service: ServiceWithScopes): {
    serviceId: string;
    serviceScopes: string;
    inspectionScopes: string;
    maintenanceScopes: string;
};
/**
 * Scopes of an item: the ones of its service, or the item's own scopes when the
 * item is standalone. A standalone item cannot own maintenance scopes, so its
 * maintenance list stays empty unless the catalog changed after its creation.
 */
export declare function itemScopeSnapshot(item: {
    service: ServiceWithScopes | null;
    scopes: Array<{
        type: string;
        scope: string;
    }>;
}): {
    serviceId: string;
    serviceScopes: string;
    inspectionScopes: string;
    maintenanceScopes: string;
} | {
    serviceId: null;
    serviceScopes: string;
    inspectionScopes: string;
    maintenanceScopes: string;
};
/** The catalog rows an item size needs to resolve its scopes. */
export declare const itemScopeInclude: {
    item: {
        include: {
            service: {
                include: {
                    scopes: {
                        where: {
                            revoked: false;
                        };
                        orderBy: ({
                            createdAt: "asc";
                            id?: undefined;
                        } | {
                            id: "asc";
                            createdAt?: undefined;
                        })[];
                    };
                };
            };
            scopes: {
                where: {
                    revoked: false;
                };
                orderBy: ({
                    createdAt: "asc";
                    id?: undefined;
                } | {
                    id: "asc";
                    createdAt?: undefined;
                })[];
            };
        };
    };
};
export declare function groupQuotationItems(items: QuotationItem[]): {
    type: string;
    name: string;
    scopes: string;
    inspectionScopes: string;
    maintenanceScopes: string;
    items: QuotationItem[];
}[];
