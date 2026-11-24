export declare const env: {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    GATEWAY_SECRET: string;
    DATABASE_URL: string;
    JWT_ACCESS_KEY_ID: string;
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    JWT_REFRESH_IDLE_TIMEOUT_MINUTES: number;
    JWT_ACCESS_PRIVATE_KEY_PATH?: string | undefined;
    JWT_ACCESS_PRIVATE_KEY_BASE64?: string | undefined;
};
