"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuotationItemSchema = exports.addQuotationItemSchema = exports.updateQuotationSchema = exports.quotationHistoryQuerySchema = exports.reviseQuotationSchema = exports.rejectQuotationSchema = exports.submitQuotationSchema = exports.approveQuotationSchema = exports.deactivateQuotationSchema = exports.createQuotationSchema = exports.listQuotationsSchema = exports.quotationIdSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.quotationIdSchema = zod_1.z.object({ quotationId: zod_1.z.string().uuid() }).strict();
exports.listQuotationsSchema = zod_1.z.object({
    isActive: zod_1.z.enum(['true', 'false']).transform(value => value === 'true').optional(),
    dateFrom: zod_1.z.string().date().transform((value) => new Date(`${value}T00:00:00.000Z`)).optional(),
    dateTo: zod_1.z.string().date().transform((value) => new Date(`${value}T00:00:00.000Z`)).optional(),
    no: zod_1.z.coerce.number().int().min(1).max(2147483647).optional(),
    status: zod_1.z.nativeEnum(client_1.QuotationStatus).optional(),
    company: zod_1.z.string().trim().min(1).max(255).optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
}).strict().refine(value => !value.dateFrom || !value.dateTo || value.dateFrom <= value.dateTo, {
    message: 'dateFrom must be on or before dateTo', path: ['dateTo'],
});
const text = zod_1.z.string().trim().min(1).max(255);
// Long free-text fields are stored as PostgreSQL TEXT so internal newlines are preserved.
const supplyText = zod_1.z.string().trim().min(1).max(5000);
const date = zod_1.z.string().date().transform((value) => new Date(`${value}T00:00:00.000Z`));
// Accept decimal strings without passing through floating-point arithmetic.
const decimal = (scale) => zod_1.z.string().regex(new RegExp(`^\\d{1,12}(\\.\\d{1,${scale}})?$`));
const quantity = zod_1.z.union([decimal(3), zod_1.z.number().finite().nonnegative().transform(String).pipe(decimal(3))]);
// Discount is a percentage between 0 and 100 with at most two decimals; the range
// check compares the numeric value of the already validated string, so no float is stored.
const discountText = zod_1.z.string()
    .regex(new RegExp('^\\d{1,3}(\\.\\d{1,2})?$'))
    .refine(value => Number(value) <= 100, 'Discount must be between 0 and 100');
const discountValue = zod_1.z.union([discountText, zod_1.z.number().finite().nonnegative().transform(String).pipe(discountText)]);
const note = zod_1.z.string().trim().max(5000).nullable().optional();
const itemFields = {
    id: zod_1.z.string().uuid().optional(), itemSizeId: zod_1.z.string().uuid(),
    note,
    quantityInspection: quantity,
    quantityMaintenance: quantity.default('0'),
    // Discount percentage (0-100) applied to both resolved unit prices before subTotal.
    discount: discountValue.default('0'),
};
const item = zod_1.z.object(itemFields).strict().refine(value => /[1-9]/.test(value.quantityInspection) || /[1-9]/.test(value.quantityMaintenance), 'At least one quantity must be positive');
const items = zod_1.z.array(item).min(1).max(100).refine((rows) => {
    const ids = rows.flatMap((row) => row.id ? [row.id] : []);
    return ids.length === new Set(ids).size;
}, 'Item IDs must be unique').refine(rows => new Set(rows.map(row => row.itemSizeId.toLowerCase())).size === rows.length, 'Each size may appear only once; enter both quantities on the same line');
const fields = {
    date: date.nullable().optional(),
    jobStart: zod_1.z.string().trim().min(1).max(255),
    inquiryMethod: zod_1.z.nativeEnum(client_1.InquiryMethod),
    inquiryDate: date,
    subject: text, termOfPayment: text, validity: text,
    supplyAkura: supplyText, supplyCustomer: supplyText, location: text,
    accomplished: supplyText, deliveryReports: supplyText,
    deliveryInvoice: supplyText,
    companyId: zod_1.z.string().uuid().optional(),
    staffId: zod_1.z.string().uuid(),
    items,
};
exports.createQuotationSchema = zod_1.z.object(fields).strict()
    .refine(value => !!value.staffId, 'Staff is required')
    .refine((value) => value.items.every((row) => !row.id), 'New quotation items cannot supply IDs');
exports.deactivateQuotationSchema = zod_1.z.object({ version: zod_1.z.number().int().nonnegative().max(2147483646) }).strict();
exports.approveQuotationSchema = exports.deactivateQuotationSchema;
exports.submitQuotationSchema = exports.deactivateQuotationSchema;
exports.rejectQuotationSchema = exports.deactivateQuotationSchema;
exports.reviseQuotationSchema = exports.deactivateQuotationSchema;
exports.quotationHistoryQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    action: zod_1.z.string().trim().min(1).max(20).optional(),
    sortBy: zod_1.z.enum(['version', 'createdAt', 'action']).default('version'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
}).strict();
const editableHeaderFields = {
    jobStart: fields.jobStart.optional(), inquiryMethod: fields.inquiryMethod.optional(), inquiryDate: fields.inquiryDate.optional(),
    subject: fields.subject.optional(), termOfPayment: fields.termOfPayment.optional(), validity: fields.validity.optional(),
    supplyAkura: fields.supplyAkura.optional(), supplyCustomer: fields.supplyCustomer.optional(), location: fields.location.optional(),
    accomplished: fields.accomplished.optional(), deliveryReports: fields.deliveryReports.optional(), deliveryInvoice: fields.deliveryInvoice.optional(),
    staffId: fields.staffId.optional(),
};
exports.updateQuotationSchema = zod_1.z.object({
    version: zod_1.z.number().int().nonnegative().max(2147483646), ...editableHeaderFields,
}).strict().refine(value => Object.keys(value).some(key => key !== 'version'), 'At least one editable field is required');
exports.addQuotationItemSchema = zod_1.z.object({
    version: zod_1.z.number().int().nonnegative().max(2147483646), itemSizeId: itemFields.itemSizeId, note: itemFields.note,
    quantityInspection: itemFields.quantityInspection, quantityMaintenance: itemFields.quantityMaintenance, discount: itemFields.discount,
}).strict();
exports.deleteQuotationItemSchema = zod_1.z.object({
    quotationVersion: zod_1.z.number().int().nonnegative().max(2147483646),
    itemVersion: zod_1.z.number().int().nonnegative().max(2147483646),
}).strict();
//# sourceMappingURL=quotation.schemas.js.map