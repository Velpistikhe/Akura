import { z } from 'zod';
export type SortDirection = 'asc' | 'desc';
type ListQueryConfig<TSortField extends string> = {
    sortFields: readonly [TSortField, ...TSortField[]];
    pagination: {
        defaultPage: number;
        defaultLimit: number;
        maxLimit: number;
    };
};
type BaseListQuery<TSortField extends string> = {
    page: number;
    limit: number;
    sortBy?: TSortField;
    sortOrder: SortDirection;
};
type FilterRules<TInput, TWhere extends object> = {
    [K in keyof TInput]?: (value: NonNullable<TInput[K]>) => Partial<TWhere>;
};
export declare const createListQueryFields: <TSortField extends string>(config: ListQueryConfig<TSortField>) => {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<[TSortField, ...TSortField[]]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
};
export declare const defineSortRules: <TSortField extends string, TOrderBy>(rules: Record<TSortField, (direction: SortDirection) => TOrderBy>) => Record<TSortField, (direction: SortDirection) => TOrderBy>;
export declare const buildListQuery: <TSortField extends string, TInput extends BaseListQuery<TSortField>, TWhere extends object, TOrderBy>(input: TInput, rules: {
    baseWhere?: TWhere;
    filters: FilterRules<TInput, TWhere>;
    sorts: Record<TSortField, (direction: SortDirection) => TOrderBy>;
    defaultSort: TOrderBy;
}) => {
    where: TWhere;
    orderBy: TOrderBy;
    skip: number;
    take: number;
};
export declare const buildPagination: (page: number, limit: number, total: number) => {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};
/** Builds the query, executes it, and returns a consistent paginated result. */
export declare const findAll: <TItem, TSortField extends string, TInput extends BaseListQuery<TSortField>, TWhere extends object, TOrderBy>(input: TInput, rules: Parameters<typeof buildListQuery<TSortField, TInput, TWhere, TOrderBy>>[1], findMany: (query: {
    where: TWhere;
    orderBy: TOrderBy;
    skip: number;
    take: number;
}) => Promise<TItem[]>, count: (where: TWhere) => Promise<number>) => Promise<{
    items: TItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export {};
