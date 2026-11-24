export declare const env: {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    GATEWAY_SECRET: string;
    DATABASE_URL: string;
    API_GATEWAY_URL: string;
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    AWS_REGION: string;
    AWS_S3_BUCKET: string;
    TAX_SYNC_SECRET?: string | undefined;
    WORK_ORDER_SYNC_SECRET?: string | undefined;
    AWS_ENDPOINT_URL_S3?: string | undefined;
    AWS_ACCESS_KEY_ID?: string | undefined;
    AWS_SECRET_ACCESS_KEY?: string | undefined;
};
