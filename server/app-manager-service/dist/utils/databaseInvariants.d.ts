/**
 * Creates the partial unique index that enforces the single head office branch
 * invariant: at most one office branch may have `is_head = true`.
 *
 * Fails loudly when the table is missing, because that means the schema was
 * never pushed and the service cannot work anyway.
 */
export declare const ensureDatabaseInvariants: () => Promise<void>;
