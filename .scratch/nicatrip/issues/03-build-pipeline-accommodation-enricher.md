Status: done

# 03 — Build pipeline: accommodation-enricher

## What to build

Implement the `accommodation-enricher` module under `scripts/pipeline/`. Given a `PlaceRecord` that includes a website URL, it fetches the accommodation's own website and extracts:
- **Instagram handle** — scraped from the page HTML (look for `instagram.com/` links or meta tags)
- **Nightly price for 2 people** — scraped from the page HTML

If the website yields no price, fall back to a Booking.com search scrape for that property name. The HTTP client is injectable so the module is testable without real network calls.

Vitest unit tests:
- Extracts Instagram handle and nightly price from a mocked website HTML response
- Falls back to Booking.com mock when primary website yields no price
- Returns partial data (one field found, the other not) without throwing
- Handles fetch errors gracefully (returns `{}` with a warning, does not crash the pipeline)

## Acceptance criteria

- [x] `accommodation-enricher` extracts `instagramHandle` from a mocked HTML page containing an Instagram link
- [x] `accommodation-enricher` extracts `nightlyPrice` from a mocked HTML page
- [x] When primary website returns no price, falls back to Booking.com scrape mock
- [x] Returns partial result (`{ instagramHandle }` only, or `{ nightlyPrice }` only) when one field is missing
- [x] Does not throw on network error — returns `{}` and logs a warning
- [x] All tests pass (`npm run test`)

## Blocked by

- [#02 — Build pipeline: spot-fetcher + places-fetcher + amenity-normalizer](02-build-pipeline-fetchers-normalizer.md)
