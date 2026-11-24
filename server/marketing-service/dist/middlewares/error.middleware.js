"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const env_js_1 = require("../config/env.js");
const logger_js_1 = require("../utils/logger.js");
const errorHandler = (error, req, res, _next) => {
    let status = typeof error?.statusCode === 'number' ? error.statusCode : 500;
    let message = error instanceof Error ? error.message : 'Internal Server Error';
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        status = 409;
        message = 'A record with the same unique value already exists';
    }
    const clientMessage = status >= 500 ? 'Internal server error' : message;
    logger_js_1.logger.log(status >= 500 ? 'error' : 'warn', message, { requestId: req.headers['x-request-id'], error: status >= 500 ? error : undefined });
    res.status(status).json({ status, success: false, message: clientMessage, requestId: req.headers['x-request-id'], ...(env_js_1.env.NODE_ENV === 'development' && error instanceof Error && { stack: error.stack }) });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map