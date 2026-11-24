"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const logger_js_1 = require("../utils/logger.js");
const errorDetails_js_1 = require("../utils/errorDetails.js");
const requestTokens_js_1 = require("../utils/requestTokens.js");
const tokens_js_1 = require("../utils/tokens.js");
const authenticateJwt = async (req, res, next) => {
    const requestId = req.headers['x-request-id'];
    const token = (0, requestTokens_js_1.getAccessToken)(req);
    if (!token) {
        res.status(401).json({
            status: 401,
            success: false,
            message: 'Unauthorized: Missing or invalid Authorization header/cookie',
            requestId,
        });
        return;
    }
    try {
        const decoded = await (0, tokens_js_1.verifyAccessToken)(token);
        req.headers['x-user-id'] = decoded.sub;
        if (decoded.role)
            req.headers['x-user-role'] = decoded.role;
        if (decoded.section)
            req.headers['x-user-section'] = decoded.section;
        if (decoded.name)
            req.headers['x-user-name'] = decoded.name;
        if (decoded.username)
            req.headers['x-user-username'] = decoded.username;
        if (decoded.officeBranchId)
            req.headers['x-office-branch-id'] = decoded.officeBranchId;
        next();
    }
    catch (error) {
        logger_js_1.logger.warn(`JWT verification failed: ${(0, errorDetails_js_1.getErrorMessage)(error)}`, { requestId });
        res.status(401).json({
            status: 401,
            success: false,
            message: 'Unauthorized: Invalid or expired access token',
            requestId,
        });
    }
};
exports.authenticateJwt = authenticateJwt;
//# sourceMappingURL=auth.middleware.js.map