/**
 * qibla-compass – Accurate Qibla bearing and compass utilities.
 *
 * All bearings are in degrees 0–360 from **true North**, clockwise.
 * For compass UI: true heading = magnetic heading + magnetic declination
 * (declination East is positive).
 */

// Main API
export {
  getQiblaDirection,
  getBearingToTarget,
  getCardinalFromBearing,
  SITES,
  TARGET_KEYS,
  DEFAULT_TARGET,
} from './direction.js';
export type { QiblaDirectionResult, TargetKey, SiteCoordinates } from './direction.js';

// Bearing (Vincenty / great-circle)
export {
  getBearing,
  bearingVincenty,
  bearingGreatCircle,
} from './vincenty.js';

// Magnetic declination
export {
  getMagneticDeclination,
  getCachedDeclination,
  clearDeclinationCache,
} from './declination.js';
export type { GetDeclinationOptions } from './declination.js';

// Constants and target key normalization
export { SITES as HOLY_SITES, TARGET_KEY_ALIASES, normalizeTargetKey } from './constants.js';
