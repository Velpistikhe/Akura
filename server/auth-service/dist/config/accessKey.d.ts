import { KeyObject } from 'node:crypto';
export declare const accessTokenPrivateKey: KeyObject;
export declare const accessTokenPublicKey: KeyObject;
export declare const accessTokenJwks: {
    keys: {
        kid: string;
        use: string;
        alg: string;
        crv?: string;
        d?: string;
        dp?: string;
        dq?: string;
        e?: string;
        k?: string;
        kty?: string;
        n?: string;
        p?: string;
        q?: string;
        qi?: string;
        x?: string;
        y?: string;
    }[];
};
