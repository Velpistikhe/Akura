"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenJwks = exports.accessTokenPublicKey = exports.accessTokenPrivateKey = void 0;
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const env_js_1 = require("./env.js");
const loadPrivateKey = () => {
    const source = env_js_1.env.JWT_ACCESS_PRIVATE_KEY_BASE64
        ? Buffer.from(env_js_1.env.JWT_ACCESS_PRIVATE_KEY_BASE64, 'base64').toString('utf8')
        : (0, node_fs_1.readFileSync)((0, node_path_1.resolve)(env_js_1.env.JWT_ACCESS_PRIVATE_KEY_PATH), 'utf8');
    const key = (0, node_crypto_1.createPrivateKey)(source);
    if (key.asymmetricKeyType !== 'rsa') {
        throw new Error('JWT access private key must be an RSA key');
    }
    const modulusLength = key.asymmetricKeyDetails?.modulusLength ?? 0;
    if (modulusLength < 2048) {
        throw new Error('JWT access private key must use at least 2048 bits');
    }
    return key;
};
exports.accessTokenPrivateKey = loadPrivateKey();
exports.accessTokenPublicKey = (0, node_crypto_1.createPublicKey)(exports.accessTokenPrivateKey);
const publicJwk = exports.accessTokenPublicKey.export({ format: 'jwk' });
exports.accessTokenJwks = {
    keys: [{
            ...publicJwk,
            kid: env_js_1.env.JWT_ACCESS_KEY_ID,
            use: 'sig',
            alg: 'RS256',
        }],
};
//# sourceMappingURL=accessKey.js.map