"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshTokenExpiry = void 0;
const env_js_1 = require("../config/env.js");
const duration_js_1 = require("./duration.js");
const createRefreshTokenExpiry = () => {
    return new Date(Date.now() + (0, duration_js_1.durationToMilliseconds)(env_js_1.env.JWT_REFRESH_EXPIRES_IN));
};
exports.createRefreshTokenExpiry = createRefreshTokenExpiry;
//# sourceMappingURL=tokenExpiry.js.map