"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGatewayOnlyPath = exports.allowsLocalDirectAccess = void 0;
const env_js_1 = require("../config/env.js");
/**
 * Direct browser access to a service running on the developer machine.
 *
 * Enabled only while NODE_ENV is development and the process is not hosted on
 * Vercel. A deployed service keeps the unconditional gateway-secret check even
 * when NODE_ENV is development.
 */
const allowsLocalDirectAccess = () => env_js_1.env.NODE_ENV === 'development' && process.env.VERCEL !== '1';
exports.allowsLocalDirectAccess = allowsLocalDirectAccess;
/** Internal callbacks and delivery endpoints stay gateway-only. */
const isGatewayOnlyPath = (req) => req.path === '/internal' || req.path.startsWith('/internal/');
exports.isGatewayOnlyPath = isGatewayOnlyPath;
//# sourceMappingURL=localDirectAccess.js.map