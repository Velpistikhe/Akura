export declare const globalRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * A tighter limit for credential submission endpoints. The global limiter is
 * per IP over a long window, which is too permissive for brute-force attempts
 * against a single account. This one caps attempts per IP on a short window.
 */
export declare const authRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
