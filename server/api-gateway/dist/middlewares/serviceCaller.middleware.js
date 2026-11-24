"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateServiceCaller = void 0;
const node_crypto_1 = require("node:crypto");
const env_js_1 = require("../config/env.js");
const serviceSecrets = {
    'auth-service': env_js_1.env.AUTH_SERVICE_GATEWAY_SECRET,
    'app-manager-service': env_js_1.env.APP_MANAGER_SERVICE_GATEWAY_SECRET,
    'marketing-service': env_js_1.env.MARKETING_SERVICE_GATEWAY_SECRET,
    'finance-service': env_js_1.env.FINANCE_SERVICE_GATEWAY_SECRET,
    'fieldservice-service': env_js_1.env.FIELDSERVICE_SERVICE_GATEWAY_SECRET,
};
const secretsMatch = (actual, expected) => {
    const actualBuffer = Buffer.from(actual);
    const expectedBuffer = Buffer.from(expected);
    return actualBuffer.length === expectedBuffer.length && (0, node_crypto_1.timingSafeEqual)(actualBuffer, expectedBuffer);
};
const authenticateServiceCaller = (req, res, next) => {
    const serviceName = req.headers['x-service-name'];
    const serviceSecret = req.headers['x-service-secret'];
    if (serviceName === undefined && serviceSecret === undefined) {
        next();
        return;
    }
    const expectedSecret = typeof serviceName === 'string'
        ? serviceSecrets[serviceName]
        : undefined;
    if (typeof serviceSecret !== 'string' || !expectedSecret || !secretsMatch(serviceSecret, expectedSecret)) {
        res.status(403).json({
            status: 403,
            success: false,
            message: 'Invalid internal service credentials',
            requestId: req.headers['x-request-id'],
        });
        return;
    }
    res.locals.serviceCaller = serviceName;
    next();
};
exports.authenticateServiceCaller = authenticateServiceCaller;
//# sourceMappingURL=serviceCaller.middleware.js.map