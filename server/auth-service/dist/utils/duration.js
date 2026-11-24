"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.durationToMilliseconds = void 0;
const units = {
    ms: 1,
    s: 1_000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
};
const durationToMilliseconds = (duration) => {
    const match = /^(\d+)(ms|s|m|h|d)$/.exec(duration);
    if (!match) {
        throw new Error(`Unsupported duration: ${duration}`);
    }
    return Number(match[1]) * units[match[2]];
};
exports.durationToMilliseconds = durationToMilliseconds;
//# sourceMappingURL=duration.js.map