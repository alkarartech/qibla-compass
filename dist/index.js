/**
 * qibla-compass – Accurate Qibla bearing and compass utilities.
 *
 * All bearings are in degrees 0–360 from **true North**, clockwise.
 * For compass UI: true heading = magnetic heading + magnetic declination
 * (declination East is positive).
 */
// Main API
export { getQiblaDirection, getBearingToTarget, getCardinalFromBearing, SITES, TARGET_KEYS, DEFAULT_TARGET, } from './direction.js';
// Bearing (Vincenty / great-circle)
export { getBearing, bearingVincenty, bearingGreatCircle, } from './vincenty.js';
// Magnetic declination
export { getMagneticDeclination, getCachedDeclination, clearDeclinationCache, } from './declination.js';
// Constants
export { SITES as HOLY_SITES } from './constants.js';
