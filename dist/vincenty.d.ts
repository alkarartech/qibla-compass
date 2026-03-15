/**
 * Vincenty inverse formula (WGS84) for geodesic forward azimuth (bearing).
 * Returns bearing in degrees 0–360 from true North, clockwise.
 * Falls back to spherical great-circle bearing when Vincenty does not converge.
 */
/**
 * Spherical great-circle forward azimuth (fallback).
 * Inputs in degrees; output 0–360 from North, clockwise.
 */
export declare function bearingGreatCircle(lat1Deg: number, lon1Deg: number, lat2Deg: number, lon2Deg: number): number;
/**
 * Vincenty inverse: forward azimuth α1 from point 1 to point 2 (degrees 0–360).
 * Returns null if the iteration does not converge (e.g. antipodal).
 */
export declare function bearingVincenty(lat1Deg: number, lon1Deg: number, lat2Deg: number, lon2Deg: number): number | null;
/**
 * Geodesic forward bearing (degrees 0–360 from true North, clockwise).
 * Uses Vincenty on WGS84; falls back to great-circle if Vincenty does not converge.
 */
export declare function getBearing(fromLat: number, fromLon: number, toLat: number, toLon: number): number;
//# sourceMappingURL=vincenty.d.ts.map