export declare const workOrderSchemas: {
    WorkOrderItem: {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
                format: string;
            };
            workOrderId: {
                type: string;
                format: string;
            };
            itemSizeId: {
                type: string;
                format: string;
            };
            item: {
                type: string;
                additionalProperties: boolean;
                required: string[];
                properties: {
                    itemSizeId: {
                        type: string;
                        format: string;
                    };
                    serviceName: {
                        type: string;
                    };
                    inspectionScope: {
                        type: string;
                        description: string;
                    };
                    maintenanceScope: {
                        type: string;
                        description: string;
                    };
                    itemName: {
                        type: string;
                    };
                    size: {
                        type: string;
                        nullable: boolean;
                        description: string;
                    };
                };
                readOnly: boolean;
                description: string;
            };
            quantityInspection: {
                type: string;
                format: string;
                pattern: string;
            };
            quantityMaintenance: {
                type: string;
                format: string;
                pattern: string;
            };
        };
    };
    WorkOrderCreate: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        properties: {
            endDate: {
                description: string;
                type: string;
                format: string;
            };
            inspectors: {
                minItems: number;
                description: string;
                type: string;
                maxItems: number;
                items: {
                    type: string;
                    minLength: number;
                    maxLength: number;
                };
            };
            items: {
                type: string;
                minItems: number;
                items: {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        itemSizeId: {
                            type: string;
                            format: string;
                        };
                        quantityInspection: {
                            type: string;
                            minimum: number;
                            maximum: number;
                            multipleOf: number;
                        };
                        quantityMaintenance: {
                            type: string;
                            minimum: number;
                            maximum: number;
                            multipleOf: number;
                        };
                    };
                };
            };
            companyId: {
                description: string;
                type: string;
                format: string;
            };
            subject: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            officialReport: {
                type: string;
                description: string;
            };
            dailyReport: {
                description: string;
                type: string;
                format: string;
            };
            officialReportDelivery: {
                description: string;
                type: string;
                format: string;
            };
            dailyReportDelivery: {
                description: string;
                type: string;
                format: string;
            };
            poNumber: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            poDate: {
                description: string;
                type: string;
                format: string;
            };
            contractId: {
                nullable: boolean;
                writeOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
            startDate: {
                type: string;
                format: string;
            };
        };
        example: {
            companyId: string;
            subject: string;
            officialReport: boolean;
            dailyReport: string;
            officialReportDelivery: string;
            dailyReportDelivery: string;
            poNumber: string;
            poDate: string;
            startDate: string;
            endDate: string;
            inspectors: string[];
            items: {
                itemSizeId: string;
                quantityInspection: number;
                quantityMaintenance: number;
            }[];
        };
        description: string;
    };
    WorkOrderCreateFromQuotation: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        properties: {
            quotationId: {
                type: string;
                format: string;
            };
            endDate: {
                description: string;
                type: string;
                format: string;
            };
            inspectors: {
                minItems: number;
                description: string;
                type: string;
                maxItems: number;
                items: {
                    type: string;
                    minLength: number;
                    maxLength: number;
                };
            };
            items: {
                type: string;
                minItems: number;
                items: {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        itemSizeId: {
                            type: string;
                            format: string;
                        };
                        quantityInspection: {
                            type: string;
                            minimum: number;
                            maximum: number;
                            multipleOf: number;
                        };
                        quantityMaintenance: {
                            type: string;
                            minimum: number;
                            maximum: number;
                            multipleOf: number;
                        };
                    };
                };
            };
            subject: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            officialReport: {
                type: string;
                description: string;
            };
            dailyReport: {
                description: string;
                type: string;
                format: string;
            };
            officialReportDelivery: {
                description: string;
                type: string;
                format: string;
            };
            dailyReportDelivery: {
                description: string;
                type: string;
                format: string;
            };
            poNumber: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            poDate: {
                description: string;
                type: string;
                format: string;
            };
            startDate: {
                type: string;
                format: string;
            };
        };
        example: {
            quotationId: string;
            startDate: string;
            endDate: string;
            inspectors: string[];
            items: {
                itemSizeId: string;
                quantityInspection: number;
                quantityMaintenance: number;
            }[];
        };
        description: string;
    };
    WorkOrderUpdate: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        minProperties: number;
        properties: {
            version: {
                type: string;
                minimum: number;
                maximum: number;
            };
            contractId: {
                nullable: boolean;
                writeOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
            quotationId: {
                nullable: boolean;
                description: string;
                type: string;
                format: string;
            };
            startDate: {
                type: string;
                format: string;
            };
            endDate: {
                nullable: boolean;
                description: string;
                type: string;
                format: string;
            };
            status: {
                description: string;
                type: string;
                enum: string[];
                default: string;
            };
            inspectors: {
                type: string;
                maxItems: number;
                items: {
                    type: string;
                    minLength: number;
                    maxLength: number;
                };
                description: string;
            };
        };
        description: string;
    };
    WorkOrderDelete: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        properties: {
            version: {
                type: string;
                minimum: number;
                maximum: number;
            };
        };
    };
    WorkOrderStart: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        properties: {
            version: {
                type: string;
                minimum: number;
                maximum: number;
            };
        };
        description: string;
        example: {
            version: number;
        };
    };
    WorkOrder: {
        type: string;
        properties: {
            items: {
                type: string;
                items: {
                    $ref: string;
                };
            };
            id: {
                type: string;
                format: string;
            };
            officeBranchId: {
                readOnly: boolean;
                type: string;
                format: string;
            };
            number: {
                type: string;
                readOnly: boolean;
                example: string;
            };
            date: {
                readOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
            startDate: {
                type: string;
                format: string;
            };
            endDate: {
                nullable: boolean;
                type: string;
                format: string;
            };
            contractId: {
                nullable: boolean;
                readOnly: boolean;
                type: string;
                format: string;
            };
            companyId: {
                readOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
            subject: {
                type: string;
                readOnly: boolean;
            };
            officialReport: {
                type: string;
                readOnly: boolean;
            };
            dailyReport: {
                readOnly: boolean;
                type: string;
                format: string;
            };
            officialReportDelivery: {
                readOnly: boolean;
                type: string;
                format: string;
            };
            dailyReportDelivery: {
                readOnly: boolean;
                type: string;
                format: string;
            };
            poNumber: {
                type: string;
                readOnly: boolean;
            };
            poDate: {
                readOnly: boolean;
                type: string;
                format: string;
            };
            revoked: {
                type: string;
                readOnly: boolean;
            };
            version: {
                type: string;
                minimum: number;
                maximum: number;
            };
            createdById: {
                type: string;
                format: string;
            };
            createdByName: {
                type: string;
            };
            updatedById: {
                nullable: boolean;
                type: string;
                format: string;
            };
            updatedByName: {
                type: string;
                nullable: boolean;
            };
            createdAt: {
                type: string;
                format: string;
            };
            updatedAt: {
                type: string;
                format: string;
            };
            inspectors: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            format: string;
                        };
                        workOrderId: {
                            type: string;
                            format: string;
                        };
                        userId: {
                            nullable: boolean;
                            description: string;
                            type: string;
                            format: string;
                        };
                        name: {
                            type: string;
                            description: string;
                        };
                        position: {
                            type: string;
                        };
                    };
                };
            };
            quotationId: {
                nullable: boolean;
                description: string;
                type: string;
                format: string;
            };
            status: {
                description: string;
                type: string;
                enum: string[];
                default: string;
            };
        };
    };
    WorkOrderHistoryChange: {
        type: string;
        required: string[];
        description: string;
        properties: {
            field: {
                type: string;
                example: string;
            };
            label: {
                type: string;
                example: string;
            };
            before: {
                nullable: boolean;
                example: string[];
            };
            after: {
                nullable: boolean;
                example: string[];
            };
        };
        example: {
            field: string;
            label: string;
            before: string;
            after: string;
        };
    };
    WorkOrderHistory: {
        type: string;
        readOnly: boolean;
        required: string[];
        properties: {
            id: {
                type: string;
                format: string;
            };
            workOrderId: {
                type: string;
                format: string;
            };
            version: {
                type: string;
                minimum: number;
                maximum: number;
            };
            action: {
                type: string;
                enum: string[];
            };
            actionLabel: {
                type: string;
                example: string;
            };
            changes: {
                type: string;
                items: {
                    $ref: string;
                };
                description: string;
            };
            createdById: {
                description: string;
                type: string;
                format: string;
            };
            createdByName: {
                type: string;
                example: string;
                description: string;
            };
            createdAt: {
                description: string;
                type: string;
                format: string;
            };
            changedBy: {
                type: string;
                required: string[];
                properties: {
                    id: {
                        type: string;
                        format: string;
                    };
                    name: {
                        type: string;
                    };
                };
            };
            changedAt: {
                type: string;
                format: string;
            };
        };
    };
    WorkOrderHistoryResponse: {
        type: string;
        properties: {
            status: {
                type: string;
            };
            success: {
                type: string;
            };
            message: {
                type: string;
            };
            requestId: {
                type: string;
            };
            data: object;
        };
    };
    WorkOrderSyncDelivery: {
        type: string;
        readOnly: boolean;
        required: string[];
        properties: {
            id: {
                type: string;
                format: string;
            };
            targetService: {
                type: string;
                example: string;
            };
            attempts: {
                type: string;
                minimum: number;
                description: string;
            };
            nextRetryAt: {
                type: string;
                format: string;
            };
            deliveredAt: {
                nullable: boolean;
                description: string;
                type: string;
                format: string;
            };
            lastError: {
                type: string;
                nullable: boolean;
                description: string;
            };
            deliveryStatus: {
                type: string;
                enum: string[];
                description: string;
            };
        };
    };
    WorkOrderSyncRecord: {
        type: string;
        readOnly: boolean;
        required: string[];
        properties: {
            eventId: {
                type: string;
                format: string;
            };
            workOrderId: {
                type: string;
                format: string;
            };
            workOrderNumber: {
                type: string;
            };
            workOrderStatus: {
                type: string;
                enum: string[];
                description: string;
            };
            action: {
                type: string;
                enum: string[];
                description: string;
            };
            revoked: {
                type: string;
                description: string;
            };
            quotationId: {
                type: string;
                format: string;
            };
            officeBranchId: {
                type: string;
                format: string;
            };
            createdAt: {
                type: string;
                format: string;
            };
            delivery: {
                $ref: string;
            };
        };
    };
    WorkOrderSyncResponse: {
        type: string;
        required: string[];
        properties: {
            status: {
                type: string;
                example: number;
            };
            success: {
                type: string;
                example: boolean;
            };
            message: {
                type: string;
                example: string;
            };
            requestId: {
                type: string;
            };
            data: {
                type: string;
                items: {
                    $ref: string;
                };
                description: string;
            };
            pagination: {
                type: string;
                required: string[];
                properties: {
                    page: {
                        type: string;
                    };
                    limit: {
                        type: string;
                    };
                    total: {
                        type: string;
                    };
                    totalPages: {
                        type: string;
                    };
                };
            };
        };
    };
    WorkOrderResponse: {
        type: string;
        properties: {
            status: {
                type: string;
            };
            success: {
                type: string;
            };
            message: {
                type: string;
            };
            requestId: {
                type: string;
            };
            data: object;
        };
    };
    WorkOrderList: {
        type: string;
        properties: {
            status: {
                type: string;
            };
            success: {
                type: string;
            };
            message: {
                type: string;
            };
            requestId: {
                type: string;
            };
            data: object;
        };
    };
};
export declare const workOrderPaths: {
    '/api/v1/marketing/company-contract-references/{companyId}': {
        get: {
            summary: string;
            tags: string[];
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
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                200: {
                    description: string;
                };
                400: {
                    description: string;
                };
                401: {
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
            };
        };
    };
    '/api/v1/marketing/contract-references/{contractId}': {
        get: {
            summary: string;
            tags: string[];
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
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                400: {
                    description: string;
                };
                200: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    data: {
                                        type: string;
                                        additionalProperties: boolean;
                                    };
                                };
                            };
                        };
                    };
                };
                401: {
                    description: string;
                };
                403: {
                    description: string;
                };
                404: {
                    description: string;
                };
            };
        };
    };
    '/api/v1/fieldservice/work-orders/{id}/history': {
        get: {
            description: string;
            responses: {
                [x: number]: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                } | {
                    description: string;
                    content?: undefined;
                };
                400: {
                    description: string;
                };
                401: {
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
                502: {
                    description: string;
                };
                503: {
                    description: string;
                };
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
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
    '/api/v1/fieldservice/work-orders/{id}/sync': {
        get: {
            description: string;
            responses: {
                [x: number]: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                } | {
                    description: string;
                    content?: undefined;
                };
                400: {
                    description: string;
                };
                401: {
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
                502: {
                    description: string;
                };
                503: {
                    description: string;
                };
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
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
    '/api/v1/fieldservice/work-orders': {
        get: {
            responses: {
                [x: number]: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                } | {
                    description: string;
                    content?: undefined;
                };
                400: {
                    description: string;
                };
                401: {
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
                502: {
                    description: string;
                };
                503: {
                    description: string;
                };
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
            description: string;
        };
        post: {
            description: string;
            responses: {
                [x: number]: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                } | {
                    description: string;
                    content?: undefined;
                };
                400: {
                    description: string;
                };
                401: {
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
                502: {
                    description: string;
                };
                503: {
                    description: string;
                };
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
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
    '/api/v1/fieldservice/work-orders/from-quotation': {
        post: {
            description: string;
            responses: {
                [x: number]: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                } | {
                    description: string;
                    content?: undefined;
                };
                400: {
                    description: string;
                };
                401: {
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
                502: {
                    description: string;
                };
                503: {
                    description: string;
                };
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
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
    '/api/v1/fieldservice/work-orders/{id}': {
        get: {
            responses: {
                [x: number]: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                } | {
                    description: string;
                    content?: undefined;
                };
                400: {
                    description: string;
                };
                401: {
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
                502: {
                    description: string;
                };
                503: {
                    description: string;
                };
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
            parameters: object[];
            description: string;
        };
        patch: {
            description: string;
            responses: {
                200: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                400: {
                    description: string;
                };
                401: {
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
                502: {
                    description: string;
                };
                503: {
                    description: string;
                };
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
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
            description: string;
            responses: {
                200: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                400: {
                    description: string;
                };
                401: {
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
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
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
    '/api/v1/fieldservice/work-orders/{id}/start': {
        post: {
            description: string;
            responses: {
                200: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                400: {
                    description: string;
                };
                401: {
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
                502: {
                    description: string;
                };
                503: {
                    description: string;
                };
            };
            requestBody?: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            } | undefined;
            summary: string;
            tags: string[];
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
