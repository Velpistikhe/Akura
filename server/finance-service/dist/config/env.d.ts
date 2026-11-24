export declare const env: {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    DEV_ALLOWED_REMOTE_HOSTS: string;
    DATABASE_URL: string;
    GATEWAY_SECRET: string;
    API_GATEWAY_URL: string;
    TAX_DELIVERY_TARGETS: {
        name: string;
        url: string;
    }[];
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    TAX_SYNC_SECRET?: string | undefined;
};
