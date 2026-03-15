/**
 * Holy site coordinates (WGS84, decimal degrees).
 * Bearing is from true North (0°), clockwise; all angles in degrees.
 */

export const TARGET_KEYS = ['kaaba', 'madinah', 'karbala', 'najaf'] as const;
export type TargetKey = (typeof TARGET_KEYS)[number];

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
