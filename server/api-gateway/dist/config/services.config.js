"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesConfig = void 0;
const env_js_1 = require("./env.js");
exports.servicesConfig = [
    {
        prefix: '/api/v1/marketing/internal/taxes/events',
        target: env_js_1.env.MARKETING_SERVICE_URL,
        gatewaySecret: env_js_1.env.MARKETING_SERVICE_GATEWAY_SECRET,
        authRequired: false,
        internalCaller: 'finance-service',
        // Express removes the entire mounted prefix before invoking the proxy.
        pathRewrite: { '^/': '/internal/taxes/events' },
        description: 'Internal Finance tax delivery to Marketing',
    },
    {
        prefix: '/api/v1/marketing/internal/quotations',
        target: env_js_1.env.MARKETING_SERVICE_URL,
        gatewaySecret: env_js_1.env.MARKETING_SERVICE_GATEWAY_SECRET,
        authRequired: false,
        internalCaller: 'fieldservice-service',
        // Express removes the entire mounted prefix before invoking the proxy, so
        // only the quotation id and the work-order segment are left. They are put
        // back on the internal quotation path (the trailing slash is required so
        // `/uuid/work-order` does not concatenate onto `quotations`).
        pathRewrite: { '^/': '/internal/quotations/' },
        description: 'Internal Field Service Work Order link delivery to Marketing',
    },
    {
        prefix: '/api/v1/auth',
        target: env_js_1.env.AUTH_SERVICE_URL,
        gatewaySecret: env_js_1.env.AUTH_SERVICE_GATEWAY_SECRET,
        authRequired: false,
        pathRewrite: { '^/api/v1/auth': '' },
        description: 'Authentication Service',
    },
    {
        prefix: '/api/v1/app-manager',
        target: env_js_1.env.APP_MANAGER_SERVICE_URL,
        gatewaySecret: env_js_1.env.APP_MANAGER_SERVICE_GATEWAY_SECRET,
        authRequired: true,
        pathRewrite: { '^/api/v1/app-manager': '' },
        description: 'App Manager Service',
    },
    {
        prefix: '/api/v1/marketing',
        target: env_js_1.env.MARKETING_SERVICE_URL,
        gatewaySecret: env_js_1.env.MARKETING_SERVICE_GATEWAY_SECRET,
        authRequired: true,
        pathRewrite: { '^/api/v1/marketing': '' },
        description: 'Marketing Service',
    },
];
if (env_js_1.env.FINANCE_SERVICE_URL && env_js_1.env.FINANCE_SERVICE_GATEWAY_SECRET) {
    exports.servicesConfig.push({
        prefix: '/api/v1/finance', target: env_js_1.env.FINANCE_SERVICE_URL,
        gatewaySecret: env_js_1.env.FINANCE_SERVICE_GATEWAY_SECRET, authRequired: true,
        pathRewrite: { '^/api/v1/finance': '' }, description: 'Finance Service',
    });
}
if (env_js_1.env.FIELDSERVICE_SERVICE_URL && env_js_1.env.FIELDSERVICE_SERVICE_GATEWAY_SECRET) {
    exports.servicesConfig.push({
        prefix: '/api/v1/fieldservice', target: env_js_1.env.FIELDSERVICE_SERVICE_URL,
        gatewaySecret: env_js_1.env.FIELDSERVICE_SERVICE_GATEWAY_SECRET, authRequired: true,
        pathRewrite: { '^/api/v1/fieldservice': '' }, description: 'Field Service Service',
    });
}
//# sourceMappingURL=services.config.js.map