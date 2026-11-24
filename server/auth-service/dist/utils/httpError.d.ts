export declare class HttpError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class RefreshTokenRejectedError extends HttpError {
    constructor(message: string, statusCode: number);
}
