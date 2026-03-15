/**
 * Optional React hook for Qibla direction.
 * Import from "qibla-compass/react" – requires React in your app.
 */

import { useMemo } from 'react';
import type { TargetKey } from './constants.js';
import { getQiblaDirection } from './direction.js';
import type { QiblaDirectionResult } from './direction.js';

export interface UseQiblaDirectionOptions {
  targetKey?: TargetKey;
}

/**
 * React hook that returns { bearing, cardinal } for the given (lat, lon) and optional target.
 * Values are memoized when lat, lon, and targetKey are unchanged.
 */
export function useQiblaDirection(
  lat: number,
  lon: number,
  options: UseQiblaDirectionOptions = {}
): QiblaDirectionResult {
  const { targetKey = 'kaaba' } = options;
  return useMemo(
    () => getQiblaDirection(lat, lon, targetKey),
    [lat, lon, targetKey]
  );
}
