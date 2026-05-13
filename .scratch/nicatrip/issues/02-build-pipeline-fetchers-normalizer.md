Status: done

# 02 — Build pipeline: spot-fetcher + places-fetcher + amenity-normalizer

## What to build

Implement three independent pipeline modules under `scripts/pipeline/`:

- **`spot-fetcher`** — calls Surfline's unofficial API and returns a typed `SpotRecord[]` (name, surflineId, coordinates, difficulty, wave type, guide content). Accepts the base URL as a dependency so it can be tested against a mock server.
- **`places-fetcher`** — given lat/lng and a place type, calls Google Places Nearby Search and returns `PlaceRecord[]`. Accepts the API key and HTTP client as injectable dependencies. Enforces count rules: 5–15 for accommodations (issues a second paginated request if first page returns fewer than 5), 10–25 for Cool Stuff Around across restaurant/bar/tourist_attraction types.
- **`amenity-normalizer`** — pure function `(rawAmenities: string[]) => CanonicalAmenity[]`. Applies case-insensitive substring matching against the 13-item canonical mapping table defined in `CONTEXT.md`. Deduplicates output.

All three modules have Vitest unit tests:
- `amenity-normalizer`: each canonical amenity detected from all its mapped strings; unrecognised strings produce no output; case-insensitive; deduplication.
- `spot-fetcher`: happy path returns correctly shaped `SpotRecord[]`; network error returns empty array with logged warning; unexpected API shape handled gracefully.
- `places-fetcher`: correct result counts (min/max respected); second paginated request triggered when needed; cap respected.

## Acceptance criteria

- [x] `spot-fetcher` returns typed `SpotRecord[]` from a mocked Surfline response
- [x] `spot-fetcher` returns `[]` (with a warning) on network error or unexpected response shape
- [x] `places-fetcher` returns 5–15 accommodations; issues a second paginated request when first page returns < 5
- [x] `places-fetcher` returns 10–25 Cool Stuff Around entries merged across place types
- [x] `amenity-normalizer` maps every string in the canonical table to the correct chip key
- [x] `amenity-normalizer` ignores unrecognised strings and deduplicates output
- [x] All tests pass (`npm run test`)

## Blocked by

None — can start immediately (parallel to issue #01).
