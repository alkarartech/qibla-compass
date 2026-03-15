import {
  getQiblaDirection,
  getBearingToTarget,
  getCardinalFromBearing,
  SITES,
  TARGET_KEYS,
  DEFAULT_TARGET,
} from './direction.js';

describe('getCardinalFromBearing', () => {
  it('returns N for 0', () => expect(getCardinalFromBearing(0)).toBe('N'));
  it('returns N for 360', () => expect(getCardinalFromBearing(360)).toBe('N'));
  it('returns E for 90', () => expect(getCardinalFromBearing(90)).toBe('E'));
  it('returns S for 180', () => expect(getCardinalFromBearing(180)).toBe('S'));
  it('returns W for 270', () => expect(getCardinalFromBearing(270)).toBe('W'));
  it('returns NE for 45', () => expect(getCardinalFromBearing(45)).toBe('NE'));
  it('returns SW for 225', () => expect(getCardinalFromBearing(225)).toBe('SW'));
});

describe('getBearingToTarget', () => {
  it('returns 0 when at Kaaba', () => {
    expect(
      getBearingToTarget(SITES.kaaba.lat, SITES.kaaba.lon, 'kaaba')
    ).toBe(0);
  });
  it('returns same as getQiblaDirection.bearing for kaaba', () => {
    const lat = 40.7128, lon = -74.006;
    expect(getBearingToTarget(lat, lon, 'kaaba')).toBe(
      getQiblaDirection(lat, lon).bearing
    );
  });
  it('accepts madinah target', () => {
    const b = getBearingToTarget(40.7128, -74.006, 'madinah');
    expect(b).toBeGreaterThanOrEqual(0);
    expect(b).toBeLessThan(360);
  });
});

describe('getQiblaDirection', () => {
  it('returns bearing and cardinal', () => {
    const r = getQiblaDirection(40.7128, -74.006);
    expect(r).toHaveProperty('bearing');
    expect(r).toHaveProperty('cardinal');
    expect(typeof r.bearing).toBe('number');
    expect(typeof r.cardinal).toBe('string');
  });
  it('default target is kaaba', () => {
    const r = getQiblaDirection(0, 0);
    expect(getQiblaDirection(0, 0, DEFAULT_TARGET).bearing).toBe(r.bearing);
  });
  it('bearing in 0–360', () => {
    const r = getQiblaDirection(40.7128, -74.006);
    expect(r.bearing).toBeGreaterThanOrEqual(0);
    expect(r.bearing).toBeLessThan(360);
  });
});

describe('constants', () => {
  it('TARGET_KEYS includes kaaba, madinah, karbala, najaf', () => {
    expect(TARGET_KEYS).toContain('kaaba');
    expect(TARGET_KEYS).toContain('madinah');
    expect(TARGET_KEYS).toContain('karbala');
    expect(TARGET_KEYS).toContain('najaf');
  });
  it('SITES has coordinates for each target', () => {
    for (const key of TARGET_KEYS) {
      const s = SITES[key];
      expect(s.lat).toBeGreaterThanOrEqual(-90);
      expect(s.lat).toBeLessThanOrEqual(90);
      expect(s.lon).toBeGreaterThanOrEqual(-180);
      expect(s.lon).toBeLessThanOrEqual(180);
      expect(s.name).toBeTruthy();
    }
  });
});
