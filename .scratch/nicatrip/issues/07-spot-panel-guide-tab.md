Status: ready-for-agent

# 07 — SpotPanel shell + Guide tab

## What to build

Implement the `SpotPanel` component — a wide slide-in panel from the right that opens when a spot marker is clicked. The panel receives the selected spot as a prop and emits a `close` event.

The panel contains a tab bar with four tabs: **Guide** / **Forecast** / **Stay** / **Around**. Only the Guide tab is implemented in this issue; the other three tabs render an empty placeholder.

Panel header:
- Spot name
- A wishlist star button (☆) — renders but is non-functional in this issue (wired in #08)
- A close (×) button

Guide tab content (all fields from the spot's `guide` object in `spots.json`):
- Description paragraph
- Best season, best tide, crowd level, hazards — displayed as labelled rows or chips

The panel should not overlap the full map; it slides in from the right at ~420px wide and the map reflows or is partially obscured (designer's call — pick what looks clean).

## Acceptance criteria

- [ ] Clicking a spot marker opens `SpotPanel` from the right with a slide-in animation
- [ ] Panel header shows spot name, a `☆` button (non-functional), and a `×` close button
- [ ] `×` closes the panel and deselects the marker
- [ ] Guide tab is active by default and renders description, best season, best tide, crowd level, and hazards
- [ ] Forecast, Stay, and Around tabs are present in the tab bar and render an empty placeholder when selected
- [ ] Only one panel is open at a time (selecting a different marker updates the panel in place)

## Blocked by

- [#06 — MapView: wire real spots.json + spot markers](06-mapview-real-data.md)
