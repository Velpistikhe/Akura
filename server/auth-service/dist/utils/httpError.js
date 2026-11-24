"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRejectedError = exports.HttpError = void 0;
class HttpError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }
}
exports.HttpError = HttpError;
class RefreshTokenRejectedError extends HttpError {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.name = 'RefreshTokenRejectedError';
    }
}
exports.RefreshTokenRejectedError = RefreshTokenRejectedError;
//# sourceMappingURL=httpError.js.map