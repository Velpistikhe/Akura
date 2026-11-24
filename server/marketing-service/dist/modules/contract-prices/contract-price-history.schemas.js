"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listContractPricesSchema = exports.contractPriceHistoryQuerySchema = exports.contractPriceHistoryParamsSchema = void 0;
const zod_1 = require("zod");
exports.contractPriceHistoryParamsSchema = zod_1.z.object({ contractPriceId: zod_1.z.string().uuid() }).strict();
exports.contractPriceHistoryQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1), limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
}).strict();
exports.listContractPricesSchema = zod_1.z.object({
    contractId: zod_1.z.string().uuid().optional(), companyId: zod_1.z.string().uuid().optional(), itemSizeId: zod_1.z.string().uuid().optional(),
    isActive: zod_1.z.enum(['true', 'false']).transform(value => value === 'true').optional(),
    search: zod_1.z.string().trim().min(1).max(200).optional(), page: zod_1.z.coerce.number().int().positive().default(1), limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    sortBy: zod_1.z.enum(['priceService', 'priceMaintenance', 'effectiveFrom', 'effectiveUntil', 'createdAt', 'updatedAt']).optional(), sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
}).strict();
//# sourceMappingURL=contract-price-history.schemas.js.map