export declare const quotationSchemas: {
    DeleteQuotationRequest: {
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
    QuotationPdf: {
        type: string;
        readOnly: boolean;
        properties: {
            id: {
                type: string;
                format: string;
            };
            quotationId: {
                type: string;
                format: string;
            };
            bucket: {
                type: string;
            };
            key: {
                type: string;
            };
            fileName: {
                type: string;
            };
            contentType: {
                type: string;
                example: string;
            };
            size: {
                type: string;
                description: string;
            };
            sha256: {
                type: string;
            };
            revision: {
                type: string;
            };
            version: {
                type: string;
            };
            approvedAt: {
                type: string;
                format: string;
            };
            approvedById: {
                type: string;
                format: string;
            };
            approvedByName: {
                type: string;
            };
            createdAt: {
                type: string;
                format: string;
            };
        };
    };
    SubmitQuotationRequest: {
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
    RejectQuotationRequest: {
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
    QuotationHistory: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
            };
            quotationId: {
                type: string;
                format: string;
            };
            version: {
                type: string;
            };
            action: {
                type: string;
            };
            changes: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        field: {
                            type: string;
                        };
                        label: {
                            type: string;
                        };
                        before: {};
                        after: {};
                    };
                    required: string[];
                };
            };
            createdById: {
                type: string;
                format: string;
            };
            createdByName: {
                type: string;
            };
            createdBy: {
                type: string;
                properties: {
                    id: {
                        type: string;
                        format: string;
                    };
                    name: {
                        type: string;
                    };
                };
                required: string[];
            };
            createdAt: {
                type: string;
                format: string;
            };
        };
    };
    QuotationSnapshot: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
            };
            quotationId: {
                type: string;
                format: string;
            };
            version: {
                type: string;
            };
            action: {
                type: string;
            };
            snapshot: {
                type: string;
                additionalProperties: boolean;
            };
            createdById: {
                type: string;
                format: string;
            };
            createdByName: {
                type: string;
            };
            createdAt: {
                type: string;
                format: string;
            };
        };
    };
    QuotationHistoryResponse: {
        type: string;
        required: string[];
        properties: {
            status: {
                type: string;
            };
            success: {
                type: string;
                enum: boolean[];
            };
            message: {
                type: string;
            };
            data: object;
            requestId: {
                type: string;
                format: string;
            };
        };
    };
    ApproveQuotationRequest: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        properties: {
            version: {
                type: string;
                minimum: number;
                maximum: number;
                example: number;
            };
        };
    };
    ApproveQuotationResponse: {
        type: string;
        required: string[];
        properties: {
            status: {
                type: string;
            };
            success: {
                type: string;
                enum: boolean[];
            };
            message: {
                type: string;
            };
            data: object;
            requestId: {
                type: string;
                format: string;
            };
        };
    };
    QuotationPriceSelection: {
        type: string;
        readOnly: boolean;
        description: string;
        properties: {
            quantityModel: {
                type: string;
                enum: string[];
            };
            priceSource: {
                type: string;
                enum: string[];
            };
            priceId: {
                type: string;
                format: string;
            };
            priceVersion: {
                type: string;
            };
            contractId: {
                nullable: boolean;
                type: string;
                format: string;
            };
            contractVersion: {
                type: string;
                nullable: boolean;
            };
            sizeVersion: {
                type: string;
            };
            itemVersion: {
                type: string;
            };
            serviceVersion: {
                type: string;
            };
        };
    };
    InquiryMethod: {
        type: string;
        enum: string[];
        description: string;
    };
    QuotationStatus: {
        type: string;
        enum: string[];
        description: string;
    };
    QuotationItemInput: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        description: string;
        properties: {
            itemSizeId: {
                type: string;
                format: string;
            };
            quantityInspection: {
                oneOf: ({
                    type: string;
                    pattern: string;
                    minimum?: undefined;
                    multipleOf?: undefined;
                    maximum?: undefined;
                } | {
                    type: string;
                    minimum: number;
                    multipleOf: number;
                    maximum: number;
                    pattern?: undefined;
                })[];
                example: string;
            };
            quantityMaintenance: {
                oneOf: ({
                    type: string;
                    pattern: string;
                    minimum?: undefined;
                    multipleOf?: undefined;
                    maximum?: undefined;
                } | {
                    type: string;
                    minimum: number;
                    multipleOf: number;
                    maximum: number;
                    pattern?: undefined;
                })[];
                default: string;
                example: string;
            };
            discount: {
                oneOf: ({
                    type: string;
                    pattern: string;
                    minimum?: undefined;
                    maximum?: undefined;
                    multipleOf?: undefined;
                } | {
                    type: string;
                    minimum: number;
                    maximum: number;
                    multipleOf: number;
                    pattern?: undefined;
                })[];
                default: string;
                example: string;
                description: string;
            };
            note: {
                type: string;
                maxLength: number;
                nullable: boolean;
                description: string;
            };
        };
    };
    CreateQuotationRequest: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        properties: {
            items: {
                type: string;
                minItems: number;
                maxItems: number;
                items: {
                    $ref: string;
                };
            };
            inquiryMethod: {
                $ref: string;
            };
            inquiryDate: {
                type: string;
                format: string;
            };
            jobStart: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            subject: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            termOfPayment: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            validity: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            supplyAkura: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            supplyCustomer: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            location: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            accomplished: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            deliveryReports: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            deliveryInvoice: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            companyId: {
                description: string;
                type: string;
                format: string;
            };
            staffId: {
                nullable: boolean;
                description: string;
                type: string;
                format: string;
            };
        };
    };
    UpdateQuotationRequest: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        minProperties: number;
        description: string;
        properties: {
            companyId: {
                readOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
            inquiryMethod: {
                $ref: string;
            };
            inquiryDate: {
                type: string;
                format: string;
            };
            jobStart: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            subject: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            termOfPayment: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            validity: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            supplyAkura: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            supplyCustomer: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            location: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            accomplished: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            deliveryReports: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            deliveryInvoice: {
                type: string;
                minLength: number;
                maxLength: number;
                description: string;
            };
            staffId: {
                nullable: boolean;
                description: string;
                type: string;
                format: string;
            };
            version: {
                type: string;
                minimum: number;
                maximum: number;
            };
        };
    };
    AddQuotationItemRequest: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        properties: {
            version: {
                type: string;
                minimum: number;
            };
            itemSizeId: {
                type: string;
                format: string;
            };
            quantityInspection: {
                oneOf: ({
                    type: string;
                    minimum?: undefined;
                } | {
                    type: string;
                    minimum: number;
                })[];
            };
            quantityMaintenance: {
                oneOf: ({
                    type: string;
                    minimum?: undefined;
                } | {
                    type: string;
                    minimum: number;
                })[];
                default: string;
            };
            discount: {
                oneOf: ({
                    type: string;
                    pattern: string;
                    minimum?: undefined;
                    maximum?: undefined;
                } | {
                    type: string;
                    minimum: number;
                    maximum: number;
                    pattern?: undefined;
                })[];
                default: string;
                description: string;
            };
            note: {
                type: string;
                nullable: boolean;
                maxLength: number;
            };
        };
    };
    DeleteQuotationItemRequest: {
        type: string;
        additionalProperties: boolean;
        required: string[];
        properties: {
            quotationVersion: {
                type: string;
                minimum: number;
            };
            itemVersion: {
                type: string;
                minimum: number;
            };
        };
    };
    QuotationItem: {
        type: string;
        required: string[];
        properties: {
            createdById: {
                readOnly: boolean;
                type: string;
                format: string;
            };
            createdByName: {
                type: string;
                readOnly: boolean;
            };
            updatedById: {
                nullable: boolean;
                readOnly: boolean;
                type: string;
                format: string;
            };
            updatedByName: {
                type: string;
                nullable: boolean;
                readOnly: boolean;
            };
            createdAt: {
                type: string;
                format: string;
            };
            updatedAt: {
                type: string;
                format: string;
            };
            id: {
                type: string;
                format: string;
            };
            quotationId: {
                type: string;
                format: string;
            };
            itemSizeId: {
                type: string;
                format: string;
            };
            position: {
                type: string;
                minimum: number;
            };
            inspectionScopes: {
                type: string;
                readOnly: boolean;
                description: string;
            };
            maintenanceScopes: {
                type: string;
                readOnly: boolean;
                description: string;
            };
            serviceName: {
                type: string;
            };
            serviceType: {
                $ref: string;
            };
            itemName: {
                type: string;
            };
            size: {
                type: string;
                nullable: boolean;
                description: string;
            };
            note: {
                type: string;
                maxLength: number;
                nullable: boolean;
                description: string;
            };
            priceSelection: {
                nullable: boolean;
                readOnly: boolean;
                $ref: string;
            };
            quantityInspection: {
                type: string;
                format: string;
                example: string;
            };
            quantityMaintenance: {
                type: string;
                format: string;
                example: string;
            };
            priceInspection: {
                type: string;
                format: string;
                example: string;
            };
            priceMaintenance: {
                nullable: boolean;
                type: string;
                format: string;
                example: string;
            };
            discount: {
                description: string;
                type: string;
                format: string;
                example: string;
            };
            subTotal: {
                type: string;
                format: string;
                example: string;
            };
            isActive: {
                type: string;
            };
            version: {
                type: string;
                minimum: number;
            };
        };
    };
    Quotation: {
        type: string;
        required: string[];
        properties: {
            revision: {
                type: string;
                minimum: number;
                readOnly: boolean;
                example: number;
                description: string;
            };
            hasWorkOrder: {
                type: string;
                readOnly: boolean;
                description: string;
            };
            workOrderStatus: {
                type: string;
                enum: string[];
                nullable: boolean;
                readOnly: boolean;
                description: string;
            };
            workOrderId: {
                nullable: boolean;
                readOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
            workOrderSnapshot: {
                type: string;
                nullable: boolean;
                readOnly: boolean;
                description: string;
            };
            items: {
                type: string;
                items: {
                    $ref: string;
                };
            };
            createdById: {
                readOnly: boolean;
                type: string;
                format: string;
            };
            createdByName: {
                type: string;
                readOnly: boolean;
            };
            updatedById: {
                nullable: boolean;
                readOnly: boolean;
                type: string;
                format: string;
            };
            updatedByName: {
                type: string;
                nullable: boolean;
                readOnly: boolean;
            };
            createdAt: {
                type: string;
                format: string;
            };
            updatedAt: {
                type: string;
                format: string;
            };
            tax: {
                type: string;
                readOnly: boolean;
                example: string;
                description: string;
            };
            taxSourceId: {
                readOnly: boolean;
                type: string;
                format: string;
            };
            status: {
                allOf: {
                    $ref: string;
                }[];
                readOnly: boolean;
            };
            previousQuotationId: {
                nullable: boolean;
                readOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
            pdfDocument: {
                allOf: {
                    $ref: string;
                }[];
                nullable: boolean;
                readOnly: boolean;
            };
            pdf: {
                type: string;
                readOnly: boolean;
                description: string;
                properties: {
                    url: {
                        type: string;
                        format: string;
                    };
                    expiresAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            no: {
                type: string;
                nullable: boolean;
                minimum: number;
                maximum: number;
                readOnly: boolean;
                description: string;
            };
            numberYear: {
                type: string;
                nullable: boolean;
                readOnly: boolean;
                description: string;
            };
            date: {
                nullable: boolean;
                readOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
            inquiryDate: {
                type: string;
                format: string;
            };
            jobStart: {
                type: string;
                minLength: number;
                maxLength: number;
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
            companySnapshot: {
                type: string;
                readOnly: boolean;
                description: string;
            };
            customerSnapshot: {
                type: string;
                readOnly: boolean;
                example: string;
                description: string;
            };
            subTotal: {
                readOnly: boolean;
                type: string;
                format: string;
                example: string;
            };
            taxAmount: {
                readOnly: boolean;
                type: string;
                format: string;
                example: string;
            };
            total: {
                readOnly: boolean;
                type: string;
                format: string;
                example: string;
            };
            version: {
                type: string;
                minimum: number;
            };
            isActive: {
                type: string;
            };
        };
    };
    QuotationListRow: {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
                format: string;
            };
            officeBranchId: {
                type: string;
                format: string;
            };
            date: {
                nullable: boolean;
                type: string;
                format: string;
            };
            no: {
                type: string;
                nullable: boolean;
            };
            numberYear: {
                type: string;
                nullable: boolean;
            };
            subject: {
                type: string;
                minLength: number;
                maxLength: number;
            };
            customerSnapshot: {
                type: string;
            };
            companyId: {
                nullable: boolean;
                type: string;
                format: string;
            };
            companyName: {
                type: string;
                nullable: boolean;
            };
            status: {
                $ref: string;
            };
            subTotal: {
                type: string;
                format: string;
                example: string;
            };
            taxAmount: {
                type: string;
                format: string;
                example: string;
            };
            total: {
                type: string;
                format: string;
                example: string;
            };
            version: {
                type: string;
            };
            revision: {
                type: string;
            };
            isActive: {
                type: string;
            };
            createdAt: {
                type: string;
                format: string;
            };
            updatedAt: {
                type: string;
                format: string;
            };
            hasWorkOrder: {
                type: string;
                readOnly: boolean;
                description: string;
            };
            workOrderStatus: {
                type: string;
                enum: string[];
                nullable: boolean;
                readOnly: boolean;
                description: string;
            };
            workOrderId: {
                nullable: boolean;
                readOnly: boolean;
                description: string;
                type: string;
                format: string;
            };
        };
    };
    QuotationResponse: {
        type: string;
        required: string[];
        properties: {
            status: {
                type: string;
            };
            success: {
                type: string;
                enum: boolean[];
            };
            message: {
                type: string;
            };
            data: object;
            requestId: {
                type: string;
                format: string;
            };
        };
    };
    QuotationListResponse: {
        type: string;
        required: string[];
        properties: {
            status: {
                type: string;
            };
            success: {
                type: string;
                enum: boolean[];
            };
            message: {
                type: string;
            };
            data: object;
            requestId: {
                type: string;
                format: string;
            };
        };
    };
};
export declare const quotationPaths: {
    '/api/v1/marketing/internal/quotations/{quotationId}/work-order': {
        post: {
            tags: string[];
            summary: string;
            security: never[];
            description: string;
            parameters: ({
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            } | {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    enum: string[];
                };
            } | {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    enum?: undefined;
                };
            })[];
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            type: string;
                            additionalProperties: boolean;
                            required: string[];
                            properties: {
                                workOrderId: {
                                    type: string;
                                    format: string;
                                };
                                workOrderNumber: {
                                    type: string;
                                    minLength: number;
                                    maxLength: number;
                                };
                                workOrderStatus: {
                                    type: string;
                                    enum: string[];
                                };
                                workOrderSnapshot: {
                                    type: string;
                                    nullable: boolean;
                                    description: string;
                                };
                                officeBranchId: {
                                    type: string;
                                    format: string;
                                };
                                revoked: {
                                    type: string;
                                    default: boolean;
                                };
                            };
                        };
                    };
                };
            };
            responses: {
                200: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                required: string[];
                                properties: {
                                    success: {
                                        type: string;
                                        enum: boolean[];
                                    };
                                    quotationId: {
                                        type: string;
                                        format: string;
                                    };
                                    workOrderId: {
                                        type: string;
                                        format: string;
                                    };
                                    revoked: {
                                        type: string;
                                    };
                                    workOrderStatus: {
                                        type: string;
                                        enum: string[];
                                        nullable: boolean;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                400: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                required: string[];
                                properties: {
                                    success: {
                                        type: string;
                                        enum: boolean[];
                                    };
                                    message: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                404: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
        };
    };
    '/api/v1/marketing/quotations/{quotationId}/pdf': {
        get: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            description: string;
            responses: {
                404: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                200: {
                    description: string;
                    content: {
                        'application/pdf': {
                            schema: {
                                type: string;
                                format: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations/{quotationId}/approve': {
        post: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
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
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                404: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                503: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations/{quotationId}/revise': {
        post: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                201: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                503: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations/{quotationId}/submit': {
        post: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
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
                409: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations/{quotationId}/reject': {
        post: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
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
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations': {
        get: {
            summary: string;
            parameters: ({
                in: string;
                name: string;
                description: string;
                schema: {
                    type: string;
                    enum: string[];
                    format?: undefined;
                    minimum?: undefined;
                    maximum?: undefined;
                    minLength?: undefined;
                    maxLength?: undefined;
                    default?: undefined;
                };
            } | {
                in: string;
                name: string;
                description: string;
                schema: {
                    type: string;
                    format: string;
                    enum?: undefined;
                    minimum?: undefined;
                    maximum?: undefined;
                    minLength?: undefined;
                    maxLength?: undefined;
                    default?: undefined;
                };
            } | {
                in: string;
                name: string;
                description: string;
                schema: {
                    type: string;
                    minimum: number;
                    maximum: number;
                    enum?: undefined;
                    format?: undefined;
                    minLength?: undefined;
                    maxLength?: undefined;
                    default?: undefined;
                };
            } | {
                in: string;
                name: string;
                schema: {
                    $ref: string;
                };
                description?: undefined;
            } | {
                in: string;
                name: string;
                description: string;
                schema: {
                    type: string;
                    minLength: number;
                    maxLength: number;
                    enum?: undefined;
                    format?: undefined;
                    minimum?: undefined;
                    maximum?: undefined;
                    default?: undefined;
                };
            } | {
                in: string;
                name: string;
                schema: {
                    type: string;
                    minimum: number;
                    default: number;
                    enum?: undefined;
                    format?: undefined;
                    maximum?: undefined;
                    minLength?: undefined;
                    maxLength?: undefined;
                };
                description?: undefined;
            } | {
                in: string;
                name: string;
                schema: {
                    type: string;
                    minimum: number;
                    maximum: number;
                    default: number;
                    enum?: undefined;
                    format?: undefined;
                    minLength?: undefined;
                    maxLength?: undefined;
                };
                description?: undefined;
            })[];
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
        post: {
            summary: string;
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                201: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                404: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations/{quotationId}/history': {
        get: {
            summary: string;
            parameters: ({
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            } | {
                in: string;
                name: string;
                schema: {
                    type: string;
                    minimum: number;
                    default: number;
                    maximum?: undefined;
                    maxLength?: undefined;
                    enum?: undefined;
                };
            } | {
                in: string;
                name: string;
                schema: {
                    type: string;
                    minimum: number;
                    maximum: number;
                    default: number;
                    maxLength?: undefined;
                    enum?: undefined;
                };
            } | {
                in: string;
                name: string;
                schema: {
                    type: string;
                    maxLength: number;
                    minimum?: undefined;
                    default?: undefined;
                    maximum?: undefined;
                    enum?: undefined;
                };
            } | {
                in: string;
                name: string;
                schema: {
                    type: string;
                    enum: string[];
                    default: string;
                    minimum?: undefined;
                    maximum?: undefined;
                    maxLength?: undefined;
                };
            })[];
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
                404: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations/{quotationId}': {
        patch: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
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
                404: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
        get: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
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
                404: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
        delete: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
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
                404: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                503: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations/{quotationId}/items': {
        post: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            description: string;
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                201: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                404: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
    '/api/v1/marketing/quotations/{quotationId}/items/{itemId}': {
        delete: {
            summary: string;
            parameters: {
                in: string;
                name: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            requestBody: {
                required: boolean;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
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
                404: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                409: {
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
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                401: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                403: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                429: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                500: {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            tags: string[];
            security: ({
                bearerAuth: never[];
                accessTokenCookie?: undefined;
            } | {
                accessTokenCookie: never[];
                bearerAuth?: undefined;
            })[];
        };
    };
};
