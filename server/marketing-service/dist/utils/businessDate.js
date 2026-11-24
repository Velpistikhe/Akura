"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentBusinessDate = void 0;
/** Calendar date in the server's timezone, represented as UTC midnight for PostgreSQL DATE comparisons. */
const currentBusinessDate = (now = new Date()) => new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
exports.currentBusinessDate = currentBusinessDate;
//# sourceMappingURL=businessDate.js.map