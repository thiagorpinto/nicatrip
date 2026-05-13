Status: ready-for-agent

# NicaTrip — Product Requirements Document

## Problem Statement

I'm a surfer planning a trip to Nicaragua (Aug 17 – Sep 4) and I have no tool that combines surf spot discovery, accommodation research, local activity listings, and live surf forecasts in one place. Existing options force me to juggle Surfline for wave info, Google for hotels, TripAdvisor for restaurants, and a notes app for my itinerary. I want a single map-based guide tailored to Nicaragua that lets me research spots, shortlist accommodations and stays, and plan my trip — all without a backend or subscription fees beyond what I already pay.

## Solution

NicaTrip is a static web application built with Vue 3 + Vite, hosted on GitHub Pages for free. A Node.js build pipeline runs weekly via GitHub Actions to scrape and bake all Nicaragua surf spot data, accommodations, and local activities into a `spots.json` file. The frontend reads this file at load time and renders an interactive Leaflet map. Users click spot markers to explore surf guides, live Surfline forecasts, accommodation options (with photos, prices, amenity filters, and Instagram links), and local restaurant/bar/activity listings. A personal planning layer — Wishlist, Favorite Stays, and Confirmed Travel Plan — is stored in `localStorage` and reflected visually on the map via color-coded markers. NicaTrip can be shared as a codebase so a friend can deploy their own instance with their own plan.

## User Stories

### Map & Navigation

1. As a user, I want to open NicaTrip and immediately see a map of Nicaragua with all surf spots marked, so that I can get a spatial overview of where to surf.
2. As a user, I want surf spot markers to be visually distinct from accommodation markers, so that I can tell at a glance what each pin represents.
3. As a user, I want spot markers to change color based on their status (default blue / wishlisted amber / in plan green), so that I can see my planning state on the map without opening any panel.
4. As a user, I want accommodation markers to appear on the map only when I have favorited or confirmed them, so that the map stays uncluttered by default.
5. As a user, I want accommodation markers to change color (pink when favorited, green when in plan), so that I can visually track my shortlist on the map.
6. As a user, I want to click any spot marker to open the spot panel, so that I can explore that spot's details.
7. As a user, I want to click any accommodation marker to open the spot panel's Stay tab for that spot, so that I can quickly access the accommodation I've saved.
8. As a user, I want a legend in the top bar explaining the marker colors, so that I understand the visual system without instructions.

### Spot Panel — Guide Tab

9. As a user, I want clicking a spot to open a wide side panel from the right with a Guide tab active by default, so that I can immediately read about the spot.
10. As a user, I want the guide to show the spot's description, best season, best tide, crowd level, and hazards, so that I can assess whether it suits my skill and travel window.
11. As a user, I want a wishlist star button in the panel header, so that I can save a spot to my wishlist in one click without committing to dates.
12. As a user, I want the star to toggle between empty (☆) and filled amber (★), so that I have clear feedback on the wishlist state.
13. As a user, I want the panel header to show a "★ Wishlist" or "✓ In Plan" status badge, so that I can see the spot's planning state at a glance.

### Spot Panel — Forecast Tab

14. As a user, I want the Forecast tab to show the current wave height, swell period, and wind conditions, so that I can assess today's surf at a glance.
15. As a user, I want a star rating (1–5) for current conditions, so that I get an instant quality signal without parsing numbers.
16. As a user, I want a 5-day forecast bar chart with wave height and a color-coded quality rating per day (green / amber / red), so that I can plan which days to surf a particular spot.
17. As a user, I want forecast data to be fetched live from Surfline when I open the Forecast tab, so that I always see current and not stale data.
18. As a user, I want to paste my Surfline session cookie into a settings panel, so that NicaTrip can authenticate with Surfline on my behalf.
19. As a user, I want my session cookie to be stored in `localStorage`, so that I only need to enter it once per browser.
20. As a user, I want the forecast to silently fail (empty state) if my Surfline session expires, so that the rest of the guide remains usable and I know to fall back to the Surfline app.

### Spot Panel — Stay Tab

