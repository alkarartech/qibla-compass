/**
 * Holy site coordinates (WGS84, decimal degrees).
 * Bearing is from true North (0°), clockwise; all angles in degrees.
 */

export const TARGET_KEYS = ['kaaba', 'madinah', 'karbala', 'najaf'] as const;
export type TargetKey = (typeof TARGET_KEYS)[number];

/** App-friendly alias: e.g. 'madina' → 'madinah'. Use normalizeTargetKey() when looking up SITES. */
export const TARGET_KEY_ALIASES: Record<string, TargetKey> = {
  madina: 'madinah',
};

export interface SiteCoordinates {
  lat: number;
  lon: number;
  name: string;
}

/** High-precision WGS84 coordinates for supported targets */
export const SITES: Record<TargetKey, SiteCoordinates> = {
  kaaba: {
    lat: 21.422508,
    lon: 39.826183,
    name: 'Kaaba, Mecca',
  },
  madinah: {
    lat: 24.4672,
    lon: 39.6111,
    name: 'Al-Masjid an-Nabawi, Madinah',
  },
  karbala: {
    lat: 32.6167,
    lon: 44.0331,
    name: 'Imam Hussain Shrine, Karbala',
  },
  najaf: {
    lat: 31.9961,
    lon: 44.3148,
    name: 'Imam Ali Shrine, Najaf',
  },
};

export const DEFAULT_TARGET: TargetKey = 'kaaba';

/** Normalize app target keys to package keys (e.g. 'madina' → 'madinah'). Unknown keys fall back to DEFAULT_TARGET. */
export function normalizeTargetKey(key: string): TargetKey {
  const alias = TARGET_KEY_ALIASES[key];
  if (alias) return alias;
  if (TARGET_KEYS.includes(key as TargetKey)) return key as TargetKey;
  return DEFAULT_TARGET;
}
