"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_js_1 = require("../utils/logger.js");
const env_js_1 = require("../config/env.js");
const errorDetails_js_1 = require("../utils/errorDetails.js");
const errorHandler = (err, req, res, _next) => {
    const requestId = req.headers['x-request-id'];
    const status = (0, errorDetails_js_1.getErrorStatus)(err);
    const message = (0, errorDetails_js_1.getErrorMessage)(err);
    const stack = (0, errorDetails_js_1.getErrorStack)(err);
    const clientMessage = status >= 500 ? 'Internal server error' : message;
    logger_js_1.logger.error(`Error processing request ${req.method} ${req.url}: ${message}`, {
        requestId,
        error: stack || err,
    });
    res.status(status).json({
        status,
        success: false,
        message: clientMessage,
        requestId,
        ...(env_js_1.env.NODE_ENV === 'development' && stack && { stack }),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map