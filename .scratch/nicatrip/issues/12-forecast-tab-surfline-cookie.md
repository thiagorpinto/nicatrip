Status: ready-for-agent

# 12 — Forecast tab + Surfline cookie settings

## What to build

Implement the `ForecastWidget` component (rendered inside the Forecast tab) and the `CookieSettings` popover.

**`ForecastWidget`:**
- On mount (when the Forecast tab is opened), reads the Surfline session cookie from `localStorage` under the key `nicatrip_surfline_cookie`
- Fetches live forecast data from `services.surfline.com` for the spot's `surflineId` (baked into `spots.json` at build time), passing the cookie as a request header
- Renders current conditions: wave height, swell period, wind speed + direction, star rating (1–5 derived from Surfline's condition rating)
- Renders a 5-day forecast bar chart: one bar per day, bar height proportional to wave height, color-coded quality (green ≥ 4★ / amber 2–3★ / red ≤ 1★)
- If the fetch fails for any reason (expired cookie, CORS block, network error), renders a silent empty state — no error message, no retry. The user falls back to the Surfline app directly.

**`CookieSettings` popover:**
- Accessible from a small gear/settings icon in the top bar (or inside the Forecast tab — pick one consistent location)
- Contains a labelled text area ("Paste your Surfline session cookie")
- On save, writes the value to `localStorage` under `nicatrip_surfline_cookie`
- On next Forecast tab open, `ForecastWidget` picks up the new cookie automatically

**Vitest tests for `ForecastWidget`:**
- Renders current conditions from a mocked Surfline response
- Renders silent empty state when fetch rejects
- Reads cookie from localStorage before fetching

## Acceptance criteria

- [ ] Opening the Forecast tab triggers a Surfline API fetch using the spot's `surflineId`
- [ ] Current wave height, swell period, wind conditions, and star rating (1–5) are displayed
- [ ] 5-day bar chart renders with color-coded quality per day
- [ ] Forecast tab renders a silent empty state (no crash, no error banner) when fetch fails
- [ ] Cookie settings popover saves the pasted string to `localStorage` on submit
- [ ] A newly saved cookie is used on the next Forecast tab open without page reload
- [ ] `ForecastWidget` Vitest tests pass

## Blocked by

- [#07 — SpotPanel shell + Guide tab](07-spot-panel-guide-tab.md)
