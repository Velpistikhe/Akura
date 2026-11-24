"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGatewayAuthMe = void 0;
const env_js_1 = require("../config/env.js");
/** Client-style profile read through the deployed gateway (Bearer only). */
const fetchGatewayAuthMe = (token, requestId) => fetch(`${env_js_1.env.API_GATEWAY_URL}/api/v1/auth/me`, {
    headers: {
        Authorization: `Bearer ${token}`,
        ...(requestId ? { 'x-request-id': requestId } : {}),
    },
    signal: AbortSignal.timeout(10_000),
});
exports.fetchGatewayAuthMe = fetchGatewayAuthMe;
//# sourceMappingURL=gatewayAuthMe.js.map