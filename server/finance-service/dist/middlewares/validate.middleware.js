"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (source, schema) => (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
        res.status(400).json({
            status: 400,
            success: false,
            message: 'Validation failed',
            errors: result.error.errors,
            requestId: req.headers['x-request-id'],
        });
        return;
    }
    res.locals[source] = result.data;
    next();
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map