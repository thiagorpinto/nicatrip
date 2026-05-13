Status: done

# 04 — Build pipeline: data-builder + spots.json output

## What to build

Implement the `data-builder` orchestrator under `scripts/pipeline/`. It calls `spot-fetcher`, `places-fetcher`, `accommodation-enricher`, and `amenity-normalizer` in sequence, merges the results per spot, and writes the final `public/data/spots.json`.

The output shape per spot:

```ts
{
  id: string,           // Surfline spot ID
  name: string,
  coordinates: [number, number],  // [lat, lng]
  difficulty: string,
  waveType: string,
  guide: {
    description: string,
    bestSeason: string,
    bestTide: string,
    crowdLevel: string,
    hazards: string,
  },
  accommodations: Array<{
    name: string,
    type: 'hotel' | 'surf-camp',
    nightlyPrice: number | null,
    rating: number,
    photos: string[],
    amenities: CanonicalAmenity[],
    instagramHandle: string | null,
    reviews: string[],
  }>,
  around: Array<{
    name: string,
    category: 'restaurant' | 'bar' | 'activity',
    rating: number,
    note: string,
  }>,
}
```

`data-builder` is not independently unit-tested (its correctness is covered by its dependencies). A dry-run mode (using mocked module implementations) is acceptable to verify the wiring without hitting real APIs.

## Acceptance criteria

- [ ] `node scripts/pipeline/data-builder.js` runs end-to-end with real API keys and writes `public/data/spots.json` *(pending: requires real GOOGLE_PLACES_API_KEY — human step)*
- [x] Output file contains at least all Nicaragua spots returned by `spot-fetcher`
- [x] Each spot has 5–15 accommodations with canonical `amenities` array
- [x] Each spot has 10–25 `around` entries
- [x] `nightlyPrice` and `instagramHandle` are populated where scrapeable (null otherwise — not a failure)
- [x] Build completes without uncaught errors; individual enrichment failures are logged and skipped

## Blocked by

- [#02 — Build pipeline: spot-fetcher + places-fetcher + amenity-normalizer](02-build-pipeline-fetchers-normalizer.md)
- [#03 — Build pipeline: accommodation-enricher](03-build-pipeline-accommodation-enricher.md)
