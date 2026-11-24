import { AuditActor } from '../../types/auth.types.js';
import { Prisma } from '@prisma/client';
import { CreateCompanyStaffInput, ListCompanyStaffInput, UpdateCompanyStaffInput } from './company-staff.schemas.js';
export declare const companyStaffRepository: {
    list(input: ListCompanyStaffInput, officeBranchId: string): Promise<{
        staffs: {
            name: string;
            version: number;
            updatedAt: Date;
            companyId: string;
            title: import(".prisma/client").$Enums.StaffTitle;
            revoked: boolean;
            id: string;
            createdAt: Date;
            createdById: string | null;
            updatedById: string | null;
            company: {
                name: string;
                type: import(".prisma/client").$Enums.CompanyType;
                version: number;
                id: string;
            };
            normalizeName: string;
            telp: string | null;
            email: string | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findById: (id: string, officeBranchId: string) => Prisma.Prisma__CompanyStaffClient<{
        name: string;
        version: number;
        updatedAt: Date;
        companyId: string;
        title: import(".prisma/client").$Enums.StaffTitle;
        revoked: boolean;
        id: string;
        createdAt: Date;
        createdById: string | null;
        updatedById: string | null;
        company: {
            name: string;
            type: import(".prisma/client").$Enums.CompanyType;
            version: number;
            id: string;
        };
        normalizeName: string;
        telp: string | null;
        email: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByNormalizeName: (normalizeName: string, officeBranchId: string, excludeId?: string) => Prisma.Prisma__CompanyStaffClient<{
        id: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: CreateCompanyStaffInput & {
        normalizeName: string;
    }, officeBranchId: string, actor: AuditActor): Promise<{
        name: string;
        version: number;
        updatedAt: Date;
        companyId: string;
        title: import(".prisma/client").$Enums.StaffTitle;
        revoked: boolean;
        id: string;
        createdAt: Date;
        createdById: string | null;
        updatedById: string | null;
        company: {
            name: string;
            type: import(".prisma/client").$Enums.CompanyType;
            version: number;
            id: string;
        };
        normalizeName: string;
        telp: string | null;
        email: string | null;
    }>;
    update(id: string, officeBranchId: string, data: UpdateCompanyStaffInput & {
        normalizeName?: string;
    }, actor: AuditActor): Promise<{
        name: string;
        version: number;
        updatedAt: Date;
        companyId: string;
        title: import(".prisma/client").$Enums.StaffTitle;
        revoked: boolean;
        id: string;
        createdAt: Date;
        createdById: string | null;
        updatedById: string | null;
        company: {
            name: string;
            type: import(".prisma/client").$Enums.CompanyType;
            version: number;
            id: string;
        };
        normalizeName: string;
        telp: string | null;
        email: string | null;
    }>;
    history: (id: string, officeBranchId: string, input: {
        page: number;
        limit: number;
    }) => Promise<{
        companyStaffId: string;
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
        name: string;
        version: number;
        updatedAt: Date;
        companyId: string;
        title: import(".prisma/client").$Enums.StaffTitle;
        revoked: boolean;
        id: string;
        createdAt: Date;
        createdById: string | null;
        updatedById: string | null;
        company: {
            name: string;
            type: import(".prisma/client").$Enums.CompanyType;
            version: number;
            id: string;
        };
        normalizeName: string;
        telp: string | null;
        email: string | null;
    }>;
};
