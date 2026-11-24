"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuWrite = void 0;
const db_js_1 = require("../../config/db.js");
// All menu hierarchy writes share this lock. Parent deletion and child
// creation/moves must serialize to avoid attaching data to a deleted parent.
const menuWrite = (action) => db_js_1.prisma.$transaction(async (tx) => {
    await tx.$executeRaw `SELECT pg_advisory_xact_lock(hashtext('app-manager:menu-write'))`;
    return action(tx);
}, { maxWait: 10000, timeout: 20000 });
exports.menuWrite = menuWrite;
//# sourceMappingURL=menu-write.js.map