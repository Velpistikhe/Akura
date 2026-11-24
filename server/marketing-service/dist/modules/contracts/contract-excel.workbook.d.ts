import ExcelJS from 'exceljs';
import { contractExcelRepository } from './contract-excel.repository.js';
import { ExcelPriceRow } from './contract-excel.schemas.js';
export declare function createPriceWorkbook(sizes: Awaited<ReturnType<typeof contractExcelRepository.exportSizes>>, branch: string): Promise<Buffer<ExcelJS.Buffer>>;
export declare function parsePriceWorkbook(buffer: Buffer, branch: string): Promise<ExcelPriceRow[]>;
