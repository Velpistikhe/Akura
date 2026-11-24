import { Prisma } from '@prisma/client';
import { CreateCompanyInput, ListCompaniesInput, UpdateCompanyInput } from './company.schemas.js';
import { AuditActor } from '../../types/auth.types.js';
export declare const companyRepository: {
    list(input: ListCompaniesInput, officeBranchId: string): Promise<{
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
                companySnapshot: Prisma.JsonValue | null;
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
    findById: (id: string, officeBranchId: string) => Promise<{
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
            companySnapshot: Prisma.JsonValue | null;
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
    } | null>;
    findByNormalizeName: (normalizeName: string, officeBranchId: string, excludeId?: string) => Prisma.Prisma__CompanyClient<{
        id: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: CreateCompanyInput & {
        normalizeName: string;
        officeBranchId: string;
    }, actor: AuditActor): Promise<{
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
    update(id: string, officeBranchId: string, data: UpdateCompanyInput, actor: AuditActor): Promise<{
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
            companySnapshot: Prisma.JsonValue | null;
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
    history: (id: string, officeBranchId: string, input: {
        page: number;
        limit: number;
    }) => Promise<{
        companyId: string;
        history: {
            version: number;
            companyId: string;
            id: string;
            createdAt: Date;
            createdById: string;
            createdByName: string;
            action: string;
            snapshot: Prisma.JsonValue;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    staffHistory: (id: string, officeBranchId: string, input: {
        page: number;
        limit: number;
    }) => Promise<{
        companyId: string;
        history: {
            version: number;
            id: string;
            createdAt: Date;
            createdById: string;
            createdByName: string;
            action: string;
            snapshot: Prisma.JsonValue;
            companyStaffId: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    revoke(id: string, officeBranchId: string, version: number, actor: AuditActor): Promise<{
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
};
