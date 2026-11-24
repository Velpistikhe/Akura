export declare const quotationStorage: {
    bucket: () => string;
    upload(bucket: string, key: string, body: Buffer, fileName: string): Promise<void>;
    remove(bucket: string, key: string): Promise<void>;
    downloadUrl(bucket: string, key: string): Promise<{
        url: string;
        expiresAt: string;
    }>;
};
