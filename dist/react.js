/**
 * Optional React hook for Qibla direction.
 * Import from "qibla-compass/react" – requires React in your app.
 */
import { useMemo } from 'react';
import { getQiblaDirection } from './direction.js';
/**
 * React hook that returns { bearing, cardinal } for the given (lat, lon) and optional target.
 * Values are memoized when lat, lon, and targetKey are unchanged.
 */
export function useQiblaDirection(lat, lon, options = {}) {
    const { targetKey = 'kaaba' } = options;
    return useMemo(() => getQiblaDirection(lat, lon, targetKey), [lat, lon, targetKey]);
}
