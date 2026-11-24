export declare const retryDelay: (attempt: number) => number;
export declare function deliverTax(id: string): Promise<void>;
export declare function processDueTaxDeliveries(officeBranchId: string, eventId?: string): Promise<void>;
export declare function wakeTaxDelivery(): void;
export declare function startTaxDelivery(): () => void;
