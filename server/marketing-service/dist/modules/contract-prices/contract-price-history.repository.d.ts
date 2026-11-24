export declare const contractPriceHistoryRepository: {
    listPrices: (input: {
        contractId?: string;
        companyId?: string;
        itemSizeId?: string;
        isActive?: boolean;
        search?: string;
        page: number;
        limit: number;
        sortBy?: "priceService" | "priceMaintenance" | "effectiveFrom" | "effectiveUntil" | "createdAt" | "updatedAt";
        sortOrder: "asc" | "desc";
    }, branch: string) => Promise<{
        prices: {
            contract: {
                company: {
                    name: string;
                    id: string;
                };
            } & {
                status: import(".prisma/client").$Enums.CompanyContractStatus;
                version: number;
                updatedAt: Date;
                companyId: string;
                contractNumber: string;
                contractDate: Date;
                effectiveFrom: Date;
                effectiveUntil: Date;
                id: string;
                createdAt: Date;
                createdById: string;
                updatedById: string | null;
                isDeleted: boolean;
                companySnapshot: import("@prisma/client/runtime/library").JsonValue | null;
                revisionOfId: string | null;
            };
            itemSize: {
                item: {
                    service: {
                        name: string;
                        id: string;
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
                };
            } & {
                version: number;
                updatedAt: Date;
                isActive: boolean;
                size: string | null;
                itemId: string;
                effectiveFrom: Date;
                effectiveUntil: Date | null;
                id: string;
                createdAt: Date;
                activeKey: string | null;
                createdById: string;
                createdByName: string;
                updatedById: string | null;
                updatedByName: string | null;
            };
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
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    list: (contractPriceId: string, input: {
        page: number;
        limit: number;
    }, branch: string) => Promise<{
        contractPriceId: string;
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
                field: "isActive" | "priceService" | "priceMaintenance" | "effectiveFrom" | "effectiveUntil";
                label: "Active status" | "Effective from" | "Effective until" | "Service price" | "Maintenance price";
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
};
