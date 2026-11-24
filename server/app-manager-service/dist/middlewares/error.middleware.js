"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const env_js_1 = require("../config/env.js");
const errorDetails_js_1 = require("../utils/errorDetails.js");
const logger_js_1 = require("../utils/logger.js");
const errorHandler = (error, req, res, _next) => {
    const status = (0, errorDetails_js_1.getErrorStatus)(error);
    const message = (0, errorDetails_js_1.getErrorMessage)(error);
    const stack = (0, errorDetails_js_1.getErrorStack)(error);
    const clientMessage = status >= 500 ? 'Internal server error' : message;
    const metadata = { requestId: req.headers['x-request-id'], error: stack || error };
    if (status >= 500)
        logger_js_1.logger.error(message, metadata);
    else
        logger_js_1.logger.warn(message, metadata);
    res.status(status).json({
        status,
        success: false,
        message: clientMessage,
        requestId: req.headers['x-request-id'],
        ...(env_js_1.env.NODE_ENV === 'development' && stack && { stack }),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map