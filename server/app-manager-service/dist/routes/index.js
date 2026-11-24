"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_trail_routes_js_1 = __importDefault(require("../modules/audit-trail/audit-trail.routes.js"));
const menu_item_routes_js_1 = __importDefault(require("../modules/menu/menu-items/menu-item.routes.js"));
const menu_access_routes_js_1 = __importDefault(require("../modules/menu/menu-accesses/menu-access.routes.js"));
const menu_routes_js_1 = __importDefault(require("../modules/menu/menus/menu.routes.js"));
const office_branch_routes_js_1 = __importDefault(require("../modules/reference/office-branch/office-branch.routes.js"));
const router = (0, express_1.Router)();
router.use('/audit-trail', audit_trail_routes_js_1.default);
router.use('/menus', menu_routes_js_1.default);
router.use('/menu-items', menu_item_routes_js_1.default);
router.use('/menu-accesses', menu_access_routes_js_1.default);
router.use('/office-branches', office_branch_routes_js_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map