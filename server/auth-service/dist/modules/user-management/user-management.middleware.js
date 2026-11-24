"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAppManager = void 0;
const client_1 = require("@prisma/client");
const db_js_1 = require("../../config/db.js");
const requireAppManager = async (req, res, next) => {
    const actorId = req.user?.id;
    if (!actorId) {
        res.status(401).json({ status: 401, success: false, message: 'Unauthorized', requestId: req.headers['x-request-id'] });
        return;
    }
    try {
        const actor = await db_js_1.prisma.user.findUnique({ where: { id: actorId }, select: { role: true, isActive: true } });
        if (!actor?.isActive || actor.role !== client_1.UserRole.APP_MANAGER) {
            res.status(403).json({ status: 403, success: false, message: 'Active app manager role is required', requestId: req.headers['x-request-id'] });
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.requireAppManager = requireAppManager;
//# sourceMappingURL=user-management.middleware.js.map