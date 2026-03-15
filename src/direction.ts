/**
 * High-level direction API: Qibla (and other holy sites) bearing and cardinal.
 * All bearings are in degrees 0–360 from true North, clockwise.
 */

import { getBearing } from './vincenty.js';
import { getCardinalFromBearing } from './cardinal.js';
import {
  type TargetKey,
  type SiteCoordinates,
  DEFAULT_TARGET,
  SITES,
  TARGET_KEYS,
  normalizeTargetKey,
} from './constants.js';

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
 * @param targetKey - Optional target; defaults to 'kaaba'. Accepts 'madina' as alias for 'madinah'.
 * @returns { bearing, cardinal }
 */
export function getQiblaDirection(
  lat: number,
  lon: number,
  targetKey: TargetKey | string = DEFAULT_TARGET
): QiblaDirectionResult {
  const key = normalizeTargetKey(String(targetKey));
  const target = SITES[key];
  const bearing = getBearing(lat, lon, target.lat, target.lon);
  const cardinal = getCardinalFromBearing(bearing);
  return { bearing, cardinal };
}

/**
 * Returns only the true bearing (degrees 0–360 from North, clockwise) to the given target.
 * Accepts 'madina' as alias for 'madinah'.
 */
export function getBearingToTarget(
  lat: number,
  lon: number,
  targetKey: TargetKey | string = DEFAULT_TARGET
): number {
  const key = normalizeTargetKey(String(targetKey));
  const target = SITES[key];
  return getBearing(lat, lon, target.lat, target.lon);
}

// Re-export for convenience
export { getCardinalFromBearing } from './cardinal.js';
export { SITES, TARGET_KEYS, DEFAULT_TARGET };
export type { TargetKey };
