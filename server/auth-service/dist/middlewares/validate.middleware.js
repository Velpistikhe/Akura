"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.validate = void 0;
const validate = (source, schema) => (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
        res.status(400).json({
            status: 400,
            success: false,
            message: result.error.errors[0]?.message ?? 'Validation failed',
            errors: result.error.errors,
            requestId: req.headers['x-request-id'],
        });
        return;
    }
    res.locals[source] = result.data;
    next();
};
exports.validate = validate;
const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const firstError = result.error.errors[0];
        res.status(400).json({
            status: 400,
            success: false,
            message: firstError?.message ?? 'Validation failed',
            errors: result.error.errors,
            requestId: req.headers['x-request-id'],
        });
        return;
    }
    req.body = result.data;
    next();
};
exports.validateBody = validateBody;
//# sourceMappingURL=validate.middleware.js.map