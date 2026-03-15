# qibla-compass

Accurate **Qibla** (and multi-destination) bearing and compass utilities for JavaScript/TypeScript apps: React Native, Expo, and web.

- **True bearing** from any (lat, lon) to the Kaaba (and optionally Madinah, Karbala, Najaf) using a **geodesically accurate** method (Vincenty on WGS84) with spherical fallback.
- **Magnetic declination** helper (with caching and fallback) so your compass can display **true North** and the Qibla direction correctly.
- **Framework-agnostic** core; optional React hook.

All angles are in **degrees**; bearings are **0–360° from true North, clockwise**.

---

## Install

```bash
npm install qibla-compass
```

---

## Quick usage

```ts
import {
  getQiblaDirection,
  getBearingToTarget,
  getCardinalFromBearing,
  getMagneticDeclination,
  SITES,
  TARGET_KEYS,
} from 'qibla-compass';

// Direction to the Kaaba (default)
const { bearing, cardinal } = getQiblaDirection(40.7128, -74.006);
// e.g. { bearing: 58.4, cardinal: 'ENE' }

// Bearing only (0–360 from true North)
const deg = getBearingToTarget(40.7128, -74.006, 'kaaba');

// Cardinal from any bearing
getCardinalFromBearing(90); // 'E'

// Magnetic declination for compass correction (see below)
const declination = await getMagneticDeclination(40.7128, -74.006);
```

---

## True North vs magnetic North (why declination matters)

A device compass usually reports **magnetic heading** (angle to magnetic North). Qibla bearing from this package is **true bearing** (angle to geographic North).

To show the correct Qibla direction on a compass UI:

- **True heading = magnetic heading + magnetic declination**
- **Declination** is in degrees; **East is positive**, West is negative.

So:

1. Get **true Qibla bearing**: `getQiblaDirection(lat, lon).bearing`.
2. Get **magnetic declination** at the user’s location: `await getMagneticDeclination(lat, lon)`.
3. In your compass view: turn the “Qibla needle” or overlay so that when the device reports **magnetic heading = true Qibla bearing − declination**, the needle points up (or align your compass ring so that **true North** is at angle `-declination` from magnetic North).

Example (conceptual):

```ts
const { bearing: trueQibla } = getQiblaDirection(lat, lon);
const declination = await getMagneticDeclination(lat, lon);
// Magnetic heading that corresponds to “user facing Qibla”:
const magneticQibla = trueQibla - declination;
// Then compare device compass heading to magneticQibla to rotate the needle.
```

---

## API

### Direction (synchronous)

- **`getQiblaDirection(lat, lon, targetKey?)`**  
  Returns `{ bearing, cardinal }`.  
  `bearing`: 0–360 from true North, clockwise.  
  `cardinal`: e.g. `"NE"`, `"SSW"`.  
  `targetKey` defaults to `'kaaba'`.

- **`getBearingToTarget(lat, lon, targetKey?)`**  
  Returns only the true bearing in degrees (0–360).

- **`getCardinalFromBearing(degrees)`**  
  Returns cardinal/intercardinal string for any bearing (0–360).

### Targets

- **`SITES`** – Object of coordinates and names: `kaaba`, `madinah`, `karbala`, `najaf`.
- **`TARGET_KEYS`** – `['kaaba', 'madinah', 'karbala', 'najaf']`.
- **`DEFAULT_TARGET`** – `'kaaba'`.

Kaaba coordinates used: **21.422508°N, 39.826183°E** (WGS84).

### Magnetic declination (async)

- **`getMagneticDeclination(lat, lon, options?)`**  
  Returns declination in degrees (East positive). Uses an optional API (e.g. NOAA) with in-memory cache and fallback (0 or coarse static table) on failure.

  `options`:

  - `apiUrl` – Custom endpoint.
  - `fetch` – Custom `fetch` (e.g. with API key in headers).
  - `useStaticFallback` – If `false`, skip static fallback and use 0 on failure (default: true).

- **`getCachedDeclination(lat, lon, useStaticFallback?)`**  
  Synchronous: returns cached value or static/0 fallback. Use after at least one `getMagneticDeclination` call if you need sync values.

- **`clearDeclinationCache()`**  
  Clears the in-memory declination cache.

**Note:** NOAA’s geomagnetic API may require registration. Use `options.fetch` or `options.apiUrl` with your own key/endpoint if needed.

### Lower-level bearing

- **`getBearing(fromLat, fromLon, toLat, toLon)`**  
  True bearing between two WGS84 points (Vincenty with great-circle fallback).
- **`bearingVincenty(...)`** – Vincenty only; returns `null` if no convergence.
- **`bearingGreatCircle(...)`** – Spherical bearing.

---

## React hook

Optional hook (import from the `react` subpath):

```ts
import { useQiblaDirection } from 'qibla-compass/react';

function Compass({ lat, lon }) {
  const { bearing, cardinal } = useQiblaDirection(lat, lon, { targetKey: 'kaaba' });
  return (
    <div>
      Qibla: {bearing.toFixed(1)}° ({cardinal})
    </div>
  );
}
```

---

## Usage in Node, React, React Native / Expo

- **Node / any JS env:** Use the main entry point; call `getQiblaDirection`, `getMagneticDeclination`, etc. Use a polyfill for `fetch` in Node if needed (e.g. `node-fetch` or Node 18+ built-in).
- **React (web):** Same; use `useQiblaDirection` from `qibla-compass/react` if you want a hook.
- **React Native / Expo:** Use the same API. For declination, ensure `fetch` is available or pass a custom `fetch` in options. No React Native–specific code is required in the core.

---

## Bundle size

Core is plain JS/TS with no heavy geo dependency; Vincenty and great-circle are implemented in-place. Declination uses `fetch` and optional static fallback only.

---

## License

MIT.