21. As a user, I want the Stay tab to list between 5 and 15 accommodations per spot, so that I have meaningful choice without being overwhelmed.
22. As a user, I want each accommodation card to show a photo carousel with previous/next arrows and dot indicators, so that I can browse images without leaving the panel.
23. As a user, I want each accommodation card to show the name, type (hotel or surf camp), nightly price for 2 people, rating, and amenities, so that I can compare options quickly.
24. As a user, I want each accommodation's Instagram handle to be a clickable link that opens their profile in a new tab, so that I can see their latest posts and vibe.
25. As a user, I want traveler review snippets shown on each card, so that I get social proof without leaving NicaTrip.
26. As a user, I want a heart button (♡ / ♥) on each accommodation card, so that I can favorite it as a candidate without committing to dates.
27. As a user, I want favorited cards to have a pink border, so that I can visually distinguish my shortlist in the Stay tab.
28. As a user, I want confirmed accommodations to show an "✓ In Plan" badge and a green card border, so that I can see what I've committed to.
29. As a user, I want amenity filter chips above the accommodation list, so that I can filter to only stays that offer specific amenities.
30. As a user, I want filter chips to be derived from the canonical amenity list (Pool, Board rental, Surf guiding, Boat, Beachfront, Restaurant, Bar, Yoga, Airport transfer, Gym, Spa, Wi-Fi, A/C), so that naming is consistent across all spots.
31. As a user, I want a chip to only appear if at least one accommodation at that spot has that amenity, so that chips are always actionable.
32. As a user, I want selecting multiple chips to apply AND logic, so that I see only accommodations that have all my selected amenities.
33. As a user, I want a "X of Y stays match" summary and a "Clear" button when filters are active, so that I understand what's filtered and can reset easily.
34. As a user, I want filters to reset automatically when I switch to a different spot, so that filters from one spot don't confuse me on another.
35. As a user, I want an "Add to Plan" button on each accommodation card, so that I can confirm a stay by setting dates.
36. As a user, I want clicking "Add to Plan" to open a date picker modal with my trip dates (Aug 17 – Sep 4) pre-bounded, so that I can't accidentally pick dates outside my trip.
37. As a user, I want the Stay tab to show a badge with the count of favorited accommodations, so that I can see my shortlist size without opening My Lists.

### Spot Panel — Around Tab

38. As a user, I want the Around tab to list between 10 and 25 local restaurants, bars, and activities near each spot, so that I know what to do when there's no surf.
39. As a user, I want each listing to show the place name, category (restaurant / bar / activity), rating, and a short note, so that I can assess interest quickly.

### My Lists Drawer

40. As a user, I want a "My Lists" button in the top bar, so that I can open my planning drawer at any time.
41. As a user, I want the drawer to show a Wishlist section listing all spots I've starred, so that I can review my surf spot candidates in one place.
42. As a user, I want each wishlist entry to show any favorited accommodations for that spot, so that I can see my stay shortlist at a glance.
43. As a user, I want a "View" button on each wishlist entry that opens that spot's panel, so that I can continue researching without hunting for the marker.
44. As a user, I want to remove a spot from my wishlist directly from the drawer, so that I can prune my list without opening the spot panel.
45. As a user, I want the drawer to show a Confirmed Plan section with all date-confirmed stops, so that I can review my full itinerary.
46. As a user, I want each confirmed stop to show the spot name, dates, and chosen accommodation, so that I have a complete picture of my plan.
47. As a user, I want to remove a confirmed stop from the plan directly from the drawer, so that I can adjust my itinerary.
48. As a user, I want the "My Lists" button to show a badge with the total count of wishlisted spots and confirmed stops, so that I know my lists are non-empty without opening the drawer.
49. As a user, I want all list state (Wishlist, Favorite Stays, Travel Plan) to persist in `localStorage`, so that my planning survives browser reloads and tab closures.

### Build Pipeline

50. As a developer, I want a `spot-fetcher` module that queries Surfline's unofficial API for all Nicaragua surf spots and returns structured data (name, id, coordinates, difficulty, wave type, guide content), so that the build pipeline has a reliable, testable data source.
51. As a developer, I want a `places-fetcher` module that queries the Google Places Nearby Search API for a given lat/lng and returns the top results for accommodations (5–15) and Cool Stuff Around (10–25), so that each spot gets enriched with local data.
52. As a developer, I want a `accommodation-enricher` module that scrapes each accommodation's website for its nightly price and Instagram handle, with Booking.com as a fallback, so that price and social data are baked into the static site.
53. As a developer, I want an `amenity-normalizer` module that maps raw Google Places and scraped amenity strings to the 13-item canonical amenity list, so that filter chips are consistent across all spots.
54. As a developer, I want a `data-builder` orchestrator that runs all pipeline modules in sequence and writes a final `spots.json` to the `public/` directory, so that the frontend has a single source of truth.
55. As a developer, I want the build to run automatically via a GitHub Actions weekly cron job, so that spot and accommodation data stays fresh without manual intervention.
56. As a developer, I want the GitHub Actions workflow to deploy the built site to GitHub Pages on every successful run, so that the live site is always up to date.

### Sharing

57. As a user, I want to share the NicaTrip codebase with a friend so they can deploy their own instance, so that they get the same guide and can build their own independent plan.

## Implementation Decisions

### Architecture

