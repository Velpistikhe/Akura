"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGatewaySecret = void 0;
const env_js_1 = require("../config/env.js");
const verifyGatewaySecret = (req, res, next) => {
    const gatewaySecret = req.headers['x-gateway-secret'];
    if (!gatewaySecret || gatewaySecret !== env_js_1.env.GATEWAY_SECRET) {
        res.status(403).json({
            status: 403,
            success: false,
            message: 'Access Denied: Microservices can only be accessed through the API Gateway',
            requestId: req.headers['x-request-id'],
        });
        return;
    }
    next();
};
exports.verifyGatewaySecret = verifyGatewaySecret;
//# sourceMappingURL=gateway.middleware.js.map