"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workOrderSyncQuerySchema = void 0;
const zod_1 = require("zod");
/**
 * Query parameters of the Work Order synchronisation history.
 *
 * The endpoint returns the recorded deliveries of one Work Order, so the page
 * size is bounded like every other list endpoint in this service.
 */
exports.workOrderSyncQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).max(1000000).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
}).strict();
//# sourceMappingURL=work-order-sync.schemas.js.map