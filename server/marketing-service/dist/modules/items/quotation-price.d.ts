import { Prisma } from '@prisma/client';
import type { ListItemSizesInput } from './item.schemas.js';
export declare const priceContext: (tx: Prisma.TransactionClient, companyId: string, branch: string, now: Date) => Promise<{
    company: {
        name: string;
        type: import(".prisma/client").$Enums.CompanyType;
        officeBranchId: string;
        address: string;
        isSisterCompany: boolean;
        version: number;
        updatedAt: Date;
        revoked: boolean;
        id: string;
        createdAt: Date;
        createdById: string | null;
        updatedById: string | null;
        npwp: string;
        normalizeName: string;
    };
    contract: {
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
        companySnapshot: Prisma.JsonValue | null;
        revisionOfId: string | null;
    } | null;
}>;
export type PriceContext = Awaited<ReturnType<typeof priceContext>>;
export declare const quotationSizeInclude: {
    price: true;
    contractPrices: true;
    item: {
        include: {
            service: true;
        };
    };
};
type Size = Prisma.ItemSizeGetPayload<{
    include: {
        price: true;
        item: {
            include: {
                service: true;
            };
        };
    };
}> & {
    contractPrices?: Prisma.CompanyContractPriceGetPayload<{}>[];
};
export declare const catalogSnapshot: (row: {
    size: string | null;
    item: {
        name: string;
        service: {
            name: string;
            type: string;
            hasMaintenance: boolean;
        } | null;
    };
}) => {
    serviceName: string;
    serviceType: string;
    itemName: string;
    size: string | null;
    hasMaintenance: boolean;
};
export declare const resolveQuotationPrice: (row: Size, context: PriceContext, now: Date) => {
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
};
export declare const quotationOptions: (tx: Prisma.TransactionClient, input: ListItemSizesInput, context: PriceContext, branch: string, now: Date) => Promise<{
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
}>;
export {};
