"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewayGet = gatewayGet;
const serviceUrl_js_1 = require("../utils/serviceUrl.js");
const requestTokens_js_1 = require("../utils/requestTokens.js");
const httpError_js_1 = require("../utils/httpError.js");
// The only remaining upstream call is the authenticated profile read used by the
// actor middleware. Billing document references were removed with the invoice
// and proforma invoice modules.
async function gatewayGet(path, req, body) {
    const token = (0, requestTokens_js_1.getAccessToken)(req);
    if (!token)
        throw new httpError_js_1.HttpError('Access token is required', 401);
    const user = req.user;
    if (!user)
        throw new httpError_js_1.HttpError('Verified user is required', 401);
    let response;
    try {
        response = await fetch((0, serviceUrl_js_1.serviceUrl)(path), {
            ...(body === undefined ? {} : { method: 'POST', body: JSON.stringify(body), redirect: 'error' }),
            headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}`, ...(0, serviceUrl_js_1.serviceHeaders)(path),
                'x-request-id': String(req.headers['x-request-id'] ?? '') },
            signal: AbortSignal.timeout(5000),
        });
    }
    catch {
        throw new httpError_js_1.HttpError('Referenced service is unavailable; retry later', 503);
    }
    if (!response.ok) {
        const status = [400, 401, 403, 404, 409].includes(response.status) ? response.status : 503;
        throw new httpError_js_1.HttpError(status === 404 ? 'Referenced record not found' : 'Unable to validate reference with upstream service', status);
    }
    try {
        return (await response.json()).data;
    }
    catch {
        throw new httpError_js_1.HttpError('Invalid response from referenced service', 502);
    }
}
//# sourceMappingURL=gateway.js.map