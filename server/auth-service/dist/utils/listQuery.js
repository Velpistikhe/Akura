"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPagination = exports.buildListQuery = exports.defineSortRules = exports.createListQueryFields = void 0;
const zod_1 = require("zod");
const createListQueryFields = (config) => ({
    page: zod_1.z.coerce.number().int().positive().default(config.pagination.defaultPage),
    limit: zod_1.z.coerce.number().int().min(1).max(config.pagination.maxLimit).default(config.pagination.defaultLimit),
    sortBy: zod_1.z.enum(config.sortFields).optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.createListQueryFields = createListQueryFields;
const defineSortRules = (rules) => rules;
exports.defineSortRules = defineSortRules;
const buildListQuery = (input, rules) => {
    const where = {};
    for (const key of Object.keys(rules.filters)) {
        const value = input[key];
        const filter = rules.filters[key];
        if (filter && value !== undefined && value !== null) {
            Object.assign(where, filter(value));
        }
    }
    return {
        where,
        orderBy: input.sortBy ? rules.sorts[input.sortBy](input.sortOrder) : rules.defaultSort,
        skip: (input.page - 1) * input.limit,
        take: input.limit,
    };
};
exports.buildListQuery = buildListQuery;
const buildPagination = (page, limit, total) => ({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
});
exports.buildPagination = buildPagination;
//# sourceMappingURL=listQuery.js.map