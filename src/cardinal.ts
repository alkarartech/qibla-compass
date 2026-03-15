/**
 * Cardinal (and intercardinal) direction from bearing in degrees (0–360, true North).
 */

const CARDINALS: { name: string; min: number; max: number }[] = [
  { name: 'N', min: 348.75, max: 360 },
  { name: 'N', min: 0, max: 11.25 },
  { name: 'NNE', min: 11.25, max: 33.75 },
  { name: 'NE', min: 33.75, max: 56.25 },
  { name: 'ENE', min: 56.25, max: 78.75 },
  { name: 'E', min: 78.75, max: 101.25 },
  { name: 'ESE', min: 101.25, max: 123.75 },
  { name: 'SE', min: 123.75, max: 146.25 },
  { name: 'SSE', min: 146.25, max: 168.75 },
  { name: 'S', min: 168.75, max: 191.25 },
  { name: 'SSW', min: 191.25, max: 213.75 },
  { name: 'SW', min: 213.75, max: 236.25 },
  { name: 'WSW', min: 236.25, max: 258.75 },
  { name: 'W', min: 258.75, max: 281.25 },
  { name: 'WNW', min: 281.25, max: 303.75 },
  { name: 'NW', min: 303.75, max: 326.25 },
  { name: 'NNW', min: 326.25, max: 348.75 },
];

/**
 * Returns cardinal or intercardinal direction (e.g. "NE", "SSW") for a bearing in degrees (0–360).
 * Bearing is from true North, clockwise.
 */
export function getCardinalFromBearing(degrees: number): string {
  const n = ((degrees % 360) + 360) % 360;
  for (const c of CARDINALS) {
    if (n >= c.min && n < c.max) return c.name;
  }
  return 'N';
}
