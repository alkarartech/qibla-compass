import {
  getBearing,
  bearingVincenty,
  bearingGreatCircle,
} from './vincenty.js';
import { SITES } from './constants.js';

describe('bearingGreatCircle', () => {
  it('returns 0 for same point', () => {
    expect(bearingGreatCircle(0, 0, 0, 0)).toBe(0);
  });
  it('returns ~90 for due East', () => {
    const b = bearingGreatCircle(0, 0, 0, 1);
    expect(b).toBeGreaterThan(89);
    expect(b).toBeLessThan(91);
  });
  it('returns ~180 for due South from equator', () => {
    const b = bearingGreatCircle(0, 0, -1, 0);
    expect(b).toBeGreaterThan(179);
    expect(b).toBeLessThan(181);
  });
});

describe('bearingVincenty', () => {
  it('returns 0 for same point', () => {
    const b = bearingVincenty(21.422508, 39.826183, 21.422508, 39.826183);
    expect(b).toBe(0);
  });
  it('returns null or value for antipodal (may not converge)', () => {
    const b = bearingVincenty(0, 0, 0, 180);
    expect(b === null || (b >= 0 && b <= 360)).toBe(true);
  });
});

describe('getBearing', () => {
  it('returns 0 when from and to are the same', () => {
    const [lat, lon] = [21.422508, 39.826183];
    expect(getBearing(lat, lon, lat, lon)).toBe(0);
  });
  it('returns bearing to Kaaba from New York (~58–60° NE)', () => {
    const bearing = getBearing(40.7128, -74.006, SITES.kaaba.lat, SITES.kaaba.lon);
    expect(bearing).toBeGreaterThan(56);
    expect(bearing).toBeLessThan(62);
  });
  it('returns bearing to Kaaba from London (~118–122° SE)', () => {
    const bearing = getBearing(51.5074, -0.1278, SITES.kaaba.lat, SITES.kaaba.lon);
    expect(bearing).toBeGreaterThan(116);
    expect(bearing).toBeLessThan(124);
  });
  it('returns bearing to Kaaba from Jakarta (~295–300° NW)', () => {
    const bearing = getBearing(-6.2088, 106.8456, SITES.kaaba.lat, SITES.kaaba.lon);
    expect(bearing).toBeGreaterThan(292);
    expect(bearing).toBeLessThan(302);
  });
  it('falls back to great-circle for antipodal', () => {
    const b = getBearing(0, 0, 0, 180);
    expect(b).toBeGreaterThanOrEqual(0);
    expect(b).toBeLessThan(360);
  });
});
