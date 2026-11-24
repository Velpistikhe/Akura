"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_middleware_js_1 = require("../../middlewares/authorize.middleware.js");
const validate_middleware_js_1 = require("../../middlewares/validate.middleware.js");
const asyncHandler_js_1 = require("../../utils/asyncHandler.js");
const audit_trail_controller_js_1 = require("./audit-trail.controller.js");
const audit_trail_schemas_js_1 = require("./audit-trail.schemas.js");
const router = (0, express_1.Router)();
router.use((0, asyncHandler_js_1.asyncHandler)(authorize_middleware_js_1.requireAppManager));
router.get('/', (0, validate_middleware_js_1.validate)('query', audit_trail_schemas_js_1.listAuditTrailSchema), (0, asyncHandler_js_1.asyncHandler)(audit_trail_controller_js_1.auditTrailController.list));
router.get('/entity/:entityId', (0, validate_middleware_js_1.validate)('params', audit_trail_schemas_js_1.auditTrailEntitySchema), (0, asyncHandler_js_1.asyncHandler)(audit_trail_controller_js_1.auditTrailController.listForEntity));
exports.default = router;
//# sourceMappingURL=audit-trail.routes.js.map