Status: ready-for-agent

# 13 — Around tab

## What to build

Implement the Around tab inside `SpotPanel`. It reads the `around` array from the selected spot (already in `spots.json`) and renders a flat list of local restaurants, bars, and activities.

Each listing shows:
- Place name
- Category chip: `restaurant` / `bar` / `activity` (with distinct color per category)
- Star rating
- Short note (the `note` field from `spots.json`)

No filtering, no state, no interactions beyond display. The list is read-only.

## Acceptance criteria

- [ ] Around tab renders all `around` entries for the selected spot
- [ ] Each entry shows name, category chip, rating, and note
- [ ] Category chips use distinct colors (e.g. restaurant = orange, bar = purple, activity = teal)
- [ ] Switching spots updates the Around tab content immediately
- [ ] Empty state shown if a spot has no `around` entries (edge case)

## Blocked by

- [#07 — SpotPanel shell + Guide tab](07-spot-panel-guide-tab.md)
