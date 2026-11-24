import { Prisma } from '@prisma/client';
import { AuditActor } from '../../types/auth.types.js';
import { ExcelPriceRow, ExportItemSizesInput } from './contract-excel.schemas.js';
export declare const contractExcelRepository: {
    exportSizes: (input: ExportItemSizesInput, branch: string) => Promise<({
        item: {
            service: {
                name: string;
                type: import(".prisma/client").$Enums.ServiceType;
                officeBranchId: string;
                version: number;
                updatedAt: Date;
                isActive: boolean;
                id: string;
                createdAt: Date;
                activeKey: string | null;
                hasMaintenance: boolean;
                createdById: string;
                createdByName: string;
                updatedById: string | null;
                updatedByName: string | null;
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
        price: {
            isActive: boolean;
            priceServicePrimary: Prisma.Decimal;
            priceMaintenancePrimary: Prisma.Decimal | null;
            effectiveFrom: Date;
            effectiveUntil: Date | null;
        } | null;
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
    })[]>;
    importPrices: (contractId: string, companyId: string, version: number, rows: ExcelPriceRow[], branch: string, actor: AuditActor) => Promise<{
        companyId: string;
        contractId: string;
        version: number;
        imported: number;
    }>;
};
