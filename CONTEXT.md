# NicaTrip — Domain Context

## Project

**NicaTrip** — a personal surf trip travel guide for a trip to Nicaragua (Aug 17 – Sep 4). The guide helps decide where to go, where to stay, and what to do around each surf spot. It is open-source/shareable: a friend can clone the repo and deploy their own instance with their own travel plan.

## Tech Stack

- **Map**: Leaflet.js + OpenStreetMap (free, no API key)
- **Hosting**: GitHub Pages (free static hosting)
- **Forecasts**: Surfline unofficial API, runtime, session cookie in localStorage
- **Build pipeline**: Node.js script (TBD)
- **Frontend**: Vue 3 + Vite
- **Build script**: Node.js (same ecosystem as frontend)
- **Deployment**: GitHub Actions weekly schedule → GitHub Pages (automated, no manual runs needed)

## Architecture

**Static artifact.** All surf spot data, accommodation info, and activity listings are scraped/fetched once at build time and baked into a self-contained site hosted on GitHub Pages (free). Two things are fetched live at runtime: Surf Forecasts (Surfline unofficial API, requires session cookie) and the travel plan (localStorage only).

**Build-time data pipeline:**
1. Surfline unofficial API → spot list + guide content + coordinates
2. Google Places API (user provides key, ~$1–2 per full build, well within $200/month free tier) → nearby accommodations and Cool Stuff Around per spot
3. Website scraping → Instagram handle + nightly price from each accommodation's own site; Booking.com as fallback

## Known Risks

- **Surfline CORS**: Live forecast calls from `github.io` to `services.surfline.com` may be blocked by CORS. Mitigation: Cloudflare Worker proxy (free tier). Discovered at implementation/test time.
- **Surfline unofficial API stability**: No SLA. If endpoints change, forecasts break and user falls back to the Surfline app directly.

## Glossary

### Surf Spot
A named surf break in Nicaragua as listed on Surfline. Each spot has: a guide (description, skill level, best conditions), one or more linked Accommodations, and a "Cool Stuff Around" list. When clicked on the map, opens a **tabbed panel** with four tabs: Guide / Forecast / Stay / Around.

### Accommodation
A hotel or surf camp near a Surf Spot. Captured data: price per night for 2 people, services/amenities list, traveler reviews, Instagram profile URL.

**Count rule:** minimum 5, maximum 15 per Surf Spot. The build script must request enough results from Google Places to hit the minimum; if fewer than 5 exist near a spot, include all available. Cap at 15 to keep the Stay tab scannable.

**Filtering:** the Stay tab exposes amenity filter chips from a **canonical list** — a fixed set of surfing-relevant tags defined at build time. The build script normalises Google Places amenity strings onto this list. A chip is shown only if at least one accommodation at that spot has the amenity. Selecting multiple chips applies AND logic. Filters reset when the user switches spots.

**Canonical amenity list:**

| Chip | Maps from (Google Places / scraped strings, case-insensitive) |
| ---- | ------------------------------------------------------------- |
| 🏊 Pool | pool, swimming pool, outdoor pool, rooftop pool, infinity pool |
| 🏄 Board rental | surfboard rental, board rental, surf board, boards included, boards available |
| 🌊 Surf guiding | surf guide, surf guiding, surf lessons, surf instruction, surf coaching |
| 🚤 Boat | boat trip, boat access, boat tours, boat transfer, panga, surf boat, water taxi |
| 🏖️ Beachfront | beachfront, beach access, oceanfront, on the beach, steps from the beach |
| 🍽️ Restaurant | restaurant, on-site restaurant, dining, meals included |
| 🍺 Bar | bar, beach bar, swim-up bar |
| 🧘 Yoga | yoga, yoga classes, yoga sessions |
| 🛫 Airport transfer | airport transfer, airport shuttle, airport pickup, airport pickup included |
| 💪 Gym | gym, fitness center, fitness room, workout room |
| 🌿 Spa | spa, massage, massage service, wellness |
| 📶 Wi-Fi | wi-fi, wifi, free wifi, wireless internet |
| ❄️ A/C | air conditioning, AC, air-conditioned rooms |

### Travel Plan
A personal itinerary created by the user: a set of (Surf Spot, date range, Accommodation) selections. Stored in `localStorage`. Purely personal — not shared or synced. The guide itself (NicaTrip) can be shared as a codebase so another person can deploy their own instance with their own plan.

**UX flow:** "Add to my plan" button inside the spot panel → mini form (date range picker + accommodation selector from that spot's Stay tab) → saved to localStorage. A persistent "My Plan" drawer (accessible from the top of the page) shows the full itinerary in chronological order.

### Cool Stuff Around
Per-Surf Spot list of local restaurants, bars, and non-surf activities. Fetched at build time via Google Places API (same key as Accommodations) using place type queries (`restaurant`, `bar`, `tourist_attraction`) around the spot's coordinates. Baked into the static site.

**Count rule:** minimum 10, maximum 25 per Surf Spot. Split across categories (restaurants, bars, activities) — no hard sub-category quotas, but the build script should aim for a mix. Cap at 25 to keep the Around tab useful without being overwhelming.

### Surf Forecast
Live surf conditions and multi-day forecast for a Surf Spot. Fetched on demand from Surfline's unofficial API (`services.surfline.com`). Requires the user's Surfline session cookie stored in `localStorage`. If the API breaks, the user falls back to the Surfline app directly — no graceful degradation needed in NicaTrip.
