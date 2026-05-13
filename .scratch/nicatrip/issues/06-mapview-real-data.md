Status: ready-for-agent

# 06 — MapView: wire real spots.json + spot markers

## What to build

Replace the hardcoded stub markers from issue #01 with real data. On app load, fetch `public/data/spots.json` and render one custom `L.divIcon` circular marker per surf spot at its coordinates. Markers are blue (`#3b82f6`) by default. Clicking a marker must emit a `select-spot` event (or equivalent) that parent components will handle in later issues. No panel opens yet — a click can log to console or do nothing beyond the event.

The marker icon spec (from PRD):
- Surf Spot: filled circle, 24px diameter
- Color: blue `#3b82f6` (default — amber and green states come in issue #08)

## Acceptance criteria

- [ ] App loads `public/data/spots.json` at startup (fetch or static import)
- [ ] All Nicaragua spots from the JSON are rendered as blue circular markers on the map
- [ ] Map auto-fits bounds to contain all markers on first load
- [ ] Clicking a marker logs the spot's `id` and `name` to the console (placeholder for issue #07)
- [ ] No stub / hardcoded markers remain

## Blocked by

- [#01 — Project scaffold + deployable static map](01-project-scaffold-static-map.md)
- [#04 — Build pipeline: data-builder + spots.json output](04-build-pipeline-data-builder.md)
