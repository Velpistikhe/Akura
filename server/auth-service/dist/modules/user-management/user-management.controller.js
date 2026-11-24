"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManagementController = void 0;
const authenticatedUser_js_1 = require("../../utils/authenticatedUser.js");
const user_management_service_js_1 = require("./user-management.service.js");
const send = (req, res, message, data) => {
    res.status(200).json({ status: 200, success: true, message, data, requestId: req.headers['x-request-id'] });
};
exports.userManagementController = {
    async list(req, res) {
        // The visibility scope follows the role of the caller: an app manager reads
        // every user of every branch, any other caller reads only the active users
        // of their own branch.
        const actor = (0, authenticatedUser_js_1.getAuthenticatedActorContext)(req);
        const scope = { isAppManager: actor.role === 'APP_MANAGER', officeBranchId: actor.officeBranchId };
        send(req, res, 'Users retrieved successfully', await user_management_service_js_1.userManagementService.list(res.locals.query, scope));
    },
    async get(req, res) { send(req, res, 'User retrieved successfully', await user_management_service_js_1.userManagementService.get(res.locals.params.userId)); },
    async update(req, res) {
        send(req, res, 'User updated successfully', await user_management_service_js_1.userManagementService.update((0, authenticatedUser_js_1.getAuthenticatedActor)(req), res.locals.params.userId, res.locals.body));
    },
};
//# sourceMappingURL=user-management.controller.js.map