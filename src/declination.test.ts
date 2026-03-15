import {
  getMagneticDeclination,
  getCachedDeclination,
  clearDeclinationCache,
} from './declination.js';

describe('getMagneticDeclination', () => {
  beforeEach(() => clearDeclinationCache());

  it('returns a number in reasonable range when API fails (fallback)', async () => {
    const fetchMock = () => Promise.reject(new Error('network'));
    const decl = await getMagneticDeclination(40, -74, { fetch: fetchMock });
    expect(typeof decl).toBe('number');
    expect(decl).toBeGreaterThanOrEqual(-90);
    expect(decl).toBeLessThanOrEqual(90);
  });

  it('uses cached value on second call', async () => {
    let calls = 0;
    const fetchMock = async () => {
      calls++;
      return new Response(JSON.stringify({ declination: 12.5 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };
    const d1 = await getMagneticDeclination(40, -74, { fetch: fetchMock });
    const d2 = await getMagneticDeclination(40, -74, { fetch: fetchMock });
    expect(d1).toBe(12.5);
    expect(d2).toBe(12.5);
    expect(calls).toBe(1);
  });

  it('parses declination_angle when declination not present', async () => {
    const fetchMock = async () =>
      new Response(
        JSON.stringify({ declination_angle: -3.2 }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    const d = await getMagneticDeclination(51, 0, { fetch: fetchMock });
    expect(d).toBe(-3.2);
  });
});

describe('getCachedDeclination', () => {
  beforeEach(() => clearDeclinationCache());

  it('returns fallback when cache empty and useStaticFallback true', () => {
    const d = getCachedDeclination(40, -74, true);
    expect(typeof d).toBe('number');
  });
  it('returns 0 when cache empty and useStaticFallback false', () => {
    expect(getCachedDeclination(40, -74, false)).toBe(0);
  });
});

describe('declination cache by location', () => {
  beforeEach(() => clearDeclinationCache());

  it('returns different values for different (lat, lon) when fetched', async () => {
    const fetchMock = async (url: string) => {
      const east = url.includes('lon1=10') ? 5 : -3;
      return new Response(JSON.stringify({ declination: east }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };
    const d1 = await getMagneticDeclination(40, 10, { fetch: fetchMock });
    const d2 = await getMagneticDeclination(40, -74, { fetch: fetchMock });
    expect(d1).toBe(5);
    expect(d2).toBe(-3);
  });
});

describe('clearDeclinationCache', () => {
  beforeEach(() => clearDeclinationCache());

  it('clears cache', async () => {
    const fetchMock = async () =>
      new Response(JSON.stringify({ declination: 5 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    await getMagneticDeclination(40, -74, { fetch: fetchMock });
    expect(getCachedDeclination(40, -74, false)).toBe(5);
    clearDeclinationCache();
    expect(getCachedDeclination(40, -74, false)).toBe(0);
  });
});
