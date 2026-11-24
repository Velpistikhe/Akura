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
 * Refuses a development configuration that points at an unintended remote system.
 *
 * Hybrid local runs use the Neon development branch and the deployed API gateway
 * without a per-machine host list: only those hosted targets and local services
 * are approved.
 */
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '::1', '0.0.0.0'];
const DEPLOYED_API_GATEWAY_HOST = 'akura-api-gateway.vercel.app';
const isApprovedDevelopmentHost = (host) => {
    const normalized = host.toLowerCase();
    if (LOCAL_HOSTS.includes(normalized))
        return true;
    if (normalized.endsWith('.neon.tech'))
        return true;
    if (normalized === DEPLOYED_API_GATEWAY_HOST)
        return true;
    return false;
};
const assertAllowedTarget = (label, value, context) => {
    let host;
    try {
        host = new URL(value.includes('://') ? value : `postgresql://${value}`).hostname;
    }
    catch {
        return;
    }
    if (!host)
        return;
    if (isApprovedDevelopmentHost(host))
        return;
    context.addIssue({
        code: zod_1.z.ZodIssueCode.custom,
        message: `${label} must point at a local host, a Neon development host (*.neon.tech), or ${DEPLOYED_API_GATEWAY_HOST}, but it points at "${host}".`,
    });
};
const schema = zod_1.z.object({
    PORT: zod_1.z.string().default('5003').transform((value) => Number.parseInt(value, 10)),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    GATEWAY_SECRET: zod_1.z.string().min(1),
    DATABASE_URL: zod_1.z.string().min(1),
    API_GATEWAY_URL: zod_1.z.string({ required_error: 'API_GATEWAY_URL is required' })
        .url('API_GATEWAY_URL must be a valid URL')
        .transform((value) => value.replace(/\/$/, '')),
    TAX_SYNC_SECRET: zod_1.z.string().min(32).optional(),
    WORK_ORDER_SYNC_SECRET: zod_1.z.string().min(32).optional(),
    JWT_ISSUER: zod_1.z.string().min(1).default('akura-auth'),
    JWT_AUDIENCE: zod_1.z.string().min(1).default('akura-api'),
    AWS_ENDPOINT_URL_S3: zod_1.z.string().url().optional(),
    AWS_ACCESS_KEY_ID: zod_1.z.string().min(1).optional(),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string().min(1).optional(),
    AWS_REGION: zod_1.z.string().min(1).default('us-east-2'),
    AWS_S3_BUCKET: zod_1.z.string().min(1).default('akura'),
}).superRefine((value, context) => {
    if (value.NODE_ENV !== 'development')
        return;
    assertAllowedTarget('DATABASE_URL', value.DATABASE_URL, context);
    assertAllowedTarget('API_GATEWAY_URL', value.API_GATEWAY_URL, context);
    if (value.AWS_ENDPOINT_URL_S3)
        assertAllowedTarget('AWS_ENDPOINT_URL_S3', value.AWS_ENDPOINT_URL_S3, context);
});
const result = schema.safeParse(process.env);
if (!result.success) {
    console.error('Invalid Marketing Service environment variables:', JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
}
exports.env = result.data;
//# sourceMappingURL=env.js.map