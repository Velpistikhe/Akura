export declare const formatDateOnly: (value: Date | string | null) => string | null;
export declare const formatContractDates: <T extends {
    contractDate?: Date | string | null;
    effectiveFrom?: Date | string;
    effectiveUntil?: Date | string | null;
}>(contract: T) => T;
