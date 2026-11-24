"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fs_1 = require("node:fs");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_js_1 = require("./config/swagger.config.js");
const env_js_1 = require("./config/env.js");
const requestId_middleware_js_1 = require("./middlewares/requestId.middleware.js");
const logger_middleware_js_1 = require("./middlewares/logger.middleware.js");
const rateLimiter_middleware_js_1 = require("./middlewares/rateLimiter.middleware.js");
const error_middleware_js_1 = require("./middlewares/error.middleware.js");
const proxy_routes_js_1 = __importDefault(require("./routes/proxy.routes.js"));
const services_config_js_1 = require("./config/services.config.js");
const serviceCaller_middleware_js_1 = require("./middlewares/serviceCaller.middleware.js");
const localOrigin_js_1 = require("./utils/localOrigin.js");
const app = (0, express_1.default)();
const swaggerCss = (0, node_fs_1.readFileSync)(require.resolve('swagger-ui-dist/swagger-ui.css'), 'utf8');
const allowedCorsOrigins = env_js_1.env.CORS_ORIGIN.split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);
const corsOptions = {
    origin: env_js_1.env.CORS_ORIGIN === '*'
        ? true
        : (origin, callback) => {
            if (!origin || allowedCorsOrigins.includes(origin.replace(/\/$/, ''))
                || (env_js_1.env.NODE_ENV === 'development' && process.env.VERCEL !== '1' && (0, localOrigin_js_1.isLocalOrigin)(origin))) {
                callback(null, true);
                return;
            }
            callback(null, false);
        },
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
};
// Vercel overwrites X-Forwarded-For with the public client IP before invoking
// the Express function. Trust only the direct Vercel proxy hop so req.ip and
// express-rate-limit identify clients correctly without accepting arbitrary
// forwarded chains in local or non-Vercel environments.
if (process.env.VERCEL === '1') {
    app.set('trust proxy', 1);
}
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
app.use(requestId_middleware_js_1.requestIdMiddleware);
app.use(logger_middleware_js_1.loggerMiddleware);
app.use((0, cookie_parser_1.default)());
app.use(serviceCaller_middleware_js_1.authenticateServiceCaller);
app.use(rateLimiter_middleware_js_1.globalRateLimiter);
// Credential submission endpoints get a tighter per-IP limit than the general
// API so brute-force attempts against a single account are throttled.
// Registration stays open, so it is limited rather than blocked.
app.post(['/api/v1/auth/login', '/api/v1/auth/register', '/api/v1/auth/refresh-token'], rateLimiter_middleware_js_1.authRateLimiter);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_js_1.swaggerSpec, { customCss: swaggerCss }));
app.get('/api-docs.json', (_req, res) => {
    res.status(200).json(swagger_config_js_1.swaggerSpec);
});
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        message: 'API Gateway is healthy',
        data: {
            service: 'api-gateway',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        },
        requestId: req.headers['x-request-id'],
    });
});
app.get('/services', (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        message: 'Services list retrieved successfully',
        data: services_config_js_1.servicesConfig.map((s) => ({
            prefix: s.prefix,
            target: s.target,
            authRequired: s.authRequired,
            description: s.description,
        })),
        requestId: req.headers['x-request-id'],
    });
});
app.use(proxy_routes_js_1.default);
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found on API Gateway`,
        requestId: req.headers['x-request-id'],
    });
});
app.use(error_middleware_js_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map