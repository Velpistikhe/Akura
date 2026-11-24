"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const db_js_1 = require("./config/db.js");
const env_js_1 = require("./config/env.js");
const logger_js_1 = require("./utils/logger.js");
const start = async () => {
    try {
        await (0, db_js_1.connectDb)();
        const server = app_js_1.default.listen(env_js_1.env.PORT, () => logger_js_1.logger.info(`Marketing Service is running on port ${env_js_1.env.PORT}`));
        const shutdown = (signal) => {
            logger_js_1.logger.info(`Received ${signal}; shutting down Marketing Service.`);
            server.close(() => void (0, db_js_1.disconnectDb)().finally(() => process.exit(0)));
            setTimeout(() => process.exit(1), 10_000).unref();
        };
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }
    catch (error) {
        logger_js_1.logger.error('Failed to start Marketing Service', { error });
        process.exit(1);
    }
};
void start();
//# sourceMappingURL=server.js.map