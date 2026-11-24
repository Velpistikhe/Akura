"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPANY_STAFF_LIST_CONFIG = exports.ITEM_SIZE_LIST_CONFIG = exports.ITEM_LIST_CONFIG = exports.SERVICE_LIST_CONFIG = exports.COMPANY_LIST_CONFIG = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const pagination = {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
};
const booleanFilter = zod_1.z.enum(['true', 'false']).transform((value) => value === 'true').optional();
exports.COMPANY_LIST_CONFIG = {
    sortFields: ['name', 'type', 'address', 'isSisterCompany', 'version', 'updatedAt'],
    filterFields: {
        search: zod_1.z.string().trim().min(1).max(100).optional(),
        isSisterCompany: booleanFilter,
    },
    pagination,
};
exports.SERVICE_LIST_CONFIG = {
    sortFields: ['name', 'type', 'isActive'],
    filterFields: {
        type: zod_1.z.nativeEnum(client_1.ServiceType).optional(),
        name: zod_1.z.string().trim().min(1).max(200).optional(),
        isActive: booleanFilter,
        hasMaintenance: booleanFilter,
    },
    pagination,
};
exports.ITEM_LIST_CONFIG = {
    sortFields: ['name', 'serviceName'],
    filterFields: {
        name: zod_1.z.string().trim().min(1).max(200).optional(),
        serviceName: zod_1.z.string().trim().min(1).max(200).optional(),
    },
    pagination,
};
exports.ITEM_SIZE_LIST_CONFIG = {
    sortFields: ['size'],
    filterFields: {
        notIn: zod_1.z.string().transform((value) => value.split(',').map((id) => id.trim()))
            .pipe(zod_1.z.array(zod_1.z.string().uuid()).min(1).max(100)).optional(),
        size: zod_1.z.string().trim().min(1).max(100).optional(),
        itemName: zod_1.z.string().trim().min(1).max(200).optional(),
        serviceName: zod_1.z.string().trim().min(1).max(200).optional(),
    },
    pagination,
};
exports.COMPANY_STAFF_LIST_CONFIG = {
    sortFields: ['companyId', 'name', 'title', 'version', 'updatedAt'],
    filterFields: {
        companyId: zod_1.z.string().uuid().optional(),
        search: zod_1.z.string().trim().min(1).max(100).optional(),
        title: zod_1.z.nativeEnum(client_1.StaffTitle).optional(),
    },
    pagination,
};
//# sourceMappingURL=list.config.js.map