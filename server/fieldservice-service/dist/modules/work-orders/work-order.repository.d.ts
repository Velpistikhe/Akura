import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { Actor } from '../../middlewares/actor.middleware.js';
import { QuotationSnapshot, ContractSnapshot, ItemSizeReference, CompanySnapshot } from '../../integrations/gateway.js';
import { CreateWorkOrderByCompanyInput, CreateWorkOrderByQuotationInput, UpdateWorkOrderInput, listWorkOrderSchema } from './work-order.schemas.js';
export type WorkOrderWriteResult = {
    row: WorkOrderPublic;
    linkEventId?: string;
};
/** The complete Work Order row, including the document snapshots. */
declare const include: {
    inspectors: {
        orderBy: {
            position: "asc";
        };
    };
    items: boolean;
};
type WorkOrderSnapshot = Prisma.WorkOrderGetPayload<{
    include: typeof include;
}>;
/** A Work Order as it is returned to a client: without the document snapshots. */
export type WorkOrderPublic = Omit<WorkOrderSnapshot, 'quotationSnapshot' | 'contractSnapshot'>;
export declare const workOrderRepository: {
    /**
     * The change history of one Work Order.
     *
     * Only the recorded changes are returned: the field-level differences, the
     * action and the actor. The stored before/after snapshots of the whole Work
     * Order stay in the database and are deliberately not exposed, so the response
     * holds the difference instead of two copies of the record.
     */
    history(id: string, page: number, limit: number, actor: Actor): Promise<{
        history: {
            id: string;
            workOrderId: string;
            version: number;
            action: string;
            actionLabel: string;
            changes: Prisma.JsonValue;
            createdById: string;
            createdByName: string;
            createdAt: Date;
            changedBy: {
                id: string;
                name: string;
            };
            changedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    /**
     * Company basis (POST /work-orders). The company was validated live against
     * Marketing before this call, so the stored companyId is an existing,
     * non-revoked company of the branch. A contract may still be attached; it is
     * validated against Marketing as well.
     */
    createByCompany(input: CreateWorkOrderByCompanyInput, company: CompanySnapshot, actor: Actor, contract: ContractSnapshot | null, itemReferences?: Array<CreateWorkOrderByCompanyInput["items"][number] & {
        snapshot: ItemSizeReference;
    }>): Promise<WorkOrderPublic>;
    /**
     * Quotation basis (POST /work-orders/from-quotation). The quotation was
     * validated live against Marketing before this call, so the stored quotation
     * snapshot matches the approved document and the companyId is the company of
     * that quotation.
     *
     * A link delivery event is queued in the same transaction; Marketing is updated
     * asynchronously from the transactional outbox after the Work Order commits.
     */
    createByQuotation(input: CreateWorkOrderByQuotationInput, quotation: QuotationSnapshot, actor: Actor): Promise<WorkOrderWriteResult>;
    list(input: z.infer<typeof listWorkOrderSchema>, actor: Actor): Promise<{
        workOrders: {
            quotationNo: number | null;
            quotationDate: string | null;
            contractNumber: string | null;
            contractDate: string | null;
            companyId: string;
            company: string | null;
            subject: string;
            officialReport: boolean;
            dailyReport: string;
            officialReportDelivery: string;
            dailyReportDelivery: string;
            poNumber: string;
            poDate: string;
            date: string;
            startDate: string;
            endDate: string | null;
            number: string;
            officeBranchId: string;
            status: import(".prisma/client").$Enums.WorkOrderStatus;
            id: string;
            version: number;
            createdAt: Date;
            updatedAt: Date;
            revoked: boolean;
            quotationId: string | null;
            createdById: string;
            createdByName: string;
            contractId: string | null;
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
    get(id: string, actor: Actor): Promise<{
        number: string;
        officeBranchId: string;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        date: Date;
        id: string;
        version: number;
        subject: string;
        createdAt: Date;
        updatedAt: Date;
        items: {
            id: string;
            itemSizeId: string;
            quantityInspection: Prisma.Decimal;
            quantityMaintenance: Prisma.Decimal;
            workOrderId: string;
            item: Prisma.JsonValue;
        }[];
        revoked: boolean;
        companyId: string;
        quotationId: string | null;
        createdById: string;
        createdByName: string;
        contractId: string | null;
        startDate: Date;
        endDate: Date | null;
        inspectors: {
            name: string;
            id: string;
            position: number;
            workOrderId: string;
        }[];
        officialReport: boolean;
        dailyReport: Date;
        officialReportDelivery: Date;
        dailyReportDelivery: Date;
        poNumber: string;
        poDate: Date;
        updatedById: string | null;
        updatedByName: string | null;
    }>;
    update(id: string, input: UpdateWorkOrderInput, quote: QuotationSnapshot | ContractSnapshot | null, actor: Actor): Promise<WorkOrderWriteResult>;
    /**
     * DRAFT -> IN_PROGRESS. For quotation-based orders the stored snapshot is
     * compared against the live Marketing quotation (validated by the route before
     * the transaction starts), so an upstream call never holds database locks.
     * Contract/company-based orders transition without quotation validation.
     * The claim itself is an optimistic updateMany on status/version/revoked, so
     * concurrent starters cannot both succeed.
     */
    start(id: string, version: number, quote: QuotationSnapshot | null, actor: Actor): Promise<WorkOrderWriteResult>;
    revoke(id: string, version: number, actor: Actor): Promise<WorkOrderWriteResult>;
};
export {};
