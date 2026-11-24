"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const db_js_1 = require("../../config/db.js");
const requestTokens_js_1 = require("../../utils/requestTokens.js");
const tokens_js_1 = require("../../utils/tokens.js");
const authenticate = async (req, res, next) => {
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
    let decoded;
    try {
        decoded = (0, tokens_js_1.verifyAccessToken)(token);
    }
    catch {
        res.status(401).json({
            status: 401,
            success: false,
            message: 'Unauthorized: Access token is invalid or expired',
            requestId,
        });
        return;
    }
    try {
        const user = await db_js_1.prisma.user.findUnique({
            where: { id: decoded.sub },
            select: { isActive: true },
        });
        if (!user?.isActive) {
            res.status(403).json({
                status: 403,
                success: false,
                message: 'Account is inactive',
                requestId,
            });
            return;
        }
        req.user = {
            id: decoded.sub,
            name: decoded.name,
            username: decoded.username,
            role: decoded.role,
            officeBranchId: decoded.officeBranchId,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map