"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationOptions = exports.resolveQuotationPrice = exports.catalogSnapshot = exports.quotationSizeInclude = exports.priceContext = void 0;
const client_1 = require("@prisma/client");
const businessDate_js_1 = require("../../utils/businessDate.js");
const httpError_js_1 = require("../../utils/httpError.js");
const priceContext = async (tx, companyId, branch, now) => {
    const company = await tx.company.findFirst({ where: { id: companyId, officeBranchId: branch, revoked: false } });
    if (!company)
        throw new httpError_js_1.HttpError('Company not found', 404);
    const today = (0, businessDate_js_1.currentBusinessDate)(now);
    const contracts = await tx.companyContract.findMany({
        where: {
            companyId, isDeleted: false, status: 'APPROVED', effectiveFrom: { lte: today }, effectiveUntil: { gt: today },
            company: { officeBranchId: branch, revoked: false },
        },
        orderBy: [{ effectiveFrom: 'desc' }, { id: 'asc' }], take: 2,
    });
    if (contracts.length > 1)
        throw new httpError_js_1.HttpError('Multiple current contracts found', 409);
    return { company, contract: contracts.length ? contracts[0] : null };
};
exports.priceContext = priceContext;
exports.quotationSizeInclude = {
    price: true, contractPrices: true, item: { include: { service: true } },
};
const validPrice = (price, now) => !!price && price.isActive && price.effectiveFrom <= now && (price.effectiveUntil === null || price.effectiveUntil > now);
const catalogSnapshot = (row) => {
    const service = row.item.service;
    const serviceName = service?.name ?? row.item.name;
    const serviceType = service?.type ?? 'OTHER';
    const hasMaintenance = service?.hasMaintenance ?? false;
    return { serviceName, serviceType, itemName: row.item.name, size: row.size, hasMaintenance };
};
exports.catalogSnapshot = catalogSnapshot;
const resolveQuotationPrice = (row, context, now) => {
    const service = row.item.service;
    const catalogActive = row.isActive && row.item.isActive && (!service || service.isActive);
    const contractPrice = context.contract ? (row.contractPrices ?? []).find(price => validPrice(price, now)) : null;
    const source = contractPrice ? 'CONTRACT' : context.company.isSisterCompany ? 'SISTER_COMPANY' : 'PRIMARY';
    const selected = row.price;
    const catalogAvailable = catalogActive && validPrice(selected, now);
    const standardService = !catalogAvailable ? null : source === 'SISTER_COMPANY' ? selected.priceServiceSisterCompany : selected.priceServicePrimary;
    const standardMaintenance = !catalogAvailable ? null : source === 'SISTER_COMPANY' ? selected.priceMaintenanceSisterCompany : selected.priceMaintenancePrimary;
    const priceService = contractPrice?.priceService ?? standardService;
    const priceMaintenance = contractPrice ? contractPrice.priceMaintenance : standardMaintenance;
    const priceAvailable = catalogActive && (contractPrice ? true : catalogAvailable);
    const snapshot = (0, exports.catalogSnapshot)(row);
    return {
        catalogSnapshot: snapshot, catalogActive, contractPrice: contractPrice ?? null,
        contractId: contractPrice?.contractId ?? null, contractVersion: contractPrice ? context.contract.version : null,
        priceSource: source, priceId: contractPrice?.id ?? selected?.id ?? null,
        priceVersion: contractPrice?.version ?? selected?.version ?? null,
        sizeVersion: row.version, itemVersion: row.item.version, serviceVersion: service?.version ?? null,
        priceStatus: priceAvailable && priceService !== null ? 'AVAILABLE' : 'UNAVAILABLE',
        priceMessage: priceAvailable && priceService !== null ? null : 'Contract, normal or sister price is unavailable',
        priceService, priceInspection: priceService, priceMaintenance: snapshot.hasMaintenance ? priceMaintenance : null,
    };
};
exports.resolveQuotationPrice = resolveQuotationPrice;
const quotationOptions = async (tx, input, context, branch, now) => {
    const contractId = context.contract?.id ?? '00000000-0000-0000-0000-000000000000';
    const sizeLabel = client_1.Prisma.sql `s.size`;
    const itemLabel = client_1.Prisma.sql `i.name`;
    const serviceLabel = client_1.Prisma.sql `COALESCE(svc.name, i.name)`;
    const serviceNameFilter = input.serviceName ? client_1.Prisma.sql `AND strpos(lower(${serviceLabel}), lower(${input.serviceName})) > 0` : client_1.Prisma.empty;
    const from = client_1.Prisma.sql `FROM item_sizes s
    JOIN items i ON i.id = s.item_id
    LEFT JOIN services svc ON svc.id = i.service_id
    WHERE i.office_branch_id = ${branch}::uuid
      AND s.is_active AND i.is_active AND (svc.id IS NULL OR (svc.is_active AND svc.office_branch_id = ${branch}::uuid))
      ${input.itemId ? client_1.Prisma.sql `AND i.id = ${input.itemId}::uuid` : client_1.Prisma.empty}
      ${input.notIn?.length ? client_1.Prisma.sql `AND s.id::text NOT IN (${client_1.Prisma.join(input.notIn)})` : client_1.Prisma.empty}
      ${input.size ? client_1.Prisma.sql `AND strpos(lower(${sizeLabel}), lower(${input.size})) > 0` : client_1.Prisma.empty}
      ${input.itemName ? client_1.Prisma.sql `AND strpos(lower(${itemLabel}), lower(${input.itemName})) > 0` : client_1.Prisma.empty}
      ${serviceNameFilter}`;
    const order = input.sortBy === 'size'
        ? client_1.Prisma.sql `${sizeLabel} ${input.sortOrder === 'asc' ? client_1.Prisma.sql `ASC` : client_1.Prisma.sql `DESC`}`
        : client_1.Prisma.sql `s.created_at DESC`;
    const ids = await tx.$queryRaw(client_1.Prisma.sql `SELECT s.id ${from} ORDER BY ${order}, s.id ASC LIMIT ${input.limit} OFFSET ${(input.page - 1) * input.limit}`);
    const [count] = await tx.$queryRaw(client_1.Prisma.sql `SELECT count(*) AS total ${from}`);
    const rows = await tx.itemSize.findMany({ where: { id: { in: ids.map(row => row.id) } }, include: {
            ...exports.quotationSizeInclude, contractPrices: { where: { contractId } },
        } });
    const byId = new Map(rows.map(row => [row.id, row]));
    const sizes = ids.map(({ id }) => {
        const row = byId.get(id);
        const selected = (0, exports.resolveQuotationPrice)(row, context, now);
        const identity = selected.catalogSnapshot;
        return {
            id: row.id, itemId: row.itemId, size: identity.size, version: row.version,
            isActive: row.isActive, createdAt: row.createdAt, updatedAt: row.updatedAt,
            ...selected,
            item: { id: row.item.id, name: identity.itemName, uom: row.item.uom, version: row.item.version,
                service: row.item.service ? { id: row.item.service.id, name: identity.serviceName, type: identity.serviceType, hasMaintenance: identity.hasMaintenance, version: row.item.service.version } : null },
        };
    });
    const total = Number(count.total);
    return { company: { id: context.company.id, name: context.company.name, isSisterCompany: context.company.isSisterCompany }, sizes,
        pagination: { page: input.page, limit: input.limit, total, totalPages: Math.ceil(total / input.limit) } };
};
exports.quotationOptions = quotationOptions;
//# sourceMappingURL=quotation-price.js.map