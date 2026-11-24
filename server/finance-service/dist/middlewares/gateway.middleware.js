"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGatewaySecret = void 0;
const env_js_1 = require("../config/env.js");
const verifyGatewaySecret = (req, res, next) => {
    // Every request must arrive through the API Gateway. The gateway injects the
    // per-service secret on every proxied request, so a request that reaches the
    // service directly - from a browser or from any other client - is refused.
    if (req.headers['x-gateway-secret'] !== env_js_1.env.GATEWAY_SECRET) {
        res.status(403).json({
            status: 403,
            success: false,
            message: 'Access denied: requests must pass through the API Gateway',
            requestId: req.headers['x-request-id'],
        });
        return;
    }
    next();
};
exports.verifyGatewaySecret = verifyGatewaySecret;
//# sourceMappingURL=gateway.middleware.js.map