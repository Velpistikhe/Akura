import { AddItemSizeInput, CreateItemInput, CreateItemScopeInput, ListItemsInput, ListItemSizesInput, ListContractItemSizesInput } from './item.schemas.js';
import { AuditActor } from '../../types/auth.types.js';
export declare const itemList: (query: ListItemsInput, officeBranchId: string) => Promise<{
    items: any[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const itemService: {
    create: (data: CreateItemInput, officeBranchId: string, actor: AuditActor) => Promise<any>;
    addSize: (data: AddItemSizeInput, officeBranchId: string, actor: AuditActor) => Promise<any>;
    addInspectionScopes: (id: string, data: CreateItemScopeInput, officeBranchId: string) => Promise<Omit<{
        scopes: {
            type: import(".prisma/client").$Enums.ServiceScopeType;
            updatedAt: Date;
            itemId: string | null;
            serviceId: string | null;
            revoked: boolean;
            id: string;
            createdAt: Date;
            scope: string;
        }[];
    } & {
        name: string;
        officeBranchId: string;
        version: number;
        updatedAt: Date;
        isActive: boolean;
        uom: string;
        serviceId: string | null;
        id: string;
        createdAt: Date;
        activeKey: string | null;
        createdById: string;
        createdByName: string;
        updatedById: string | null;
        updatedByName: string | null;
    }, "scopes"> & {
        inspectionScopes: {
            id: string;
            itemId: string | null;
            inspectionScope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maintenanceScopes: {
            id: string;
            itemId: string | null;
            scope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    listSizes(data: ListItemSizesInput, officeBranchId: string): Promise<{
        company: {
            id: string;
            name: string;
            isSisterCompany: boolean;
        };
        sizes: {
            item: {
                id: string;
                name: string;
                uom: string;
                version: number;
                service: {
                    id: string;
                    name: string;
                    type: string;
                    hasMaintenance: boolean;
                    version: number;
                } | null;
            };
            catalogSnapshot: {
                serviceName: string;
                serviceType: string;
                itemName: string;
                size: string | null;
                hasMaintenance: boolean;
            };
            catalogActive: boolean;
            contractPrice: {
                version: number;
                updatedAt: Date;
                isActive: boolean;
                contractId: string;
                priceService: import("@prisma/client/runtime/library").Decimal;
                priceMaintenance: import("@prisma/client/runtime/library").Decimal | null;
                itemSizeId: string;
                effectiveFrom: Date;
                effectiveUntil: Date | null;
                id: string;
                createdAt: Date;
                createdById: string;
                createdByName: string;
                updatedById: string | null;
                updatedByName: string | null;
                catalogSnapshot: import("@prisma/client/runtime/library").JsonValue;
            } | null;
            contractId: string | null;
            contractVersion: number | null;
            priceSource: string;
            priceId: string | null;
            priceVersion: number | null;
            sizeVersion: number;
            itemVersion: number;
            serviceVersion: number | null;
            priceStatus: string;
            priceMessage: string | null;
            priceService: import("@prisma/client/runtime/library").Decimal | null;
            priceInspection: import("@prisma/client/runtime/library").Decimal | null;
            priceMaintenance: import("@prisma/client/runtime/library").Decimal | null;
            id: string;
            itemId: string;
            size: string | null;
            version: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    } | {
        sizes: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    listContractSizes(data: ListContractItemSizesInput, officeBranchId: string): Promise<{
        company: {
            id: string;
            name: string;
            isSisterCompany: boolean;
        };
        sizes: {
            item: {
                id: string;
                name: string;
                uom: string;
                version: number;
                service: {
                    id: string;
                    name: string;
                    type: string;
                    hasMaintenance: boolean;
                    version: number;
                } | null;
            };
            catalogSnapshot: {
                serviceName: string;
                serviceType: string;
                itemName: string;
                size: string | null;
                hasMaintenance: boolean;
            };
            catalogActive: boolean;
            contractPrice: {
                version: number;
                updatedAt: Date;
                isActive: boolean;
                contractId: string;
                priceService: import("@prisma/client/runtime/library").Decimal;
                priceMaintenance: import("@prisma/client/runtime/library").Decimal | null;
                itemSizeId: string;
                effectiveFrom: Date;
                effectiveUntil: Date | null;
                id: string;
                createdAt: Date;
                createdById: string;
                createdByName: string;
                updatedById: string | null;
                updatedByName: string | null;
                catalogSnapshot: import("@prisma/client/runtime/library").JsonValue;
            } | null;
            contractId: string | null;
            contractVersion: number | null;
            priceSource: string;
            priceId: string | null;
            priceVersion: number | null;
            sizeVersion: number;
            itemVersion: number;
            serviceVersion: number | null;
            priceStatus: string;
            priceMessage: string | null;
            priceService: import("@prisma/client/runtime/library").Decimal | null;
            priceInspection: import("@prisma/client/runtime/library").Decimal | null;
            priceMaintenance: import("@prisma/client/runtime/library").Decimal | null;
            id: string;
            itemId: string;
            size: string | null;
            version: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    } | {
        sizes: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    validateSizeListItem(data: ListItemSizesInput, officeBranchId: string): Promise<void>;
    get(id: string, officeBranchId: string): Promise<Omit<{
        scopes: {
            type: import(".prisma/client").$Enums.ServiceScopeType;
            updatedAt: Date;
            itemId: string | null;
            serviceId: string | null;
            revoked: boolean;
            id: string;
            createdAt: Date;
            scope: string;
        }[];
        service: {
            name: string;
            id: string;
            hasMaintenance: boolean;
        } | null;
    } & {
        name: string;
        officeBranchId: string;
        version: number;
        updatedAt: Date;
        isActive: boolean;
        uom: string;
        serviceId: string | null;
        id: string;
        createdAt: Date;
        activeKey: string | null;
        createdById: string;
        createdByName: string;
        updatedById: string | null;
        updatedByName: string | null;
    }, "scopes"> & {
        inspectionScopes: {
            id: string;
            itemId: string | null;
            inspectionScope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maintenanceScopes: {
            id: string;
            itemId: string | null;
            scope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    removeSize(id: string, officeBranchId: string, actor: AuditActor, version: number): Promise<any>;
    remove: (id: string, officeBranchId: string, actor: AuditActor, version: number) => Promise<any>;
};
