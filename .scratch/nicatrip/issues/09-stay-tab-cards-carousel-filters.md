Status: ready-for-agent

# 09 — Stay tab: accommodation cards + photo carousel + amenity filter chips

## What to build

Implement the `StayTab` component and its children. This issue covers display and filtering only — favorite/plan interactions come in issue #10.

**`StayTab`** receives the current spot's `accommodations` array as a prop.

**Accommodation cards** — each card shows:
- Photo carousel (`ImageCarousel` component): previous/next arrows, dot indicators, active image tracking
- Name, type (hotel / surf camp), nightly price for 2 people, star rating
- Amenity chips (read-only display, using canonical labels + emoji from `CONTEXT.md`)
- Instagram handle as a clickable link opening in a new tab (omit if null)
- Traveler review snippets (up to 3)
- A `♡` heart button — renders but is non-functional in this issue (wired in #10)
- An "Add to Plan" button — renders but is non-functional in this issue (wired in #10)

**Amenity filter chips** — above the card list:
- Only chips for amenities present on at least one accommodation at this spot are shown
- Selecting multiple chips applies AND logic (card must have all selected amenities)
- Active filter state shows "X of Y stays match" summary and a "Clear" button
- Filter state is local to `StayTab` and resets automatically when the spot prop changes

**`ImageCarousel`** component:
- Receives array of photo URLs
- Tracks active index locally
- Prev/next buttons cycle through images (wraps around)
- Dot indicators overlay on the image; clicking a dot sets that index

**Vitest tests:**
- `StayTab`: renders all cards when no filters active; chip selection hides non-matching cards; two chips apply AND logic; "X of Y" summary is correct; "Clear" resets filters; filters reset on spot prop change
- `ImageCarousel`: next arrow advances index; prev wraps around; dot click sets correct index

## Acceptance criteria

- [ ] Stay tab renders all accommodations for the selected spot
- [ ] Each card shows photo carousel (prev/next, dots), name, type, price, rating, amenities, Instagram link, reviews
- [ ] Filter chips above the list show only amenities present at the spot
- [ ] Selecting chips filters cards with AND logic
- [ ] "X of Y stays match" and "Clear" button appear when filters are active
- [ ] Filters reset when switching to a different spot
- [ ] `♡` and "Add to Plan" buttons render but do nothing (wired in #10)
- [ ] All `StayTab` and `ImageCarousel` Vitest tests pass

## Blocked by

- [#07 — SpotPanel shell + Guide tab](07-spot-panel-guide-tab.md)
