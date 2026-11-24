"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logger_js_1 = require("../utils/logger.js");
const loggerMiddleware = (req, res, next) => {
    const startTime = Date.now();
    const requestId = req.headers['x-request-id'];
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const { method, originalUrl } = req;
        const { statusCode } = res;
        logger_js_1.logger.info(`${method} ${originalUrl} ${statusCode} - ${duration}ms`, {
            requestId,
            method,
            url: originalUrl,
            status: statusCode,
            durationMs: duration,
            ip: req.ip,
        });
    });
    next();
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map