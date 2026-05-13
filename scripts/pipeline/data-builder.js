// Usage: node scripts/pipeline/data-builder.js
// Requires env var: GOOGLE_PLACES_API_KEY

import { fetchSpots } from './spot-fetcher.js'
import { fetchPlaces, fetchCoolStuffAround } from './places-fetcher.js'
import { enrichAccommodation } from './accommodation-enricher.js'
import { normalizeAmenities } from './amenity-normalizer.js'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function build() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    console.error('Missing GOOGLE_PLACES_API_KEY env var')
    process.exit(1)
  }

  // 1. Fetch all Nicaragua surf spots from Surfline
  const spots = await fetchSpots()
  console.log(`Fetched ${spots.length} spots`)

  const output = []

  for (const spot of spots) {
    console.log(`Processing: ${spot.name}`)

    // 2. Fetch accommodations (type: 'lodging'), 5–15
    let accommodations = []
    try {
      const rawAccommodations = await fetchPlaces({
        lat: spot.coordinates[0],
        lng: spot.coordinates[1],
        type: 'lodging',
        apiKey,
        maxResults: 15,
      })

      // 3. Enrich each accommodation (Instagram + price scraping)
      accommodations = await Promise.all(
        rawAccommodations.map(async (place) => {
          let enriched = {}
          try {
            enriched = await enrichAccommodation(place)
          } catch (e) {
            console.warn(`Enrichment failed for ${place.name}:`, e.message)
          }

          const type = deriveAccommodationType(place)
          const amenities = normalizeAmenities(place.types ?? [])

          return {
            name: place.name,
            type,
            nightlyPrice: enriched.nightlyPrice ?? null,
            rating: place.rating ?? null,
            photos: place.photos ?? [],
            amenities,
            instagramHandle: enriched.instagramHandle ?? null,
            reviews: [],
          }
        })
      )
    } catch (e) {
      console.warn(`Accommodations fetch failed for ${spot.name}:`, e.message)
    }

    // 4. Fetch Cool Stuff Around (restaurants, bars, activities), 10–25
    let around = []
    try {
      const rawAround = await fetchCoolStuffAround({
        lat: spot.coordinates[0],
        lng: spot.coordinates[1],
        apiKey,
      })

      around = rawAround.map((place) => ({
        name: place.name,
        category: derivePlaceCategory(place),
        rating: place.rating ?? null,
        note: '',
      }))
    } catch (e) {
      console.warn(`Around fetch failed for ${spot.name}:`, e.message)
    }

    output.push({
      id: spot.surflineId,
      name: spot.name,
      coordinates: spot.coordinates,
      difficulty: spot.difficulty,
      waveType: spot.waveType,
      guide: spot.guide,
      accommodations,
      around,
    })
  }

  // 5. Write output
  const outPath = resolve(__dirname, '../../public/data/spots.json')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, JSON.stringify(output, null, 2))
  console.log(`Written ${output.length} spots to ${outPath}`)
}

function deriveAccommodationType(place) {
  const name = (place.name ?? '').toLowerCase()
  const types = place.types ?? []
  if (
    types.includes('campground') ||
    name.includes('camp') ||
    name.includes('hostel') ||
    name.includes('surf camp')
  ) {
    return 'surf-camp'
  }
  return 'hotel'
}

function derivePlaceCategory(place) {
  const types = place.types ?? []
  if (types.includes('restaurant') || types.includes('food')) return 'restaurant'
  if (types.includes('bar') || types.includes('night_club')) return 'bar'
  return 'activity'
}

build().catch((e) => {
  console.error('Build failed:', e)
  process.exit(1)
})
