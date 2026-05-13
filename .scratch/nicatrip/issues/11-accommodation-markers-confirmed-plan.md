Status: ready-for-agent

# 11 — Accommodation markers on map + My Lists confirmed plan section

## What to build

Two related pieces that both depend on the full `useUserLists` state being available.

**Accommodation markers on `MapView`:**
- Accommodation markers are hidden by default (not rendered on the map)
- When an accommodation is **favorited**, add a rounded-square pink `#ec4899` `L.divIcon` marker at its coordinates
- When an accommodation is **in plan**, change its marker to green `#22c55e`
- Markers are added/removed reactively as `favoriteStays` and `plan` state changes (no page reload needed)
- Clicking an accommodation marker opens `SpotPanel` with the Stay tab active and scrolls to that accommodation card

**Spot marker green state:**
- A spot marker turns green `#22c55e` with a `✓` label when at least one plan entry exists for that spot
- This completes the three-color reactive marker system for spots (blue → amber → green)

**`SpotPanel` status badge:**
- Panel header shows `✓ In Plan` badge (green) when the spot has at least one confirmed plan entry

**My Lists drawer — Confirmed Plan section:**
- Lists all plan entries in chronological order (sorted by `from` date)
- Each entry shows: spot name, accommodation name, date range
- Each entry has a remove button that calls `removePlanEntry(id)`
- My Lists top-bar badge count includes both wishlisted spots and confirmed plan entries

## Acceptance criteria

- [ ] Favorited accommodation markers appear on the map (pink rounded-square); removing favorite removes marker
- [ ] Confirmed accommodation markers turn green; clicking opens Stay tab for that spot
- [ ] Spot markers turn green with `✓` when the spot has at least one plan entry
- [ ] `SpotPanel` header shows `✓ In Plan` badge for planned spots
- [ ] My Lists drawer Confirmed Plan section lists all plan entries in date order
- [ ] Remove button on a plan entry removes it from state, localStorage, map, and the drawer in real time
- [ ] Top-bar badge count reflects wishlisted spots + confirmed plan entries combined

## Blocked by

- [#10 — Favorite stays + Add to Plan modal + plan state](10-favorite-stays-plan-state.md)
