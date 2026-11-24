export declare const catalogSchemas: {
    CompanyContractPriceHistoryResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    ContractCatalogSnapshot: {
        readOnly: boolean;
        description: string;
        type: string;
        required: string[];
        properties: object;
    };
    CompanyHistorySnapshot: {
        description: string;
        example: {
            id: string;
            officeBranchId: string;
            name: string;
            normalizeName: string;
            npwp: string;
            type: string;
            address: string;
            isSisterCompany: boolean;
            revoked: boolean;
            version: number;
            createdById: string;
            updatedById: string;
            createdAt: string;
            updatedAt: string;
        };
        type: string;
        required: string[];
        properties: object;
    };
    CompanyStaffHistorySnapshot: {
        description: string;
        example: {
            id: string;
            companyId: string;
            name: string;
            normalizeName: string;
            title: string;
            telp: null;
            email: string;
            revoked: boolean;
            version: number;
            createdById: string;
            updatedById: string;
            createdAt: string;
            updatedAt: string;
            company: {
                id: string;
                name: string;
                type: string;
                version: number;
            };
        };
        type: string;
        required: string[];
        properties: object;
    };
    CompanyHistory: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyStaffHistory: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyHistoryResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyStaffHistoryResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyStaffAggregateHistoryResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CatalogMoney: {
        oneOf: ({
            type: string;
            minimum: number;
            maximum: number;
            multipleOf: number;
            pattern?: undefined;
        } | {
            type: string;
            pattern: string;
            minimum?: undefined;
            maximum?: undefined;
            multipleOf?: undefined;
        })[];
        description: string;
    };
    CatalogNullableMoney: {
        nullable: boolean;
        oneOf: ({
            type: string;
            minimum: number;
            maximum: number;
            multipleOf: number;
            pattern?: undefined;
        } | {
            type: string;
            pattern: string;
            minimum?: undefined;
            maximum?: undefined;
            multipleOf?: undefined;
        })[];
        description: string;
    };
    CatalogVersionRequest: {
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    CreateItemInspectionScopesRequest: {
        description: string;
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    UpdateItemRequest: {
        minProperties: number;
        description: string;
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    CatalogPriceRequest: {
        description: string;
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    UpdateContractPriceRequest: {
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    UpdateCatalogPriceRequest: {
        minProperties: number;
        description: string;
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    CreateContractPriceRequest: {
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    CreateCompanyContractRequest: {
        description: string;
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    UpdateCompanyContractRequest: {
        description: string;
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    ReviseCompanyContractRequest: {
        description: string;
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    TerminateCompanyContractRequest: {
        additionalProperties: boolean;
        type: string;
        required: string[];
        properties: object;
    };
    CatalogItemPrice: {
        type: string;
        required: string[];
        properties: object;
    };
    CatalogItemPriceResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyContract: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyContractResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyContractPrice: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyContractPriceResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyContractPriceListResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyContractListResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CompanyContractHistoryResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    ContractPriceOption: {
        type: string;
        required: string[];
        properties: object;
    };
    ContractPriceOptionListResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CatalogContractSizeListResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CatalogSizeDetailResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    CatalogItemMutationResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    QuotationSizeOption: {
        type: string;
        required: string[];
        properties: object;
    };
    ResolvedPriceListResponse: {
        type: string;
        required: string[];
        properties: object;
    };
    ItemCatalogHistoryResponse: {
        type: string;
        required: string[];
        properties: object;
    };
};
export declare const catalogPaths: {
    "/api/v1/marketing/items/{itemId}/history": {
        get: {
            tags: string[];
            summary: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            description: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: object;
            }[];
            responses: {
                200: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
            };
        };
    };
    "/api/v1/marketing/items/sizes/{itemSizeId}/history": {
        get: {
            tags: string[];
            summary: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            description: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: object;
            }[];
            responses: {
                200: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
            };
        };
    };
    "/api/v1/marketing/items/sizes/{itemSizeId}/price/history": {
        get: {
            tags: string[];
            summary: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            description: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: object;
            }[];
            responses: {
                200: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
            };
        };
    };
    "/api/v1/marketing/company-staffs/{companyStaffId}/history": {
        get: {
            tags: string[];
            summary: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            description: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: object;
            }[];
            responses: {
                200: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
            };
        };
    };
    "/api/v1/marketing/companies/{companyId}/staff-history": {
        get: {
            tags: string[];
            summary: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            description: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: object;
            }[];
            responses: {
                200: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
            };
        };
    };
    "/api/v1/marketing/companies/{companyId}/history": {
        get: {
            tags: string[];
            summary: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            description: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: object;
            }[];
            responses: {
                200: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
            };
        };
    };
    "/api/v1/marketing/items/sizes/export": {
        get: {
            tags: string[];
            summary: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: object;
            }[];
            description: string;
            responses: {
                200: {
                    description: string;
                    content: {
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
                            schema: {
                                type: string;
                                format: string;
                            };
                        };
                    };
                };
                400: {
                    description: string;
                };
                401: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
                403: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
                404: {
                    description: string;
                };
            };
        };
    };
    "/api/v1/marketing/company-contracts/{contractId}/prices/import": {
        post: {
            tags: string[];
            summary: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: object;
            }[];
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    'multipart/form-data': {
                        schema: {
                            additionalProperties: boolean;
                            type: string;
                            required: string[];
                            properties: object;
                        };
                    };
                };
            };
            responses: {
                201: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
                400: {
                    description: string;
                };
                401: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    description: string;
                };
                403: {
                    description: string;
                };
                404: {
                    description: string;
                };
                409: {
                    description: string;
                };
                413: {
                    description: string;
                };
            };
        };
    };
    "/api/v1/marketing/items": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/{itemId}": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        patch: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        delete: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/{itemId}/scopes": {
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/sizes/prices": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/sizes": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/sizes/{itemSizeId}": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        delete: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/sizes/{itemSizeId}/price": {
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        patch: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/sizes/{itemSizeId}/contract-prices": {
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/contract-prices/{contractPriceId}": {
        patch: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        delete: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contract-prices": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/items/sizes/contract-price-options/{contractId}": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contracts": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contracts/{contractId}": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        patch: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
        delete: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contracts/{contractId}/history": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contracts/{contractId}/revise": {
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contracts/{contractId}/submit": {
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contracts/{contractId}/reject": {
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contracts/{contractId}/terminate": {
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contract-prices/{contractPriceId}/history": {
        get: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
    "/api/v1/marketing/company-contracts/{contractId}/approve": {
        post: {
            responses: {};
            requestBody?: {
                content: {
                    'application/json': {
                        schema: object;
                    };
                };
                required: boolean;
            } | undefined;
            tags: string[];
            summary: string;
            description: string;
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
        };
    };
};
