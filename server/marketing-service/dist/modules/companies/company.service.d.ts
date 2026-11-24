import { CreateCompanyInput, ListCompaniesInput, UpdateCompanyInput } from './company.schemas.js';
import { AuditActor } from '../../types/auth.types.js';
export declare const companyService: {
    list: (input: ListCompaniesInput, officeBranchId: string) => Promise<{
        companies: {
            contract: {
                hasList: boolean;
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
            } | null;
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
            _count: {
                staffs: number;
            };
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    get(id: string, officeBranchId: string): Promise<{
        contract: {
            hasList: boolean;
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
        } | null;
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
        _count: {
            staffs: number;
        };
    }>;
    create(data: CreateCompanyInput, officeBranchId: string, actor: AuditActor): Promise<{
        contract: null;
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
        _count: {
            staffs: number;
        };
    }>;
    update(id: string, data: UpdateCompanyInput, officeBranchId: string, actor: AuditActor): Promise<{
        contract: {
            hasList: boolean;
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
        } | null;
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
        _count: {
            staffs: number;
        };
    }>;
};
