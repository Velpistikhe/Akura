import { Prisma } from '@prisma/client';
import { AddItemSizeInput, ListItemsInput, ListItemSizesInput, ListContractPriceOptionsInput } from './item.schemas.js';
import { AuditActor } from '../../types/auth.types.js';
export declare const itemRepository: {
    list(input: ListItemsInput, officeBranchId: string): Promise<{
        items: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    find: (id: string, officeBranchId: string) => Promise<any>;
    findActive: (id: string, officeBranchId: string) => Promise<(Omit<{
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
    }) | null>;
    listSizes(input: ListItemSizesInput, officeBranchId: string, companyId?: string, resolvePrices?: boolean): Promise<{
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
                priceService: Prisma.Decimal;
                priceMaintenance: Prisma.Decimal | null;
                itemSizeId: string;
                effectiveFrom: Date;
                effectiveUntil: Date | null;
                id: string;
                createdAt: Date;
                createdById: string;
                createdByName: string;
                updatedById: string | null;
                updatedByName: string | null;
                catalogSnapshot: Prisma.JsonValue;
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
            priceService: Prisma.Decimal | null;
            priceInspection: Prisma.Decimal | null;
            priceMaintenance: Prisma.Decimal | null;
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
    listContractPriceOptions(input: ListContractPriceOptionsInput, contractId: string, branch: string): Promise<{
        sizes: {
            id: string;
            itemId: string;
            size: string | null;
            version: number;
            itemName: string;
            serviceName: string | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    create: (data: import("./item.schemas.js").CreateItemInput, branch: string, actor: AuditActor) => Promise<any>;
    addSize: (data: AddItemSizeInput, branch: string, actor: AuditActor) => Promise<any>;
    addInspectionScopes: (id: string, data: import("./item.schemas.js").CreateItemScopeInput, branch: string) => Promise<Omit<{
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
    removeSize: (id: string, branch: string, actor: AuditActor, version: number) => Promise<any>;
    remove: (id: string, branch: string, actor: AuditActor, version: number) => Promise<any>;
};