NicaTrip is a fully static site. All Surf Spot data, Accommodation data, and Cool Stuff Around data are fetched at build time and baked into `public/data/spots.json`. The frontend loads this file at startup. Only two things happen at runtime: Surf Forecast calls (Surfline API) and user list state (localStorage). There is no backend, no database, and no server-side rendering.

### Module Boundaries

**Build pipeline** (Node.js, runs in GitHub Actions):

- `spot-fetcher` — single responsibility: call Surfline unofficial API, return array of `SpotRecord`. Accepts base URL as a dependency so it can be tested against a mock server.
- `places-fetcher` — single responsibility: given lat/lng and a place type, return array of `PlaceRecord` from Google Places Nearby Search. Accepts the API key and HTTP client as injectable dependencies.
- `accommodation-enricher` — given a `PlaceRecord` with a website URL, return `{ instagramHandle, nightlyPrice }`. HTTP client is injectable. Falls back to Booking.com search scrape if the website yields no result.
- `amenity-normalizer` — pure function: `(rawAmenities: string[]) => CanonicalAmenity[]`. No I/O, no dependencies. Applies case-insensitive substring matching against the canonical mapping table from `CONTEXT.md`.
- `data-builder` — orchestrator only. Calls the above modules, merges results, writes `spots.json`. Not independently tested (its correctness is covered by testing its dependencies).

**Frontend** (Vue 3 + Vite):

- `useUserLists` composable — all localStorage state: Wishlist (`Set<spotId>`), Favorite Stays (`Record<spotId, Set<accName>>`), Travel Plan (`PlanEntry[]`). Exposes toggle and query functions. No DOM dependencies — testable with Vitest.
- `MapView` component — initialises Leaflet map, renders custom div-icon markers for spots and accommodations. Watches `useUserLists` state and calls `marker.setIcon()` reactively. Accommodation markers are added/removed from the map based on favorited/plan state.
- `SpotPanel` component — right slide-in panel. Receives selected spot as prop, emits close. Contains tab router (Guide / Forecast / Stay / Around).
- `ForecastWidget` component — on mount, reads Surfline session cookie from localStorage and fetches forecast for the spot's Surfline ID. Renders current conditions + 5-day bar chart.
- `StayTab` component — receives spot accommodations. Computes available canonical amenity chips from the accommodation list, applies AND filter, renders filtered cards with image carousel and favorite/plan controls. Filter state is local to the component and resets on spot prop change.
- `ImageCarousel` component — receives array of image URLs. Tracks active index locally. Prev/next buttons cycle through images. Dots overlay on the image.
- `CookieSettings` component — small popover with a text input. On save, writes the cookie string to `localStorage` under a fixed key used by `ForecastWidget`.
- `ListsDrawer` component — left slide-in drawer. Reads from `useUserLists`. Renders Wishlist and Confirmed Plan sections. Emits `open-spot` events consumed by the parent to open SpotPanel.

### State Shape

Derived from the prototype. The `useUserLists` composable manages:

```
wishlist: Set<spotId>
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

All three are serialised to localStorage as JSON on every mutation.

### Amenity Normalisation

The `amenity-normalizer` is a pure function that takes an array of raw strings and returns a subset of the 13 canonical amenity keys. Matching is case-insensitive substring. The full mapping table is defined in `CONTEXT.md` and encoded as a constant inside the module.

### Accommodation Data Rules

- Minimum 5, maximum 15 per Surf Spot. If Google Places returns fewer than 5, include all available.
- `places-fetcher` requests up to 20 results (one Nearby Search page). If fewer than 5 are returned, it issues a second paginated request.

### Cool Stuff Around Data Rules

- Minimum 10, maximum 25 per Surf Spot across restaurant, bar, and tourist\_attraction place types.
- `places-fetcher` issues up to two paginated requests per place type and merges results up to the cap.

### Surf Forecast

- Fetched at runtime from `services.surfline.com` using the Surfline spot ID baked into `spots.json` at build time.
- Session cookie is stored in `localStorage` under the key `nicatrip_surfline_cookie` and passed as a request header.
- If the request fails (expired cookie, CORS block), the Forecast tab renders a silent empty state. No retry logic.
- CORS risk: if `github.io` is blocked by Surfline's CORS policy, a Cloudflare Worker proxy (free tier) will be added as a thin pass-through. This will be determined at implementation time.

### Map Markers

Custom `L.divIcon` circular markers for spots, rounded-square for accommodations. Colors driven reactively by `useUserLists`:

| Entity | Default | Wishlisted / Favorited | In Plan |
|---|---|---|---|
| Surf Spot | Blue `#3b82f6` | Amber `#f59e0b` + ★ | Green `#22c55e` + ✓ |
| Accommodation | Hidden | Pink `#ec4899` | Green `#22c55e` |

