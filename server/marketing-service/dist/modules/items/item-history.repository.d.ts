import { Prisma } from '@prisma/client';
type HistoryKind = 'ITEM' | 'ITEM_SIZE' | 'ITEM_PRICE';
export declare const itemHistoryRepository: {
    read: (kind: HistoryKind, id: string, officeBranchId: string, input: {
        page: number;
        limit: number;
    }) => Promise<{
        entityType: HistoryKind;
        entityId: string;
        history: {
            id: string;
            entityType: string;
            entityId: string;
            action: string;
            actionLabel: string;
            version: number;
            changedBy: {
                id: string;
                name: string;
            };
            changedAt: Date;
            changes: {
                field: string;
                label: string;
                before: string | number | boolean | Prisma.JsonObject | Prisma.JsonArray | null;
                after: string | number | boolean | Prisma.JsonObject | Prisma.JsonArray | null;
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
export {};
