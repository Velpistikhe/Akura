"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationStorage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const env_js_1 = require("../../config/env.js");
const httpError_js_1 = require("../../utils/httpError.js");
let client;
function storageClient() {
    if (!env_js_1.env.AWS_ENDPOINT_URL_S3 || !env_js_1.env.AWS_ACCESS_KEY_ID || !env_js_1.env.AWS_SECRET_ACCESS_KEY) {
        throw new httpError_js_1.HttpError('Quotation storage is not configured', 503);
    }
    return client ??= new client_s3_1.S3Client({
        endpoint: env_js_1.env.AWS_ENDPOINT_URL_S3, region: env_js_1.env.AWS_REGION, forcePathStyle: true,
        credentials: { accessKeyId: env_js_1.env.AWS_ACCESS_KEY_ID, secretAccessKey: env_js_1.env.AWS_SECRET_ACCESS_KEY },
        requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', maxAttempts: 2,
    });
}
exports.quotationStorage = {
    bucket: () => env_js_1.env.AWS_S3_BUCKET,
    async upload(bucket, key, body, fileName) {
        await storageClient().send(new client_s3_1.PutObjectCommand({ Bucket: bucket, Key: key, Body: body,
            ContentType: 'application/pdf', ContentDisposition: `attachment; filename="${fileName}"`,
        }), { abortSignal: AbortSignal.timeout(30000) });
    },
    async remove(bucket, key) {
        await storageClient().send(new client_s3_1.DeleteObjectCommand({ Bucket: bucket, Key: key }), { abortSignal: AbortSignal.timeout(10000) });
    },
    async downloadUrl(bucket, key) {
        const expiresIn = 900;
        const url = await (0, s3_request_presigner_1.getSignedUrl)(storageClient(), new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn });
        return { url, expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString() };
    },
};
//# sourceMappingURL=quotation-storage.js.map