### Deployment

GitHub Actions workflow on `schedule: cron('0 6 * * 1')` (every Monday 06:00 UTC). Steps: checkout → install Node deps → run build pipeline (requires `GOOGLE_PLACES_API_KEY` secret) → run `vite build` → deploy to GitHub Pages via `peaceiris/actions-gh-pages`.

## Testing Decisions

### What makes a good test

Tests should assert observable behaviour from the outside — inputs and outputs, not internal implementation. For pipeline modules: given a mocked HTTP response, what JSON does the module return? For the `useUserLists` composable: given a sequence of toggle calls, what does the state and localStorage contain? Never test that a specific internal function was called.

### Modules to test

**Build pipeline:**

- `amenity-normalizer` — unit tests with Vitest. Pure function, no mocks needed. Test: each canonical amenity is detected from its mapped strings; unrecognised strings produce no output; matching is case-insensitive; duplicates are deduplicated.
- `spot-fetcher` — unit tests with Vitest + `msw` (Mock Service Worker) or a lightweight HTTP mock. Test: happy path returns correctly shaped `SpotRecord[]`; network error returns empty array with logged warning; unexpected API shape is handled gracefully.
- `places-fetcher` — unit tests with Vitest + HTTP mock. Test: returns correct number of results (min 5, max 15 for accommodations; min 10, max 25 for Cool Stuff Around); triggers second paginated request when first page is insufficient; respects result cap.
- `accommodation-enricher` — unit tests with Vitest + HTTP mock. Test: extracts Instagram handle and nightly price from a mocked website HTML; falls back to Booking.com mock when website yields no price; returns partial data (one field found, other not) without throwing.

**Frontend:**

- `useUserLists` composable — unit tests with Vitest + `@vue/test-utils`. Test: toggling a spot adds it to the wishlist and persists to localStorage; toggling again removes it; favoriting an accommodation creates the correct nested structure; adding a plan entry stores all fields; removing an entry updates both state and localStorage; serialisation round-trips correctly (state survives a simulated page reload).
- `StayTab` component — component tests with Vitest + `@vue/test-utils`. Test: renders all accommodations when no filters active; selecting a chip hides non-matching cards; selecting two chips applies AND logic; "X of Y stays match" summary is correct; "Clear" resets filters; filters reset when the spot prop changes.
- `amenity-normalizer` integration via `StayTab` — test that canonical chip labels appear when the accommodation data contains mapped raw strings.
- `ImageCarousel` component — component tests. Test: next arrow advances active image index; prev arrow wraps around; dot click sets correct index.
- `ForecastWidget` component — component tests with mocked `fetch`. Test: renders current conditions from mocked Surfline response; renders empty state when fetch rejects; reads cookie from localStorage.

**Not tested:**

- `data-builder` — correctness covered by its dependencies. Integration smoke test (dry-run against mocked APIs) is acceptable but not required.
- `MapView` — Leaflet integration is not practically testable in jsdom. Visual correctness is verified manually.
- `ListsDrawer`, `SpotPanel`, `CookieSettings` — presentational; correctness covered by `useUserLists` tests and manual verification.

## Out of Scope

- Backend, database, or server-side rendering of any kind.
- User authentication or multi-user sync.
- Sharing a personal Travel Plan with another user (the plan is localStorage-only; sharing means sharing the codebase, not the plan).
- Surf spot coverage outside Nicaragua.
- Mobile-native app (NicaTrip is a web app; mobile browser is supported but not specifically optimised).
- Real-time accommodation price updates (prices are baked in at build time; weekly rebuild keeps them reasonably current).
- Instagram feed embedding (requires per-account OAuth; a clickable profile link is the intended solution).
- Offline support / service worker / PWA features.
- Graceful degradation for the Surfline forecast (if it breaks, the user falls back to the Surfline app).

## Further Notes

- The trip runs Aug 17 – Sep 4, 2025. The date picker in the Travel Plan modal should hard-bound to this range.
- A prototype (Vue 3 + Vite, `prototype/` directory) was built to validate the UI layout and interactions. Variant A (side panel) was selected as the design to build. The prototype is throwaway — do not promote its code to production without a clean rewrite under proper constraints.
- The Surfline unofficial API has no SLA. If it changes, forecasts will silently fail and the user will use the Surfline app directly. This is an accepted trade-off.
- Cloudflare Worker CORS proxy may be needed for Surfline runtime calls — evaluate at implementation time before adding infrastructure.
- Google Places API key must be stored as a GitHub Actions secret (`GOOGLE_PLACES_API_KEY`) and never committed to the repo.
- A friend deploying their own NicaTrip instance will need their own Google Places API key for the build and their own Surfline session cookie for forecasts.
