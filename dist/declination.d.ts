/**
 * Magnetic declination (degrees, East positive) for a given (lat, lon).
 * Uses optional fetch (e.g. NOAA WMM); in-memory cache; fallback 0 or static table.
 */
export interface GetDeclinationOptions {
    /** Custom API URL. If not set, uses DEFAULT_DECLINATION_URL (NOAA may require key). */
    apiUrl?: string;
    /** Custom fetch (e.g. with API key in headers). */
    fetch?: typeof globalThis.fetch;
    /** Use coarse static table when API fails (approximate by latitude band). */
    useStaticFallback?: boolean;
}
/**
 * Fetches magnetic declination (degrees, East positive) for (lat, lon).
 * Caches by rounded coordinates. On failure returns 0 or static fallback if useStaticFallback.
 *
 * Compass apps should use: true heading = magnetic heading + declination
 * so that the compass displays true North and the Qibla bearing (true) is correct.
 */
export declare function getMagneticDeclination(lat: number, lon: number, options?: GetDeclinationOptions): Promise<number>;
/**
 * Synchronous declination: returns cached value if available, otherwise returns
 * static fallback (or 0). Use after having called getMagneticDeclination at least once.
 */
export declare function getCachedDeclination(lat: number, lon: number, useStaticFallback?: boolean): number;
/** Clear in-memory declination cache (e.g. for testing). */
export declare function clearDeclinationCache(): void;
//# sourceMappingURL=declination.d.ts.map