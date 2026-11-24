import { CreateServiceInput, CreateInspectionScopeInput, CreateMaintenanceScopeInput, ListServicesInput, UpdateServiceInput } from './service.schemas.js';
import { AuditActor } from '../../types/auth.types.js';
export declare const serviceService: {
    list: (input: ListServicesInput, officeBranchId: string) => Promise<{
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
    history: (id: string, officeBranchId: string, input: {
        page: number;
        limit: number;
    }) => Promise<{
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
    get(id: string, officeBranchId: string): Promise<Omit<{
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
    create(data: CreateServiceInput, officeBranchId: string, actor: AuditActor): Promise<Omit<{
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
    update(id: string, data: UpdateServiceInput, officeBranchId: string, actor: AuditActor): Promise<Omit<{
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
    createMaintenanceScope(serviceId: string, data: CreateMaintenanceScopeInput, officeBranchId: string, actor: AuditActor): Promise<{
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    }>;
    deleteMaintenanceScope(serviceId: string, scopeId: string, officeBranchId: string, actor: AuditActor): Promise<{
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    }>;
    delete(id: string, version: number, officeBranchId: string, actor: AuditActor): Promise<Omit<{
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
    createInspectionScope(serviceId: string, data: CreateInspectionScopeInput, officeBranchId: string, actor: AuditActor): Promise<{
        inspectionScope: string;
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    }>;
    deleteInspectionScope(serviceId: string, inspectionScopeId: string, officeBranchId: string, actor: AuditActor): Promise<{
        inspectionScope: string;
        type: import(".prisma/client").$Enums.ServiceScopeType;
        updatedAt: Date;
        itemId: string | null;
        serviceId: string | null;
        revoked: boolean;
        id: string;
        createdAt: Date;
        scope: string;
    }>;
};
