/**
 * High-level direction API: Qibla (and other holy sites) bearing and cardinal.
 * All bearings are in degrees 0–360 from true North, clockwise.
 */
import { type TargetKey, type SiteCoordinates, DEFAULT_TARGET, SITES, TARGET_KEYS } from './constants.js';
export type { SiteCoordinates };
export interface QiblaDirectionResult {
    /** Bearing in degrees 0–360 from true North, clockwise. */
    bearing: number;
    /** Cardinal or intercardinal, e.g. "NE", "SSW". */
    cardinal: string;
}
/**
 * Returns the direction to the Qibla (or other target) from the given location.
 * Bearing is true bearing: 0–360° from true North, clockwise.
 *
 * @param lat - Latitude in decimal degrees (WGS84)
 * @param lon - Longitude in decimal degrees (WGS84)
 * @param targetKey - Optional target; defaults to 'kaaba'
 * @returns { bearing, cardinal }
 */
export declare function getQiblaDirection(lat: number, lon: number, targetKey?: TargetKey): QiblaDirectionResult;
/**
 * Returns only the true bearing (degrees 0–360 from North, clockwise) to the given target.
 */
export declare function getBearingToTarget(lat: number, lon: number, targetKey?: TargetKey): number;
export { getCardinalFromBearing } from './cardinal.js';
export { SITES, TARGET_KEYS, DEFAULT_TARGET };
export type { TargetKey };
//# sourceMappingURL=direction.d.ts.map