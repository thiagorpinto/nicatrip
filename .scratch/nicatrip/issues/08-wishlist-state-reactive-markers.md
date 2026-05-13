Status: ready-for-agent

# 08 — Wishlist state + reactive spot marker colors + My Lists wishlist section

## What to build

Implement the `useUserLists` composable (wishlist slice only) and wire it end-to-end from the star button in `SpotPanel` through to the map markers and the My Lists drawer.

**`useUserLists` composable** manages:
```ts
wishlist: Set<spotId>   // persisted to localStorage as JSON
```
Exposes: `toggleWishlist(spotId)`, `isWishlisted(spotId)`.
Serialises to localStorage on every mutation. Deserialises on init (survives page reload).

**SpotPanel** — wire the `☆` button:
- Shows `☆` when not wishlisted, `★` (amber) when wishlisted
- Clicking toggles wishlist state
- Panel header shows a `★ Wishlist` status badge when wishlisted

**MapView** — reactive marker colors:
- Default: blue `#3b82f6`
- Wishlisted: amber `#f59e0b` with a `★` label inside the marker
- (Green `#22c55e` with `✓` for "in plan" comes in issue #10)

**My Lists drawer** — Wishlist section only:
- Opens from the "My Lists" button in the top bar (slide-in from left or overlay)
- Lists all wishlisted spots by name
- Each entry has a "View" button that closes the drawer and opens that spot's panel
- Each entry has a remove button that toggles it off the wishlist
- "My Lists" button shows a badge with the count of wishlisted spots (0 hides the badge)

**Vitest tests for `useUserLists` (wishlist slice):**
- Toggling a spot adds it to the wishlist and persists to localStorage
- Toggling again removes it
- State survives a simulated page reload (deserialise from localStorage)

## Acceptance criteria

- [ ] `☆` / `★` star in SpotPanel toggles wishlist state on click
- [ ] Amber filled star and `★ Wishlist` badge appear in panel header when wishlisted
- [ ] Wishlisted spot markers turn amber with a `★` on the map without page reload
- [ ] My Lists drawer opens/closes from the top bar button
- [ ] Wishlist section lists all wishlisted spots; "View" opens the spot panel; remove button de-lists the spot
- [ ] Top bar "My Lists" button shows a count badge when wishlist is non-empty
- [ ] Wishlist persists across page reloads
- [ ] `useUserLists` wishlist unit tests pass

## Blocked by

- [#07 — SpotPanel shell + Guide tab](07-spot-panel-guide-tab.md)
