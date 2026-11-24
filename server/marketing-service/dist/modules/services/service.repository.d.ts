import { Prisma } from '@prisma/client';
import { CreateServiceInput, ListServicesInput, UpdateServiceInput } from './service.schemas.js';
import { AuditActor } from '../../types/auth.types.js';
export declare const serviceRepository: {
    list(input: ListServicesInput, officeBranchId: string): Promise<{
        services: {
            inspectionScopes: string;
            maintenanceScopes: string;
            name: string;
            type: import(".prisma/client").$Enums.ServiceType;
            officeBranchId: string;
            version: number;
            updatedAt: Date;
            isActive: boolean;
            id: string;
            createdAt: Date;
            hasMaintenance: boolean;
            createdById: string;
            createdByName: string;
            updatedById: string | null;
            updatedByName: string | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findById(id: string, officeBranchId: string): Promise<(Omit<{
        name: string;
        type: import(".prisma/client").$Enums.ServiceType;
        officeBranchId: string;
        version: number;
        updatedAt: Date;
        isActive: boolean;
        id: string;
        createdAt: Date;
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
        hasMaintenance: boolean;
        createdById: string;
        createdByName: string;
        updatedById: string | null;
        updatedByName: string | null;
    }, "scopes"> & {
        inspectionScopes: {
            id: string;
            serviceId: string | null;
            inspectionScope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maintenanceScopes: {
            id: string;
            serviceId: string | null;
            scope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }) | null>;
    findActiveById(id: string, officeBranchId: string): Promise<(Omit<{
        name: string;
        type: import(".prisma/client").$Enums.ServiceType;
        officeBranchId: string;
        version: number;
        updatedAt: Date;
        isActive: boolean;
        id: string;
        createdAt: Date;
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
        hasMaintenance: boolean;
        createdById: string;
        createdByName: string;
        updatedById: string | null;
        updatedByName: string | null;
    }, "scopes"> & {
        inspectionScopes: {
            id: string;
            serviceId: string | null;
            inspectionScope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maintenanceScopes: {
            id: string;
            serviceId: string | null;
            scope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }) | null>;
    history(id: string, officeBranchId: string, input: {
        page: number;
        limit: number;
    }): Promise<{
        serviceId: string;
        history: {
            id: string;
            action: string;
            version: number;
            changedBy: {
                id: string;
                name: string;
            };
            changedAt: Date;
            changes: {
                field: "inspectionScopes" | "maintenanceScopes";
                label: "Inspection scopes" | "Maintenance scopes";
                before: {} | null;
                after: {} | null;
            }[];
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    create: (data: CreateServiceInput, officeBranchId: string, actor: AuditActor) => Promise<Omit<{
        name: string;
        type: import(".prisma/client").$Enums.ServiceType;
        officeBranchId: string;
        version: number;
        updatedAt: Date;
        isActive: boolean;
        id: string;
        createdAt: Date;
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
        hasMaintenance: boolean;
        createdById: string;
        createdByName: string;
        updatedById: string | null;
        updatedByName: string | null;
    }, "scopes"> & {
        inspectionScopes: {
            id: string;
            serviceId: string | null;
            inspectionScope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maintenanceScopes: {
            id: string;
            serviceId: string | null;
            scope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    update: (id: string, officeBranchId: string, data: UpdateServiceInput, actor: AuditActor) => Promise<Omit<{
        name: string;
        type: import(".prisma/client").$Enums.ServiceType;
        officeBranchId: string;
        version: number;
        updatedAt: Date;
        isActive: boolean;
        id: string;
        createdAt: Date;
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
        hasMaintenance: boolean;
        createdById: string;
        createdByName: string;
        updatedById: string | null;
        updatedByName: string | null;
    }, "scopes"> & {
        inspectionScopes: {
            id: string;
            serviceId: string | null;
            inspectionScope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maintenanceScopes: {
            id: string;
            serviceId: string | null;
            scope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    deactivate(id: string, version: number, officeBranchId: string, actor: AuditActor): Promise<Omit<{
        name: string;
        type: import(".prisma/client").$Enums.ServiceType;
        officeBranchId: string;
        version: number;
        updatedAt: Date;
        isActive: boolean;
        id: string;
        createdAt: Date;
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
        hasMaintenance: boolean;
        createdById: string;
        createdByName: string;
        updatedById: string | null;
        updatedByName: string | null;
    }, "scopes"> & {
        inspectionScopes: {
            id: string;
            serviceId: string | null;
            inspectionScope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        maintenanceScopes: {
            id: string;
            serviceId: string | null;
            scope: string;
            revoked: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findInspectionScopeByName: (serviceId: string, inspectionScope: string, officeBranchId: string) => Prisma.Prisma__ServiceScopeClient<{
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findMaintenanceScopeByName: (serviceId: string, scope: string, officeBranchId: string) => Prisma.Prisma__ServiceScopeClient<{
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    createMaintenanceScope(serviceId: string, scope: string, officeBranchId: string, actor: AuditActor): Promise<{
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    } | null>;
    revokeMaintenanceScope(serviceId: string, scopeId: string, officeBranchId: string, actor: AuditActor): Promise<{
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    } | null>;
    createInspectionScope(serviceId: string, inspectionScope: string, officeBranchId: string, actor: AuditActor): Promise<{
        inspectionScope: string;
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    } | null>;
    revokeInspectionScope(serviceId: string, inspectionScopeId: string, officeBranchId: string, actor: AuditActor): Promise<{
        inspectionScope: string;
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    } | null>;
};
