"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractExcelController = exports.uploadContractWorkbook = void 0;
const multer_1 = __importDefault(require("multer"));
const db_js_1 = require("../../config/db.js");
const officeBranch_js_1 = require("../../utils/officeBranch.js");
const httpError_js_1 = require("../../utils/httpError.js");
const item_service_js_1 = require("../items/item.service.js");
const contract_excel_repository_js_1 = require("./contract-excel.repository.js");
const contract_excel_workbook_js_1 = require("./contract-excel.workbook.js");
const contract_excel_schemas_js_1 = require("./contract-excel.schemas.js");
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: contract_excel_schemas_js_1.MAX_EXCEL_BYTES, files: 1, fields: 2, parts: 4, fieldSize: 200 },
    fileFilter: (_req, file, callback) => {
        if (!file.originalname.toLowerCase().endsWith('.xlsx'))
            callback(new httpError_js_1.HttpError('Only .xlsx files are accepted', 400));
        else
            callback(null, true);
    },
}).single('file');
const uploadContractWorkbook = (req, res, next) => {
    if (!req.is('multipart/form-data')) {
        next(new httpError_js_1.HttpError('Use multipart/form-data with a file field', 400));
        return;
    }
    upload(req, res, error => {
        if (error instanceof multer_1.default.MulterError) {
            next(new httpError_js_1.HttpError(error.code === 'LIMIT_FILE_SIZE' ? 'Excel file exceeds 5 MB' : 'Upload one file with companyId and version', error.code === 'LIMIT_FILE_SIZE' ? 413 : 400));
            return;
        }
        next(error);
    });
};
exports.uploadContractWorkbook = uploadContractWorkbook;
exports.contractExcelController = {
    download: async (_req, res) => {
        const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
        if (res.locals.query.companyId) {
            const company = await db_js_1.prisma.company.findFirst({
                where: { id: res.locals.query.companyId, officeBranchId: branch, revoked: false },
                select: { id: true },
            });
            if (!company)
                throw new httpError_js_1.HttpError('Company not found in the current branch', 404);
        }
        await item_service_js_1.itemService.validateSizeListItem({ ...res.locals.query, page: 1, limit: 1 }, branch);
        const rows = await contract_excel_repository_js_1.contractExcelRepository.exportSizes(res.locals.query, branch);
        const buffer = await (0, contract_excel_workbook_js_1.createPriceWorkbook)(rows, branch);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="akura-normal-prices.xlsx"');
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).send(buffer);
    },
    upload: async (req, res) => {
        try {
            const branch = (0, officeBranch_js_1.getOfficeBranchId)(res);
            if (!req.file)
                throw new httpError_js_1.HttpError('Excel file is required', 400);
            const rows = await (0, contract_excel_workbook_js_1.parsePriceWorkbook)(req.file.buffer, branch);
            const result = await contract_excel_repository_js_1.contractExcelRepository.importPrices(res.locals.params.contractId, res.locals.body.companyId, res.locals.body.version, rows, branch, (0, officeBranch_js_1.getAuditActor)(res));
            res.status(201).json({ status: 201, success: true, data: result, requestId: req.headers['x-request-id'] });
        }
        catch (error) {
            if (!(error instanceof contract_excel_schemas_js_1.ExcelImportError))
                throw error;
            res.status(error.statusCode).json({ status: error.statusCode, success: false, message: error.message, errors: error.errors, requestId: req.headers['x-request-id'] });
        }
    },
};
//# sourceMappingURL=contract-excel.controller.js.map