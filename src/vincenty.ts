/**
 * Vincenty inverse formula (WGS84) for geodesic forward azimuth (bearing).
 * Returns bearing in degrees 0–360 from true North, clockwise.
 * Falls back to spherical great-circle bearing when Vincenty does not converge.
 */

const WGS84_A = 6378137; // metres
const WGS84_F = 1 / 298.257223563;
const WGS84_B = WGS84_A * (1 - WGS84_F);
const MAX_ITERATIONS = 100;
const CONVERGENCE_TOLERANCE = 1e-12;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function normalizeBearingDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/**
 * Spherical great-circle forward azimuth (fallback).
 * Inputs in degrees; output 0–360 from North, clockwise.
 */
export function bearingGreatCircle(
  lat1Deg: number,
  lon1Deg: number,
  lat2Deg: number,
  lon2Deg: number
): number {
  const φ1 = toRad(lat1Deg);
  const φ2 = toRad(lat2Deg);
  const Δλ = toRad(lon2Deg - lon1Deg);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return normalizeBearingDeg(toDeg(θ));
}

/**
 * Vincenty inverse: forward azimuth α1 from point 1 to point 2 (degrees 0–360).
 * Returns null if the iteration does not converge (e.g. antipodal).
 */
export function bearingVincenty(
  lat1Deg: number,
  lon1Deg: number,
  lat2Deg: number,
  lon2Deg: number
): number | null {
  const φ1 = toRad(lat1Deg);
  const φ2 = toRad(lat2Deg);
  const L = toRad(lon2Deg - lon1Deg);

  const U1 = Math.atan((1 - WGS84_F) * Math.tan(φ1));
  const U2 = Math.atan((1 - WGS84_F) * Math.tan(φ2));
  const sinU1 = Math.sin(U1);
  const cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2);
  const cosU2 = Math.cos(U2);

  let λ = L;
  let λPrev: number;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const sinλ = Math.sin(λ);
    const cosλ = Math.cos(λ);
    const sinσ =
      Math.sqrt(
        (cosU2 * sinλ) ** 2 +
          (cosU1 * sinU2 - sinU1 * cosU2 * cosλ) ** 2
      ) || 0;
    const cosσ = sinU1 * sinU2 + cosU1 * cosU2 * cosλ;
    const σ = Math.atan2(sinσ, cosσ);
    const sinα = sinσ === 0 ? 0 : (cosU1 * cosU2 * sinλ) / sinσ;
    const cos2α = 1 - sinα * sinα;
    const cos2σm =
      cos2α === 0
        ? 0
        : cosσ - (2 * sinU1 * sinU2) / cos2α;
    const C = (WGS84_F / 16) * cos2α * (4 + WGS84_F * (4 - 3 * cos2α));
    λPrev = λ;
    λ =
      L +
      (1 - C) *
        WGS84_F *
        sinα *
        (σ +
          C *
            sinσ *
            (cos2σm + C * cosσ * (-1 + 2 * cos2σm * cos2σm)));
    if (Math.abs(λ - λPrev) < CONVERGENCE_TOLERANCE) {
      const α1 = Math.atan2(
        cosU2 * Math.sin(λ),
        cosU1 * sinU2 - sinU1 * cosU2 * Math.cos(λ)
      );
      return normalizeBearingDeg(toDeg(α1));
    }
  }
  return null;
}

/**
 * Geodesic forward bearing (degrees 0–360 from true North, clockwise).
 * Uses Vincenty on WGS84; falls back to great-circle if Vincenty does not converge.
 */
export function getBearing(
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): number {
  const v = bearingVincenty(fromLat, fromLon, toLat, toLon);
  if (v !== null) return v;
  return bearingGreatCircle(fromLat, fromLon, toLat, toLon);
}
