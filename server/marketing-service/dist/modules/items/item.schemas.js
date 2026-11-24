"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemHistorySchema = exports.itemInspectionScopeIdSchema = exports.createItemScopeSchema = exports.addItemSizeSchema = exports.createItemSchema = exports.itemSizeIdSchema = exports.itemIdSchema = exports.updateContractPriceSchema = exports.createContractPriceSchema = exports.contractPriceIdSchema = exports.updateItemPriceSchema = exports.createItemPriceSchema = exports.updateItemSchema = exports.referenceKey = exports.referenceLabel = exports.versionSchema = exports.listContractPriceOptionsSchema = exports.contractPriceOptionsParamsSchema = exports.listContractItemSizesSchema = exports.listItemSizesSchema = exports.listItemsSchema = void 0;
const zod_1 = require("zod");
const list_config_js_1 = require("../../config/list.config.js");
const listQuery_js_1 = require("../../utils/listQuery.js");
exports.listItemsSchema = zod_1.z
    .object({
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.ITEM_LIST_CONFIG),
    ...list_config_js_1.ITEM_LIST_CONFIG.filterFields,
})
    .strict();
exports.listItemSizesSchema = zod_1.z
    .object({
    itemId: zod_1.z.string().uuid().optional(),
    ...(0, listQuery_js_1.createListQueryFields)(list_config_js_1.ITEM_SIZE_LIST_CONFIG),
    ...list_config_js_1.ITEM_SIZE_LIST_CONFIG.filterFields,
})
    .strict();
exports.listContractItemSizesSchema = exports.listItemSizesSchema.extend({
    companyId: zod_1.z.string().uuid(),
    exclude: zod_1.z.string().transform(value => value.split(',').map(id => id.trim()))
        .pipe(zod_1.z.array(zod_1.z.string().uuid()).min(1).max(100)).optional(),
}).transform(({ exclude, ...query }) => ({
    ...query,
    // Keep the existing notIn parameter compatible and apply both filters together.
    notIn: exclude || query.notIn
        ? [...new Set([...(query.notIn ?? []), ...(exclude ?? [])].map(id => id.toLowerCase()))]
        : undefined,
}));
exports.contractPriceOptionsParamsSchema = zod_1.z.object({ contractId: zod_1.z.string().uuid() }).strict();
exports.listContractPriceOptionsSchema = exports.listItemSizesSchema;
// Do not coerce null, blank strings or booleans to zero.
const price = zod_1.z.union([zod_1.z.number().finite().nonnegative().max(Number.MAX_SAFE_INTEGER / 100), zod_1.z.string().regex(/^\d{1,16}(\.\d{1,2})?$/)])
    .refine((value) => typeof value === 'string' || /^\d+(\.\d{1,2})?$/.test(String(value)), 'Price must have at most two decimal places');
const priceFields = {
    priceServicePrimary: price,
    priceServiceSisterCompany: price.nullable().optional(),
    priceMaintenancePrimary: price.nullable().optional(),
    priceMaintenanceSisterCompany: price.nullable().optional(),
};
exports.versionSchema = zod_1.z.object({ version: zod_1.z.number().int().nonnegative() }).strict();
const referenceLabel = (max) => zod_1.z.string().trim().min(1).max(max).transform(value => value.normalize('NFKC').replace(/\s+/g, ' ').trim()).pipe(zod_1.z.string().min(1).max(max));
exports.referenceLabel = referenceLabel;
const referenceKey = (value) => value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();
exports.referenceKey = referenceKey;
// serviceId is nullable: null detaches the item from its service and makes it standalone.
// An omitted serviceId keeps the current service unchanged.
exports.updateItemSchema = exports.versionSchema.extend({
    name: (0, exports.referenceLabel)(200).optional(),
    uom: (0, exports.referenceLabel)(50).optional(),
    serviceId: zod_1.z.string().uuid().nullable().optional(),
})
    .refine(value => value.name !== undefined || value.uom !== undefined || value.serviceId !== undefined, 'At least one editable field is required');
