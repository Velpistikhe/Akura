"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelImportError = exports.importContractExcelSchema = exports.exportItemSizesSchema = exports.MAX_EXCEL_BYTES = exports.MAX_EXCEL_ROWS = void 0;
const zod_1 = require("zod");
const item_schemas_js_1 = require("../items/item.schemas.js");
exports.MAX_EXCEL_ROWS = 2000;
exports.MAX_EXCEL_BYTES = 5 * 1024 * 1024;
exports.exportItemSizesSchema = item_schemas_js_1.listItemSizesSchema.omit({ page: true, limit: true }).extend({ companyId: zod_1.z.string().uuid().optional() });
exports.importContractExcelSchema = zod_1.z.object({
    companyId: zod_1.z.string().uuid(),
    version: zod_1.z.string().regex(/^\d+$/).transform(Number).pipe(zod_1.z.number().int().nonnegative().safe()),
}).strict();
class ExcelImportError extends Error {
    errors;
    statusCode;
    constructor(errors, statusCode = 400) {
        super('Excel import failed; no prices were saved');
        this.errors = errors;
        this.statusCode = statusCode;
    }
}
exports.ExcelImportError = ExcelImportError;
//# sourceMappingURL=contract-excel.schemas.js.map