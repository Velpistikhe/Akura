export declare const swaggerSpec: {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
    };
    servers: {
        url: string;
        description: string;
    }[];
    tags: never[];
    components: {
        securitySchemes: {
            bearerAuth: {
                type: string;
                scheme: string;
                bearerFormat: string;
                description: string;
            };
            accessTokenCookie: {
                type: string;
                in: string;
                name: string;
                description: string;
            };
        };
        schemas: {
            UserSection: {
                type: string;
                enum: string[];
                description: string;
            };
            NullableUserSection: {
                type: string;
                nullable: boolean;
                enum: string[];
                description: string;
            };
            NullableMenuAccessSection: {
                type: string;
                nullable: boolean;
                enum: string[];
                description: string;
            };
            UserRole: {
                type: string;
                enum: string[];
                example: string;
            };
            MenuAccessRole: {
                type: string;
                enum: string[];
                example: string;
                description: string;
            };
            NullableMenuAccessRole: {
                type: string;
                enum: string[];
                nullable: boolean;
                description: string;
            };
            AccessTokenClaims: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    sub: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    name: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    username: {
                        type: string;
                        example: string;
                    };
                    role: {
                        $ref: string;
                    };
                    officeBranchId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    type: {
                        type: string;
                        enum: string[];
                    };
                    iss: {
                        type: string;
                        example: string;
                    };
                    aud: {
                        type: string;
                        example: string;
                    };
                    iat: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    exp: {
                        type: string;
                        format: string;
                        description: string;
                    };
                };
            };
            MenuItem: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    key: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    label: {
                        type: string;
                        example: string;
                    };
                    order: {
                        type: string;
                        example: number;
                    };
                };
            };
            Menu: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    key: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    label: {
                        type: string;
                        example: string;
                    };
                    hasItem: {
                        type: string;
                        example: boolean;
                    };
                    order: {
                        type: string;
                        example: number;
                    };
                    items: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        description: string;
                    };
                };
            };
            MyMenusResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        description: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
                example: {
                    status: number;
                    success: boolean;
                    message: string;
                    data: {
                        key: string;
                        label: string;
                        hasItem: boolean;
                        order: number;
                        items: {
                            key: string;
                            label: string;
                            order: number;
                        }[];
                    }[];
                    requestId: string;
                };
            };
            OfficeBranch: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    id: {
                        type: string;
                        format: string;
                    };
                    name: {
                        type: string;
                        example: string;
                    };
                    address: {
                        type: string;
                        example: string;
                    };
                    telp: {
                        type: string;
                        pattern: string;
                        example: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    isHead: {
                        type: string;
                        example: boolean;
                        description: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            CreateOfficeBranchRequest: {
                type: string;
                additionalProperties: boolean;
                required: string[];
                properties: {
                    name: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    address: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    telp: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        pattern: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        maxLength: number;
                    };
                    isHead: {
                        type: string;
                        default: boolean;
                        description: string;
                    };
                };
            };
            UpdateOfficeBranchRequest: {
                type: string;
                additionalProperties: boolean;
                minProperties: number;
                description: string;
                properties: {
                    address: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    telp: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        pattern: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        maxLength: number;
                    };
                    isHead: {
                        type: string;
                        description: string;
                    };
                };
            };
            OfficeBranchResponse: {
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
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            OfficeBranchListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            officeBranches: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
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
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            OfficeBranchOption: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                properties: {
                    id: {
                        type: string;
                        format: string;
                    };
                    name: {
                        type: string;
                        example: string;
                    };
                };
            };
            OfficeBranchOptionsResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            UserSummary: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    id: {
                        type: string;
                        format: string;
                    };
                    firstName: {
                        type: string;
                        example: string;
                    };
                    lastName: {
                        type: string;
                        example: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        example: string;
                    };
                    telp: {
                        type: string;
                        nullable: boolean;
                        example: string;
                    };
                    role: {
                        $ref: string;
                    };
                    section: {
                        $ref: string;
                    };
                    branch: {
                        type: string;
                        maxLength: number;
                        nullable: boolean;
                        example: string;
                        description: string;
                    };
                };
            };
            UserProfile: {
                type: string;
                required: string[];
                properties: {
                    id: {
                        type: string;
                        format: string;
                    };
                    username: {
                        type: string;
                        example: string;
                    };
                    firstName: {
                        type: string;
                        example: string;
                    };
                    lastName: {
                        type: string;
                        example: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        example: string;
                    };
                    telp: {
                        type: string;
                        nullable: boolean;
                        example: string;
                    };
                    role: {
                        $ref: string;
                    };
                    section: {
                        $ref: string;
                    };
                    officeBranchId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    branch: {
                        type: string;
                        maxLength: number;
                        nullable: boolean;
                        example: string;
                        description: string;
                    };
                    isActive: {
                        type: string;
                        example: boolean;
                    };
                    version: {
                        type: string;
                        minimum: number;
                        example: number;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            ErrorResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                    errors: {
                        type: string;
                        items: {
                            type: string;
                            additionalProperties: boolean;
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            UserResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                    accessToken: {
                        type: string;
                        description: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            AuthUserResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            user: {
                                $ref: string;
                            };
                            accessToken: {
                                type: string;
                                description: string;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            TokenRefreshResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            accessToken: {
                                type: string;
                                description: string;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            MessageResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            GatewayHealthResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        enum: number[];
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            service: {
                                type: string;
                                enum: string[];
                            };
                            timestamp: {
                                type: string;
                                format: string;
                            };
                            uptime: {
                                type: string;
                                minimum: number;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            DownstreamHealthResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        enum: number[];
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            service: {
                                type: string;
                                enum: string[];
                            };
                            timestamp: {
                                type: string;
                                format: string;
                            };
                            uptime: {
                                type: string;
                                minimum: number;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ServiceRegistryResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        enum: number[];
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                    data: {
                        type: string;
                        items: {
                            type: string;
                            required: string[];
                            properties: {
                                prefix: {
                                    type: string;
                                    example: string;
                                };
                                target: {
                                    type: string;
                                    description: string;
                                };
                                authRequired: {
                                    type: string;
                                };
                                description: {
                                    type: string;
                                };
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            RegisterResponse: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        enum: number[];
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                        example: boolean;
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            RegisterRequest: {
                type: string;
                required: string[];
                properties: {
                    username: {
                        type: string;
                        minLength: number;
                        pattern: string;
                        example: string;
                    };
                    password: {
                        type: string;
                        format: string;
                        minLength: number;
                        example: string;
                    };
                    passwordConfirmation: {
                        type: string;
                        format: string;
                        minLength: number;
                        example: string;
                    };
                    firstName: {
                        type: string;
                        minLength: number;
                        example: string;
                    };
                    lastName: {
                        type: string;
                        minLength: number;
                        example: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        maxLength: number;
                        example: string;
                        description: string;
                    };
                    telp: {
                        type: string;
                        nullable: boolean;
                        minLength: number;
                        maxLength: number;
                        example: string;
                        description: string;
                    };
                };
            };
            LoginRequest: {
                type: string;
                required: string[];
                properties: {
                    username: {
                        type: string;
                        minLength: number;
                        example: string;
                    };
                    password: {
                        type: string;
                        format: string;
                        minLength: number;
                        example: string;
                    };
                };
            };
            UpdateProfileRequest: {
                type: string;
                required: string[];
                properties: {
                    firstName: {
                        type: string;
                        minLength: number;
                        example: string;
                    };
                    lastName: {
                        type: string;
                        minLength: number;
                        example: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        maxLength: number;
                        description: string;
                    };
                    telp: {
                        type: string;
                        nullable: boolean;
                        minLength: number;
                        maxLength: number;
                        description: string;
                    };
                };
            };
            ChangePasswordRequest: {
                type: string;
                required: string[];
                properties: {
                    oldPassword: {
                        type: string;
                        format: string;
                        minLength: number;
                    };
                    newPassword: {
                        type: string;
                        format: string;
                        minLength: number;
                    };
                    newPasswordConfirmation: {
                        type: string;
                        format: string;
                        minLength: number;
                    };
                };
            };
            UpdateUserRequest: {
                type: string;
                additionalProperties: boolean;
                minProperties: number;
                required: string[];
                properties: {
                    role: {
                        $ref: string;
                    };
                    section: {
                        $ref: string;
                    };
                    officeBranchId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    branch: {
                        type: string;
                        maxLength: number;
                        nullable: boolean;
                        description: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        maxLength: number;
                        description: string;
                    };
                    telp: {
                        type: string;
                        nullable: boolean;
                        minLength: number;
                        maxLength: number;
                        description: string;
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
            UserListResponse: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            users: {
                                type: string;
                                description: string;
                                items: {
                                    oneOf: {
                                        $ref: string;
                                    }[];
                                };
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
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ManagedMenu: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    isDeleted: {
                        type: string;
                        readOnly: boolean;
                        description: string;
                    };
                    id: {
                        type: string;
                        format: string;
                    };
                    key: {
                        type: string;
                        example: string;
                    };
                    label: {
                        type: string;
                        example: string;
                    };
                    hasItem: {
                        type: string;
                        example: boolean;
                    };
                    order: {
                        type: string;
                        example: number;
                    };
                    isActive: {
                        type: string;
                        example: boolean;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            ManagedMenuAccess: {
                type: string;
                required: string[];
                properties: {
                    isDeleted: {
                        type: string;
                        readOnly: boolean;
                        description: string;
                    };
                    id: {
                        type: string;
                        format: string;
                    };
                    menuItemId: {
                        type: string;
                        format: string;
                    };
                    role: {
                        $ref: string;
                    };
                    section: {
                        $ref: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                    menuItem: {
                        type: string;
                        required: string[];
                        properties: {
                            id: {
                                type: string;
                                format: string;
                            };
                            key: {
                                type: string;
                            };
                            label: {
                                type: string;
                            };
                            menuId: {
                                type: string;
                                format: string;
                            };
                        };
                    };
                };
            };
            MenuAccessResponse: {
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
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            MenuAccessListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            menuAccesses: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
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
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            CreateMenuAccessRequest: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                properties: {
                    menuItemId: {
                        type: string;
                        format: string;
                    };
                    role: {
                        $ref: string;
                    };
                    section: {
                        $ref: string;
                    };
                };
            };
            UpdateMenuAccessRequest: {
                type: string;
                minProperties: number;
                additionalProperties: boolean;
                properties: {
                    menuItemId: {
                        type: string;
                        format: string;
                    };
                    role: {
                        $ref: string;
                    };
                    section: {
                        $ref: string;
                    };
                };
            };
            MenuResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            MenuListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            menus: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
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
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            CreateMenuRequest: {
                oneOf: ({
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        key: {
                            type: string;
                            minLength: number;
                            maxLength: number;
                            pattern: string;
                            example: string;
                        };
                        label: {
                            type: string;
                            minLength: number;
                            maxLength: number;
                            example: string;
                        };
                        hasItem: {
                            type: string;
                            enum: boolean[];
                        };
                        order: {
                            type: string;
                            minimum: number;
                            default: number;
                        };
                        items: {
                            type: string;
                            minItems: number;
                            maxItems: number;
                            description: string;
                            items: {
                                type: string;
                                additionalProperties: boolean;
                                required: string[];
                                properties: {
                                    key: {
                                        type: string;
                                        minLength: number;
                                        maxLength: number;
                                        pattern: string;
                                    };
                                    label: {
                                        type: string;
                                        minLength: number;
                                        maxLength: number;
                                    };
                                    order: {
                                        type: string;
                                        minimum: number;
                                        default: number;
                                    };
                                };
                            };
                        };
                    };
                } | {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    properties: {
                        key: {
                            type: string;
                            minLength: number;
                            maxLength: number;
                            pattern: string;
                            example: string;
                        };
                        label: {
                            type: string;
                            minLength: number;
                            maxLength: number;
                            example: string;
                        };
                        hasItem: {
                            type: string;
                            enum: boolean[];
                        };
                        order: {
                            type: string;
                            minimum: number;
                            default: number;
                        };
                        items?: undefined;
                    };
                })[];
            };
            UpdateMenuRequest: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    key: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        pattern: string;
                        example: string;
                    };
                    label: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        example: string;
                    };
                    hasItem: {
                        type: string;
                    };
                    order: {
                        type: string;
                        minimum: number;
                    };
                    isActive: {
                        type: string;
                    };
                };
            };
            ManagedMenuItem: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    isDeleted: {
                        type: string;
                        readOnly: boolean;
                        description: string;
                    };
                    id: {
                        type: string;
                        format: string;
                    };
                    menuId: {
                        type: string;
                        format: string;
                    };
                    key: {
                        type: string;
                        example: string;
                    };
                    label: {
                        type: string;
                        example: string;
                    };
                    order: {
                        type: string;
                        example: number;
                    };
                    isActive: {
                        type: string;
                        example: boolean;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            MenuItemResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            MenuItemListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            items: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
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
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            CreateMenuItemRequest: {
                type: string;
                additionalProperties: boolean;
                required: string[];
                properties: {
                    menuId: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    key: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        pattern: string;
                        example: string;
                        description: string;
                    };
                    label: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        example: string;
                    };
                    order: {
                        type: string;
                        minimum: number;
                        default: number;
                    };
                };
            };
            UpdateMenuItemRequest: {
                type: string;
                additionalProperties: boolean;
                properties: {
                    menuId: {
                        type: string;
                        format: string;
                    };
                    key: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        pattern: string;
                        example: string;
                    };
                    label: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        example: string;
                    };
                    order: {
                        type: string;
                        minimum: number;
                    };
                    isActive: {
                        type: string;
                    };
                };
            };
            Company: {
                type: string;
                required: string[];
                properties: {
                    npwp: {
                        type: string;
                        example: string;
                    };
                    id: {
                        type: string;
                        format: string;
                    };
                    officeBranchId: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                        description: string;
                    };
                    name: {
                        type: string;
                        example: string;
                    };
                    normalizeName: {
                        type: string;
                        readOnly: boolean;
                        example: string;
                    };
                    type: {
                        $ref: string;
                    };
                    address: {
                        type: string;
                        example: string;
                    };
                    isSisterCompany: {
                        type: string;
                        example: boolean;
                        description: string;
                    };
                    contract: {
                        nullable: boolean;
                        readOnly: boolean;
                        description: string;
                        type: string;
                        required: string[];
                        properties: object;
                    };
                    createdById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
                        description: string;
                    };
                    updatedById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
                        description: string;
                    };
                    revoked: {
                        type: string;
                        example: boolean;
                    };
                    version: {
                        type: string;
                        minimum: number;
                        example: number;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                    _count: {
                        type: string;
                        required: string[];
                        properties: {
                            staffs: {
                                type: string;
                                minimum: number;
                            };
                        };
                    };
                };
            };
            StaffTitle: {
                type: string;
                enum: string[];
                example: string;
            };
            CompanyType: {
                type: string;
                enum: string[];
                example: string;
                description: string;
            };
            CompanyStaff: {
                type: string;
                required: string[];
                properties: {
                    id: {
                        type: string;
                        format: string;
                    };
                    companyId: {
                        type: string;
                        format: string;
                    };
                    name: {
                        type: string;
                        example: string;
                    };
                    normalizeName: {
                        type: string;
                        readOnly: boolean;
                        example: string;
                    };
                    createdById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
                        description: string;
                    };
                    updatedById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
                        description: string;
                    };
                    title: {
                        $ref: string;
                    };
                    telp: {
                        type: string;
                        nullable: boolean;
                        maxLength: number;
                        example: string;
                    };
                    email: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        maxLength: number;
                    };
                    revoked: {
                        type: string;
                        example: boolean;
                    };
                    version: {
                        type: string;
                        minimum: number;
                        example: number;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                    company: {
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
                            type: {
                                $ref: string;
                            };
                            version: {
                                type: string;
                                minimum: number;
                            };
                        };
                    };
                };
            };
            ServiceScopeType: {
                type: string;
                enum: string[];
            };
            ServiceScope: {
                type: string;
                required: string[];
                properties: {
                    id: {
                        type: string;
                        format: string;
                    };
                    serviceId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                    };
                    itemId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                    };
                    type: {
                        $ref: string;
                    };
                    scope: {
                        type: string;
                    };
                    revoked: {
                        type: string;
                        example: boolean;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            ServiceType: {
                type: string;
                enum: string[];
                example: string;
                description: string;
            };
            Service: {
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
                        readOnly: boolean;
                        description: string;
                    };
                    name: {
                        type: string;
                        example: string;
                    };
                    type: {
                        $ref: string;
                    };
                    hasMaintenance: {
                        type: string;
                    };
                    version: {
                        type: string;
                        minimum: number;
                        description: string;
                    };
                    isActive: {
                        type: string;
                    };
                    createdById: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                    };
                    createdByName: {
                        type: string;
                        readOnly: boolean;
                    };
                    updatedById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
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
                    inspectionScopes: {
                        type: string;
                        items: {
                            type: string;
                            required: string[];
                            properties: {
                                id: {
                                    type: string;
                                    format: string;
                                };
                                serviceId: {
                                    type: string;
                                    format: string;
                                };
                                inspectionScope: {
                                    type: string;
                                };
                                revoked: {
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
                            };
                        };
                    };
                    maintenanceScopes: {
                        type: string;
                        items: {
                            type: string;
                            required: string[];
                            properties: {
                                id: {
                                    type: string;
                                    format: string;
                                };
                                serviceId: {
                                    type: string;
                                    format: string;
                                };
                                scope: {
                                    type: string;
                                };
                                revoked: {
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
                            };
                        };
                    };
                };
            };
            ServiceListItem: {
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
                        readOnly: boolean;
                        description: string;
                    };
                    name: {
                        type: string;
                        example: string;
                    };
                    type: {
                        $ref: string;
                    };
                    hasMaintenance: {
                        type: string;
                    };
                    version: {
                        type: string;
                        minimum: number;
                    };
                    isActive: {
                        type: string;
                    };
                    createdById: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                    };
                    createdByName: {
                        type: string;
                        readOnly: boolean;
                    };
                    updatedById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
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
                    inspectionScopes: {
                        type: string;
                        example: string;
                        description: string;
                    };
                    maintenanceScopes: {
                        type: string;
                        example: string;
                        description: string;
                    };
                };
            };
            Item: {
                type: string;
                required: string[];
                properties: {
                    version: {
                        type: string;
                        minimum: number;
                    };
                    id: {
                        type: string;
                        format: string;
                    };
                    officeBranchId: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                        description: string;
                    };
                    serviceId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    name: {
                        type: string;
                    };
                    uom: {
                        type: string;
                        maxLength: number;
                        example: string;
                        description: string;
                    };
                    inspectionScopes: {
                        type: string;
                        items: {
                            type: string;
                            required: string[];
                            properties: {
                                id: {
                                    type: string;
                                    format: string;
                                };
                                itemId: {
                                    type: string;
                                    format: string;
                                };
                                inspectionScope: {
                                    type: string;
                                };
                                revoked: {
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
                            };
                        };
                        description: string;
                    };
                    maintenanceScopes: {
                        type: string;
                        items: {
                            type: string;
                            required: string[];
                            properties: {
                                id: {
                                    type: string;
                                    format: string;
                                };
                                itemId: {
                                    type: string;
                                    format: string;
                                };
                                scope: {
                                    type: string;
                                };
                                revoked: {
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
                            };
                        };
                        description: string;
                    };
                    createdById: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                    };
                    createdByName: {
                        type: string;
                        readOnly: boolean;
                        description: string;
                    };
                    updatedById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
                    };
                    updatedByName: {
                        type: string;
                        nullable: boolean;
                        readOnly: boolean;
                        description: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                    sizes: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    service: {
                        type: string;
                        nullable: boolean;
                        description: string;
                        required: string[];
                        properties: {
                            id: {
                                type: string;
                                format: string;
                            };
                            name: {
                                type: string;
                            };
                            hasMaintenance: {
                                type: string;
                            };
                        };
                    };
                };
            };
            ItemSizeListRow: {
                allOf: ({
                    $ref: string;
                } | {
                    type: string;
                    required: string[];
                    properties: {
                        item: {
                            allOf: ({
                                $ref: string;
                            } | {
                                type: string;
                                properties: {
                                    service: {
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
                                            type: {
                                                $ref: string;
                                            };
                                            hasMaintenance: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            })[];
                        };
                    };
                })[];
            };
            ItemSize: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    priceId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                    };
                    priceVersion: {
                        type: string;
                        nullable: boolean;
                        minimum: number;
                    };
                    itemVersion: {
                        type: string;
                        minimum: number;
                        description: string;
                    };
                    priceStatus: {
                        type: string;
                        enum: string[];
                    };
                    version: {
                        type: string;
                        minimum: number;
                    };
                    id: {
                        type: string;
                        format: string;
                    };
                    itemId: {
                        type: string;
                        format: string;
                    };
                    size: {
                        type: string;
                        nullable: boolean;
                        maxLength: number;
                        description: string;
                    };
                    effectiveFrom: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                        description: string;
                    };
                    effectiveUntil: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
                        description: string;
                    };
                    priceServicePrimary: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    priceServiceSisterCompany: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    priceMaintenancePrimary: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    priceMaintenanceSisterCompany: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    isActive: {
                        type: string;
                    };
                    createdById: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                    };
                    createdByName: {
                        type: string;
                        readOnly: boolean;
                        description: string;
                    };
                    updatedById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
                    };
                    updatedByName: {
                        type: string;
                        nullable: boolean;
                        readOnly: boolean;
                        description: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            ItemListRow: {
                type: string;
                description: string;
                required: string[];
                properties: {
                    version: {
                        type: string;
                        minimum: number;
                    };
                    id: {
                        type: string;
                        format: string;
                    };
                    officeBranchId: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                    };
                    serviceId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        description: string;
                    };
                    name: {
                        type: string;
                    };
                    uom: {
                        type: string;
                        maxLength: number;
                        example: string;
                        description: string;
                    };
                    isActive: {
                        type: string;
                        enum: boolean[];
                    };
                    createdById: {
                        type: string;
                        format: string;
                        readOnly: boolean;
                    };
                    createdByName: {
                        type: string;
                        readOnly: boolean;
                    };
                    updatedById: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        readOnly: boolean;
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
                    service: {
                        type: string;
                        nullable: boolean;
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
                };
            };
            ItemDetail: {
                allOf: {
                    $ref: string;
                }[];
                description: string;
                properties: {
                    version: {
                        type: string;
                        minimum: number;
                    };
                    service: {
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
                            hasMaintenance: {
                                type: string;
                            };
                        };
                    };
                };
            };
            Pagination: {
                type: string;
                required: string[];
                properties: {
                    page: {
                        type: string;
                        minimum: number;
                    };
                    limit: {
                        type: string;
                        minimum: number;
                    };
                    total: {
                        type: string;
                        minimum: number;
                    };
                    totalPages: {
                        type: string;
                        minimum: number;
                    };
                };
            };
            CompanyResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            CompanyListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            companies: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                            pagination: {
                                $ref: string;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            CompanyStaffResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            CompanyStaffListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            staffs: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                            pagination: {
                                $ref: string;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ServiceResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ServiceHistoryResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            serviceId: {
                                type: string;
                                format: string;
                            };
                            history: {
                                type: string;
                                items: {
                                    type: string;
                                    required: string[];
                                    properties: {
                                        id: {
                                            type: string;
                                            format: string;
                                        };
                                        action: {
                                            type: string;
                                            example: string;
                                        };
                                        version: {
                                            type: string;
                                            minimum: number;
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
                                        changes: {
                                            type: string;
                                            items: {
                                                type: string;
                                                required: string[];
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
                                            };
                                        };
                                    };
                                };
                            };
                            pagination: {
                                $ref: string;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ServiceListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            services: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                            pagination: {
                                $ref: string;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            InspectionScopeResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            MaintenanceScopeResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ItemResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ItemDetailResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ItemSizeResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    data: {
                        $ref: string;
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ItemListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            items: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                            pagination: {
                                $ref: string;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ItemSizeListResponse: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        example: number;
                    };
                    success: {
                        type: string;
                        enum: boolean[];
                    };
                    data: {
                        type: string;
                        required: string[];
                        properties: {
                            sizes: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                            pagination: {
                                $ref: string;
                            };
                        };
                    };
                    requestId: {
                        type: string;
                        format: string;
                    };
                };
            };
            CreateCompanyRequest: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                properties: {
                    name: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    type: {
                        $ref: string;
                    };
                    address: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    npwp: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        example: string;
                    };
                    isSisterCompany: {
                        type: string;
                        default: boolean;
                    };
                };
            };
            UpdateCompanyRequest: {
                type: string;
                required: string[];
                minProperties: number;
                additionalProperties: boolean;
                description: string;
                properties: {
                    version: {
                        type: string;
                        minimum: number;
                        example: number;
                    };
                    name: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    type: {
                        $ref: string;
                    };
                    address: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    npwp: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        example: string;
                    };
                    isSisterCompany: {
                        type: string;
                    };
                };
            };
            CreateCompanyStaffRequest: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                properties: {
                    companyId: {
                        type: string;
                        format: string;
                    };
                    name: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    title: {
                        $ref: string;
                    };
                    telp: {
                        type: string;
                        nullable: boolean;
                        minLength: number;
                        maxLength: number;
                    };
                    email: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        maxLength: number;
                    };
                };
            };
            UpdateCompanyStaffRequest: {
                type: string;
                required: string[];
                minProperties: number;
                additionalProperties: boolean;
                description: string;
                properties: {
                    version: {
                        type: string;
                        minimum: number;
                        example: number;
                    };
                    name: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    title: {
                        $ref: string;
                    };
                    telp: {
                        type: string;
                        nullable: boolean;
                        minLength: number;
                        maxLength: number;
                    };
                    email: {
                        type: string;
                        format: string;
                        nullable: boolean;
                        maxLength: number;
                    };
                };
            };
            DeactivateCompanyStaffRequest: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                description: string;
                properties: {
                    version: {
                        type: string;
                        minimum: number;
                        example: number;
                    };
                };
            };
            CreateServiceRequest: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                properties: {
                    type: {
                        $ref: string;
                    };
                    name: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    hasMaintenance: {
                        type: string;
                        description: string;
                    };
                    inspectionScopes: {
                        type: string;
                        maxItems: number;
                        uniqueItems: boolean;
                        items: {
                            type: string;
                            minLength: number;
                            maxLength: number;
                        };
                        default: never[];
                    };
                    maintenanceScopes: {
                        type: string;
                        maxItems: number;
                        uniqueItems: boolean;
                        items: {
                            type: string;
                            minLength: number;
                            maxLength: number;
                        };
                        default: never[];
                    };
                };
            };
            UpdateServiceRequest: {
                type: string;
                required: string[];
                minProperties: number;
                additionalProperties: boolean;
                properties: {
                    version: {
                        type: string;
                        minimum: number;
                        example: number;
                        description: string;
                    };
                    type: {
                        $ref: string;
                    };
                    name: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    hasMaintenance: {
                        type: string;
                        description: string;
                    };
                };
            };
            DeactivateServiceRequest: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                description: string;
                properties: {
                    version: {
                        type: string;
                        minimum: number;
                        example: number;
                    };
                };
            };
            CreateInspectionScopeRequest: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                properties: {
                    inspectionScope: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                };
            };
            CreateMaintenanceScopeRequest: {
                type: string;
                required: string[];
                additionalProperties: boolean;
                properties: {
                    scope: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                };
            };
            CreateItemRequest: {
                type: string;
                additionalProperties: boolean;
                required: string[];
                description: string;
                properties: {
                    serviceId: {
                        type: string;
                        format: string;
                        nullable: boolean;
                    };
                    name: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                    };
                    uom: {
                        type: string;
                        minLength: number;
                        maxLength: number;
                        example: string;
                        description: string;
                    };
                    inspectionScopes: {
                        type: string;
                        maxItems: number;
                        uniqueItems: boolean;
                        default: never[];
                        items: {
                            type: string;
                            minLength: number;
                            maxLength: number;
                        };
                        description: string;
                    };
                    maintenanceScopes: {
                        type: string;
                        maxItems: number;
                        uniqueItems: boolean;
                        default: never[];
                        items: {
                            type: string;
                            minLength: number;
                            maxLength: number;
                        };
                        description: string;
                    };
                    sizes: {
                        type: string;
                        maxItems: number;
                        default: never[];
                        description: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
            };
            AddItemSizeRequest: {
                type: string;
                additionalProperties: boolean;
                required: string[];
                description: string;
                properties: {
                    itemVersion: {
                        type: string;
                        minimum: number;
                    };
                    itemId: {
                        type: string;
                        format: string;
                    };
                    size: {
                        type: string;
                        nullable: boolean;
                        minLength: number;
                        maxLength: number;
                        description: string;
                    };
                    priceServicePrimary: {
                        $ref: string;
                    };
                    priceServiceSisterCompany: {
                        $ref: string;
                    };
                    priceMaintenancePrimary: {
                        $ref: string;
                    };
                    priceMaintenanceSisterCompany: {
                        $ref: string;
                    };
                };
            };
            ItemSizeInput: {
                type: string;
                additionalProperties: boolean;
                required: string[];
                description: string;
                properties: {
                    size: {
                        type: string;
                        nullable: boolean;
                        minLength: number;
                        maxLength: number;
                        description: string;
                    };
                    priceServicePrimary: {
                        $ref: string;
                    };
                    priceServiceSisterCompany: {
                        $ref: string;
                    };
                    priceMaintenancePrimary: {
                        $ref: string;
                    };
                    priceMaintenanceSisterCompany: {
                        $ref: string;
                    };
                };
            };
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
    };
    paths: {
        '/health': {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/services': {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api-docs': {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        description: string;
                        content: {
                            'text/html': {
                                schema: {
                                    type: string;
                                };
                            };
                        };
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/health': {
            get: {
                tags: string[];
                summary: string;
                description: string;
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    503: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/health': {
            get: {
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
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    503: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/health': {
            get: {
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
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    503: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/finance/health': {
            get: {
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
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    503: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/fieldservice/health': {
            get: {
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
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    503: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api-docs.json': {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/register': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    201: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/.well-known/jwks.json': {
            get: {
                tags: string[];
                summary: string;
                description: string;
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/login': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        headers: {
                            'Set-Cookie': {
                                description: string;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/refresh-token': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                parameters: {
                    in: string;
                    name: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        headers: {
                            'Set-Cookie': {
                                description: string;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        headers: {
                            'Set-Cookie': {
                                description: string;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        headers: {
                            'Set-Cookie': {
                                description: string;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/logout': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                parameters: {
                    in: string;
                    name: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        headers: {
                            'Set-Cookie': {
                                description: string;
                                schema: {
                                    type: string;
                                };
                            };
                        };
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/me': {
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
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/profile': {
            put: {
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/password': {
            put: {
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/users': {
            get: {
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
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                        format?: undefined;
                        enum?: undefined;
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
                        minLength?: undefined;
                        maxLength?: undefined;
                        format?: undefined;
                        enum?: undefined;
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
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        format?: undefined;
                        enum?: undefined;
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
                        format: string;
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                        enum?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                        format?: undefined;
                    };
                })[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/auth/users/{userId}': {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            patch: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/menus/my-menus': {
            get: {
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
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/menus': {
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
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        maximum?: undefined;
                        enum?: undefined;
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
                        minLength?: undefined;
                        maxLength?: undefined;
                    };
                    description?: undefined;
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        enum: string[];
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
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
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        enum?: undefined;
                    };
                })[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    201: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/menus/{menuId}': {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            patch: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            delete: {
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
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/menu-accesses': {
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
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        maximum?: undefined;
                        format?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        maximum: number;
                        default: number;
                        format?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        format: string;
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        $ref: string;
                    };
                })[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    201: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/menu-accesses/{menuAccessId}': {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            patch: {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            delete: {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/menu-items': {
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
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        maximum?: undefined;
                        format?: undefined;
                        enum?: undefined;
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
                        format?: undefined;
                        enum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                    };
                    description?: undefined;
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        format: string;
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        enum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                    };
                    description?: undefined;
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        enum: string[];
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        format?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
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
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        format?: undefined;
                        enum?: undefined;
                    };
                })[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    201: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/menu-items/{menuItemId}': {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            patch: {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            delete: {
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
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/office-branches': {
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
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                        enum?: undefined;
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
                        minLength?: undefined;
                        maxLength?: undefined;
                        enum?: undefined;
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
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                    };
                    description?: undefined;
                })[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    201: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/office-branches/options': {
            get: {
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
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/app-manager/office-branches/{officeBranchId}': {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            patch: {
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
                    schema: {
                        type: string;
                        format: string;
                    };
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/companies': {
            get: {
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
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                        enum?: undefined;
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
                        minLength?: undefined;
                        maxLength?: undefined;
                        enum?: undefined;
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
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                    };
                    description?: undefined;
                })[];
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
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
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/companies/{companyId}': {
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
                    schema: {
                        type: string;
                        format: string;
                    };
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
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            patch: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/company-staffs': {
            get: {
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
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        maximum?: undefined;
                        format?: undefined;
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
                        format?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                    };
                    description?: undefined;
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        format: string;
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
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
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        format?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        $ref: string;
                    };
                    description?: undefined;
                })[];
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
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
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/company-staffs/{companyStaffId}': {
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
                    schema: {
                        type: string;
                        format: string;
                    };
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
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            patch: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            delete: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/services': {
            get: {
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
                parameters: ({
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default: string;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                        enum?: undefined;
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
                        minLength?: undefined;
                        maxLength?: undefined;
                        enum?: undefined;
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
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                        minLength?: undefined;
                        maxLength?: undefined;
                    };
                    description?: undefined;
                } | {
                    in: string;
                    name: string;
                    description: string;
                    schema: {
                        $ref: string;
                    };
                })[];
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
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
                requestBody: {
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
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
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/services/{serviceId}': {
            get: {
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
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            patch: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
            delete: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
                };
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/services/{serviceId}/history': {
            get: {
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
                parameters: ({
                    in: string;
                    name: string;
                    required: boolean;
                    schema: {
                        type: string;
                        format: string;
                        minimum?: undefined;
                        default?: undefined;
                        maximum?: undefined;
                    };
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        default: number;
                        format?: undefined;
                        maximum?: undefined;
                    };
                    required?: undefined;
                } | {
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        minimum: number;
                        maximum: number;
                        default: number;
                        format?: undefined;
                    };
                    required?: undefined;
                })[];
                responses: {
                    200: {
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/services/{serviceId}/inspection/scopes': {
            post: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
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
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/services/{serviceId}/inspection/scopes/{inspectionScopeId}': {
            delete: {
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
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/services/{serviceId}/maintenance/scopes': {
            post: {
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
                    content: {
                        'application/json': {
                            schema: object;
                        };
                    };
                    required: boolean;
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
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
        '/api/v1/marketing/services/{serviceId}/maintenance/scopes/{scopeId}': {
            delete: {
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
                        content: {
                            'application/json': {
                                schema: object;
                            };
                        };
                        description: string;
                    };
                    400: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    401: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    403: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    404: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    409: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    429: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                    500: {
                        content?: {
                            'application/json': {
                                schema: object;
                            };
                        } | undefined;
                        description: string;
                    };
                };
            };
        };
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
};
