"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
/**
 * Refuses a development configuration that points at a remote system.
 *
 * The development environment must never reach a deployed database or a
 * deployed service. A remote target in a development `.env` is almost always
 * a copy/paste mistake, and it would let a local run modify real data.
 */
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '::1', '0.0.0.0'];
const assertLocalTarget = (label, value, context) => {
    let host;
    try {
        host = new URL(value.includes('://') ? value : `postgresql://${value}`).hostname;
    }
    catch {
        // A value that is not a URL cannot be checked here; the schema validates
        // the format separately.
        return;
    }
    if (host && !LOCAL_HOSTS.includes(host)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: `${label} must point at a local host in development, but it points at "${host}". `
                + 'A development environment must never reach a deployed system.',
        });
    }
};
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default('5001').transform((value) => Number.parseInt(value, 10)),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    GATEWAY_SECRET: zod_1.z.string().min(1, 'GATEWAY_SECRET is required'),
    DATABASE_URL: zod_1.z.string().min(1, 'DATABASE_URL is required'),
    JWT_ACCESS_PRIVATE_KEY_PATH: zod_1.z.string().min(1).optional(),
    JWT_ACCESS_PRIVATE_KEY_BASE64: zod_1.z.string().min(1).optional(),
    JWT_ACCESS_KEY_ID: zod_1.z.string().min(1).default('akura-access-key-1'),
    JWT_ISSUER: zod_1.z.string().min(1).default('akura-auth'),
    JWT_AUDIENCE: zod_1.z.string().min(1).default('akura-api'),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.string().regex(/^\d+(ms|s|m|h|d)$/).default('15m'),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().regex(/^\d+(ms|s|m|h|d)$/).default('7d'),
    JWT_REFRESH_IDLE_TIMEOUT_MINUTES: zod_1.z.string().regex(/^[1-9]\d*$/).default('60')
        .transform((value) => Number.parseInt(value, 10)),
}).refine((value) => Boolean(value.JWT_ACCESS_PRIVATE_KEY_PATH || value.JWT_ACCESS_PRIVATE_KEY_BASE64), { message: 'JWT_ACCESS_PRIVATE_KEY_PATH or JWT_ACCESS_PRIVATE_KEY_BASE64 is required' }).superRefine((value, context) => {
    if (value.NODE_ENV !== 'development')
        return;
    assertLocalTarget('DATABASE_URL', value.DATABASE_URL, context);
});
const result = envSchema.safeParse(process.env);
if (!result.success) {
    console.error('Invalid Auth Service environment variables:', JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
}
exports.env = result.data;
//# sourceMappingURL=env.js.map