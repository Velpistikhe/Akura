"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalOrigin = void 0;
const isLocalOrigin = (origin) => {
    try {
        const url = new URL(origin);
        return ['http:', 'https:'].includes(url.protocol)
            && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
            && !url.username && !url.password;
    }
    catch {
        return false;
    }
};
exports.isLocalOrigin = isLocalOrigin;
//# sourceMappingURL=localOrigin.js.map