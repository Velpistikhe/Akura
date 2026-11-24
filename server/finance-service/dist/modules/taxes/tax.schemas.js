"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaxSchema = void 0;
const zod_1 = require("zod");
const percentage = zod_1.z.union([zod_1.z.string(), zod_1.z.number().finite().transform(String)])
    .pipe(zod_1.z.string().regex(/^\d{1,3}(\.\d{1,2})?$/))
    .refine(value => Number(value) <= 100, 'Tax percentage must be between 0 and 100');
exports.createTaxSchema = zod_1.z.object({
    percentage,
    effectiveFrom: zod_1.z.string().date().refine(value => value >= '0001-01-01', 'Invalid effective date')
        .transform(value => new Date(`${value}T00:00:00.000Z`)),
}).strict();
//# sourceMappingURL=tax.schemas.js.map