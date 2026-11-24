"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const env_js_1 = require("./config/env.js");
const logger_js_1 = require("./utils/logger.js");
const server = app_js_1.default.listen(env_js_1.env.PORT, () => {
    logger_js_1.logger.info(`API Gateway running on port ${env_js_1.env.PORT} [${env_js_1.env.NODE_ENV}]`);
    logger_js_1.logger.info(`Health check: http://localhost:${env_js_1.env.PORT}/health`);
    logger_js_1.logger.info(`Registered services: http://localhost:${env_js_1.env.PORT}/services`);
});
const gracefulShutdown = (signal) => {
    logger_js_1.logger.info(`Received ${signal}. Gracefully shutting down API Gateway...`);
    server.close(() => {
        logger_js_1.logger.info('HTTP server closed.');
        process.exit(0);
    });
    setTimeout(() => {
        logger_js_1.logger.error('Forceful shutdown triggered after timeout.');
        process.exit(1);
    }, 10_000).unref();
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
//# sourceMappingURL=server.js.map