exports.createItemPriceSchema = zod_1.z.object(priceFields).strict();
exports.updateItemPriceSchema = exports.createItemPriceSchema.partial().extend({ version: exports.versionSchema.shape.version, isActive: zod_1.z.boolean().optional() })
    .refine(value => Object.keys(value).some(key => key !== 'version'), 'At least one editable field is required');
exports.contractPriceIdSchema = zod_1.z.object({ contractPriceId: zod_1.z.string().uuid() }).strict();
exports.createContractPriceSchema = zod_1.z.object({ contractId: zod_1.z.string().uuid(), priceService: price, priceMaintenance: price.nullable().optional() }).strict();
exports.updateContractPriceSchema = exports.versionSchema.extend({ priceService: price.optional(), priceMaintenance: price.nullable().optional(), isActive: zod_1.z.boolean().optional() })
    .refine(value => Object.keys(value).some(key => key !== 'version'), 'At least one editable field is required');
// Standard prices travel with a size. The same fields are accepted when creating an
// item with sizes and when adding a single size to an existing item.
const sizePriceFields = {
    priceServicePrimary: price.optional(),
    priceServiceSisterCompany: price.nullable().optional(),
    priceMaintenancePrimary: price.nullable().optional(),
    priceMaintenanceSisterCompany: price.nullable().optional(),
};
const size = zod_1.z.object({
    size: (0, exports.referenceLabel)(100).nullable(),
    // Optional normal and sister prices, validated like POST /items/sizes/:itemSizeId/price.
    ...sizePriceFields,
}).strict();
exports.itemIdSchema = zod_1.z.object({ itemId: zod_1.z.string().uuid() }).strict();
exports.itemSizeIdSchema = zod_1.z.object({ itemSizeId: zod_1.z.string().uuid() }).strict();
exports.createItemSchema = zod_1.z
    .object({
    serviceId: zod_1.z.string().uuid().nullable().optional(),
    inspectionScopes: zod_1.z.array((0, exports.referenceLabel)(500)).max(100).default([])
        .refine(values => new Set(values.map(exports.referenceKey)).size === values.length, 'Inspection scopes must be unique'),
    maintenanceScopes: zod_1.z.array((0, exports.referenceLabel)(500)).max(100).default([])
        .refine(values => new Set(values.map(exports.referenceKey)).size === values.length, 'Maintenance scopes must be unique'),
    name: (0, exports.referenceLabel)(200),
    uom: (0, exports.referenceLabel)(50),
    sizes: zod_1.z.array(size).max(100).default([]),
})
    .strict()
    .superRefine((value, ctx) => {
    if (value.serviceId && (value.inspectionScopes.length || value.maintenanceScopes.length)) {
        ctx.addIssue({ code: zod_1.z.ZodIssueCode.custom, path: ['serviceId'], message: 'An item with a service cannot have scopes' });
    }
    if (!value.serviceId && value.maintenanceScopes.length) {
        ctx.addIssue({ code: zod_1.z.ZodIssueCode.custom, path: ['maintenanceScopes'], message: 'A standalone item can only have inspectionScopes' });
    }
});
exports.addItemSizeSchema = zod_1.z.object({
    itemId: zod_1.z.string().uuid(),
    itemVersion: exports.versionSchema.shape.version,
    size: (0, exports.referenceLabel)(100).nullable(),
    // Optional normal and sister prices, validated like POST /items/sizes/:itemSizeId/price.
    ...sizePriceFields,
}).strict();
exports.createItemScopeSchema = zod_1.z.object({
    inspectionScopes: zod_1.z.array((0, exports.referenceLabel)(500)).min(1).max(100)
        .refine(values => new Set(values.map(exports.referenceKey)).size === values.length, 'Inspection scopes must be unique'),
}).strict();
exports.itemInspectionScopeIdSchema = zod_1.z.object({ itemId: zod_1.z.string().uuid() }).strict();
exports.itemHistorySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
}).strict();
//# sourceMappingURL=item.schemas.js.map