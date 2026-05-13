Status: ready-for-agent

# 10 — Favorite stays + Add to Plan modal + plan state

## What to build

Extend `useUserLists` with the `favoriteStays` and `plan` slices, wire the heart and "Add to Plan" buttons in `StayTab`, and implement the date picker modal.

**`useUserLists` additions:**
```ts
favoriteStays: Record<spotId, Set<accName>>
plan: Array<{
  id: number,           // Date.now()
  spotId: string,
  spotName: string,
  accommodation: string,
  from: string,         // YYYY-MM-DD
  to: string,           // YYYY-MM-DD
}>
```
Both are serialised to localStorage on every mutation.
Exposes: `toggleFavoriteStay(spotId, accName)`, `isFavoriteStay(spotId, accName)`, `addPlanEntry(entry)`, `removePlanEntry(id)`.

**Stay tab — wire heart button:**
- `♡` toggles to `♥` (filled, pink) when favorited
- Favorited card gets a pink border
- Confirmed-plan card gets a `✓ In Plan` badge and green border (read from `plan` state)
- Stay tab header shows a badge with count of favorited accommodations for this spot

**Add to Plan modal:**
- Opens when "Add to Plan" is clicked on an accommodation card
- Shows the accommodation name and spot name as context
- Date range picker bounded to Aug 17–Sep 4, 2025 (user cannot select outside this range)
- "Confirm" saves a plan entry; "Cancel" closes without saving

**Vitest tests for `useUserLists` (new slices):**
- Favoriting an accommodation creates correct nested `Record<spotId, Set<accName>>` structure
- Toggling again removes it; state and localStorage are updated
- Adding a plan entry stores all fields correctly
- Removing a plan entry updates state and localStorage
- Both slices survive a simulated page reload (localStorage round-trip)

## Acceptance criteria

- [ ] Heart button toggles `♡`/`♥`, favorited card gets pink border
- [ ] `✓ In Plan` badge and green border appear on cards with a confirmed plan entry
- [ ] Stay tab header shows favorited-count badge (hidden when 0)
- [ ] "Add to Plan" opens modal with accommodation + spot name shown
- [ ] Date picker is bounded Aug 17–Sep 4 2025; dates outside the range are unselectable
- [ ] Confirming saves the plan entry; modal closes
- [ ] State (favorites + plan) persists across page reloads
- [ ] All `useUserLists` unit tests (including new slices) pass

## Blocked by

- [#08 — Wishlist state + reactive spot marker colors + My Lists wishlist section](08-wishlist-state-reactive-markers.md)
- [#09 — Stay tab: accommodation cards + photo carousel + amenity filter chips](09-stay-tab-cards-carousel-filters.md)
