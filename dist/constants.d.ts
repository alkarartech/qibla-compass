/**
 * Holy site coordinates (WGS84, decimal degrees).
 * Bearing is from true North (0°), clockwise; all angles in degrees.
 */
export declare const TARGET_KEYS: readonly ["kaaba", "madinah", "karbala", "najaf"];
export type TargetKey = (typeof TARGET_KEYS)[number];
export interface SiteCoordinates {
    lat: number;
    lon: number;
    name: string;
}
/** High-precision WGS84 coordinates for supported targets */
export declare const SITES: Record<TargetKey, SiteCoordinates>;
export declare const DEFAULT_TARGET: TargetKey;
//# sourceMappingURL=constants.d.ts.map