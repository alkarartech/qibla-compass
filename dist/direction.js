/**
 * High-level direction API: Qibla (and other holy sites) bearing and cardinal.
 * All bearings are in degrees 0–360 from true North, clockwise.
 */
import { getBearing } from './vincenty.js';
import { getCardinalFromBearing } from './cardinal.js';
import { DEFAULT_TARGET, SITES, TARGET_KEYS, } from './constants.js';
/**
 * Returns the direction to the Qibla (or other target) from the given location.
 * Bearing is true bearing: 0–360° from true North, clockwise.
 *
 * @param lat - Latitude in decimal degrees (WGS84)
 * @param lon - Longitude in decimal degrees (WGS84)
 * @param targetKey - Optional target; defaults to 'kaaba'
 * @returns { bearing, cardinal }
 */
export function getQiblaDirection(lat, lon, targetKey = DEFAULT_TARGET) {
    const target = SITES[targetKey];
    const bearing = getBearing(lat, lon, target.lat, target.lon);
    const cardinal = getCardinalFromBearing(bearing);
    return { bearing, cardinal };
}
/**
 * Returns only the true bearing (degrees 0–360 from North, clockwise) to the given target.
 */
export function getBearingToTarget(lat, lon, targetKey = DEFAULT_TARGET) {
    const target = SITES[targetKey];
    return getBearing(lat, lon, target.lat, target.lon);
}
// Re-export for convenience
export { getCardinalFromBearing } from './cardinal.js';
export { SITES, TARGET_KEYS, DEFAULT_TARGET };
