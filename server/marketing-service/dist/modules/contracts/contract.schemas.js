"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractHistoryQuerySchema = exports.listContractsSchema = exports.contractIdSchema = exports.terminateContractSchema = exports.reviseContractSchema = exports.updateContractSchema = exports.createContractSchema = exports.contractStatusSchema = void 0;
const zod_1 = require("zod");
const item_schemas_js_1 = require("../items/item.schemas.js");
exports.contractStatusSchema = zod_1.z.enum(['DRAFT', 'SUBMITTED', 'REJECTED', 'APPROVED', 'TERMINATED', 'REVISED']);
const dates = {
    effectiveFrom: zod_1.z.string().date().transform(value => new Date(`${value}T00:00:00.000Z`)),
    effectiveUntil: zod_1.z.string().date().transform(value => new Date(`${value}T00:00:00.000Z`)),
};
const contractDate = zod_1.z.string().date().transform(value => new Date(`${value}T00:00:00.000Z`));
const validPeriod = (value) => value.effectiveUntil >= value.effectiveFrom;
const validContractDate = (value) => !value.contractDate || value.contractDate <= value.effectiveFrom;
const contractDateMessage = 'contractDate must be on or before effectiveFrom';
exports.createContractSchema = zod_1.z.object({
    companyId: zod_1.z.string().uuid(), contractNumber: zod_1.z.string().trim().min(1).max(255), contractDate,
    ...dates,
}).strict()
    .refine(validPeriod, 'effectiveUntil must be after effectiveFrom')
    .refine(validContractDate, contractDateMessage);
const contractChangeSchema = item_schemas_js_1.versionSchema.extend({
    contractNumber: zod_1.z.string().trim().min(1).max(255), contractDate,
    ...dates,
}).strict()
    .refine(validPeriod, 'effectiveUntil must be after effectiveFrom')
    .refine(validContractDate, contractDateMessage);
exports.updateContractSchema = contractChangeSchema;
exports.reviseContractSchema = contractChangeSchema;
exports.terminateContractSchema = item_schemas_js_1.versionSchema.extend({ terminatedAt: zod_1.z.string().date().transform(value => new Date(`${value}T00:00:00.000Z`)) }).strict();
exports.contractIdSchema = zod_1.z.object({ contractId: zod_1.z.string().uuid() }).strict();
exports.listContractsSchema = zod_1.z.object({
    companyId: zod_1.z.string().uuid().optional(), page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    status: exports.contractStatusSchema.optional(),
}).strict();
exports.contractHistoryQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
}).strict();
//# sourceMappingURL=contract.schemas.js.map