/**
 * qibla-compass – Accurate Qibla bearing and compass utilities.
 *
 * All bearings are in degrees 0–360 from **true North**, clockwise.
 * For compass UI: true heading = magnetic heading + magnetic declination
 * (declination East is positive).
 */
export { getQiblaDirection, getBearingToTarget, getCardinalFromBearing, SITES, TARGET_KEYS, DEFAULT_TARGET, } from './direction.js';
export type { QiblaDirectionResult, TargetKey, SiteCoordinates } from './direction.js';
export { getBearing, bearingVincenty, bearingGreatCircle, } from './vincenty.js';
export { getMagneticDeclination, getCachedDeclination, clearDeclinationCache, } from './declination.js';
export type { GetDeclinationOptions } from './declination.js';
export { SITES as HOLY_SITES } from './constants.js';
//# sourceMappingURL=index.d.ts.map