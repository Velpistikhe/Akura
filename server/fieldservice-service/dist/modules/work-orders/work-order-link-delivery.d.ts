export declare const retryDelay: (attempt: number) => number;
export declare function deliverWorkOrderLink(id: string): Promise<void>;
export declare function processDueWorkOrderLinkDeliveries(officeBranchId: string, eventId?: string): Promise<void>;
/**
 * Delivers one link event and waits until Marketing has acknowledged it.
 *
 * The write path uses this instead of the plain batch so the caller is not told
 * "done" while Marketing still holds the previous link. A delivery that failed
 * is retried once after the backoff window, because the common cause is a
 * receiver that was briefly unavailable.
 */
export declare function deliverWorkOrderLinkAndWait(eventId: string, officeBranchId: string): Promise<boolean>;
export declare function wakeWorkOrderLinkDelivery(): void;
export declare function startWorkOrderLinkDelivery(): () => void;
