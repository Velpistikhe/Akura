"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const requestId_middleware_js_1 = require("./middlewares/requestId.middleware.js");
const gateway_middleware_js_1 = require("./middlewares/gateway.middleware.js");
const error_middleware_js_1 = require("./middlewares/error.middleware.js");
const auth_routes_js_1 = __importDefault(require("./modules/auth/auth.routes.js"));
const accessKey_js_1 = require("./config/accessKey.js");
const user_management_routes_js_1 = __importDefault(require("./modules/user-management/user-management.routes.js"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(gateway_middleware_js_1.verifyGatewaySecret);
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use(requestId_middleware_js_1.requestIdMiddleware);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        message: 'Auth Service is healthy',
        data: {
            service: 'auth-service',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        },
        requestId: req.headers['x-request-id'],
    });
});
app.get('/.well-known/jwks.json', (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json(accessKey_js_1.accessTokenJwks);
});
app.use('/users', user_management_routes_js_1.default);
app.use('/', auth_routes_js_1.default);
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found on Auth Service`,
        requestId: req.headers['x-request-id'],
    });
});
app.use(error_middleware_js_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map