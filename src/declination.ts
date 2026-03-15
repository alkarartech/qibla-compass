/**
 * Magnetic declination (degrees, East positive) for a given (lat, lon).
 * Uses optional fetch (e.g. NOAA WMM); in-memory cache; fallback 0 or static table.
 */

const CACHE_ROUND = 2; // round lat/lon to 2 decimals for cache key
const cache = new Map<string, number>();

/** Default NOAA geomag-web URL; requires registration for API key. Set DECLINATION_API_URL env or pass options. */
const DEFAULT_DECLINATION_URL =
  'https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination';

export interface GetDeclinationOptions {
  /** Custom API URL. If not set, uses DEFAULT_DECLINATION_URL (NOAA may require key). */
  apiUrl?: string;
  /** Custom fetch (e.g. with API key in headers). */
  fetch?: typeof globalThis.fetch;
  /** Use coarse static table when API fails (approximate by latitude band). */
  useStaticFallback?: boolean;
}

/** Coarse approximate declination by latitude (degrees E). Only for fallback when API unavailable. */
function staticDeclinationByLat(lat: number, lon: number): number {
  // Very rough: positive declination in Americas, negative in Asia for recent epoch.
  const absLon = Math.abs(lon);
  if (lat >= 50) return lon > 0 ? -3 : 10;
  if (lat >= 25) return lon > 0 ? -2 : 8;
  if (lat >= -25) return lon > 0 ? 0 : 2;
  if (lat >= -50) return lon > 0 ? 5 : 15;
  return 0;
}

function cacheKey(lat: number, lon: number): string {
  const r = 10 ** CACHE_ROUND;
  return `${Math.round(lat * r) / r},${Math.round(lon * r) / r}`;
}

/**
 * Fetches magnetic declination (degrees, East positive) for (lat, lon).
 * Caches by rounded coordinates. On failure returns 0 or static fallback if useStaticFallback.
 *
 * Compass apps should use: true heading = magnetic heading + declination
 * so that the compass displays true North and the Qibla bearing (true) is correct.
 */
export async function getMagneticDeclination(
  lat: number,
  lon: number,
  options: GetDeclinationOptions = {}
): Promise<number> {
  const key = cacheKey(lat, lon);
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const fetcher = options.fetch ?? globalThis.fetch;
  const url =
    options.apiUrl ??
    `${DEFAULT_DECLINATION_URL}?lat1=${lat}&lon1=${lon}&resultFormat=json`;
  const useStatic = options.useStaticFallback !== false;

  try {
    const res = await fetcher(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { declination?: number; declination_angle?: number };
    const deg =
      typeof data.declination === 'number'
        ? data.declination
        : typeof (data as { declination_angle?: number }).declination_angle === 'number'
          ? (data as { declination_angle: number }).declination_angle
          : NaN;
    if (!Number.isFinite(deg)) throw new Error('Invalid declination in response');
    cache.set(key, deg);
    return deg;
  } catch {
    const fallback = useStatic ? staticDeclinationByLat(lat, lon) : 0;
    cache.set(key, fallback);
    return fallback;
  }
}

/**
 * Synchronous declination: returns cached value if available, otherwise returns
 * static fallback (or 0). Use after having called getMagneticDeclination at least once.
 */
export function getCachedDeclination(
  lat: number,
  lon: number,
  useStaticFallback = true
): number {
  const key = cacheKey(lat, lon);
  const c = cache.get(key);
  if (c !== undefined) return c;
  return useStaticFallback ? staticDeclinationByLat(lat, lon) : 0;
}

/** Clear in-memory declination cache (e.g. for testing). */
export function clearDeclinationCache(): void {
  cache.clear();
}
