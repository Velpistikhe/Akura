import { AuditActor } from '../../types/auth.types.js';
import { CreateCompanyStaffInput, ListCompanyStaffInput, UpdateCompanyStaffInput } from './company-staff.schemas.js';
export declare const companyStaffService: {
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
            snapshot: import("@prisma/client/runtime/library").JsonValue;
            companyStaffId: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    list: (input: ListCompanyStaffInput, officeBranchId: string) => Promise<{
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
    get(id: string, officeBranchId: string): Promise<{
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
    create(data: CreateCompanyStaffInput, officeBranchId: string, actor: AuditActor): Promise<{
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
    update(id: string, data: UpdateCompanyStaffInput, officeBranchId: string, actor: AuditActor): Promise<{
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
    delete(id: string, officeBranchId: string, version: number, actor: AuditActor): Promise<{
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
