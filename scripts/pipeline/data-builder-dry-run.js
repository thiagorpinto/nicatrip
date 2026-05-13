// Dry-run: tests the orchestration wiring with mocked modules
// Usage: node scripts/pipeline/data-builder-dry-run.js

import { normalizeAmenities } from './amenity-normalizer.js'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const mockSpots = [
  {
    surflineId: 'mock-001',
    name: 'Playa Maderas',
    coordinates: [11.470, -85.888],
    difficulty: 'intermediate',
    waveType: 'beach break',
    guide: {
      description: 'A beautiful beach break.',
      bestSeason: 'May–November',
      bestTide: 'Mid tide',
      crowdLevel: 'Moderate',
      hazards: 'Rocks at low tide',
    },
  },
]

const mockAccommodations = [
  {
    name: 'Surf Camp Maderas',
    placeId: 'abc',
    coordinates: [11.471, -85.889],
    rating: 4.5,
    photos: ['photo_ref_1'],
    website: null,
    types: ['lodging', 'campground'],
  },
]

const mockAround = [
  {
    name: 'El Timon Restaurant',
    placeId: 'xyz',
    coordinates: [11.472, -85.890],
    rating: 4.2,
    photos: [],
    website: null,
    types: ['restaurant', 'food'],
  },
]

const output = mockSpots.map((spot) => ({
  id: spot.surflineId,
  name: spot.name,
  coordinates: spot.coordinates,
  difficulty: spot.difficulty,
  waveType: spot.waveType,
  guide: spot.guide,
  accommodations: mockAccommodations.map((place) => {
    const name = place.name.toLowerCase()
    const types = place.types ?? []
    const type =
      types.includes('campground') || name.includes('camp') || name.includes('hostel')
        ? 'surf-camp'
        : 'hotel'
    return {
      name: place.name,
      type,
      nightlyPrice: null,
      rating: place.rating,
      photos: place.photos,
      amenities: normalizeAmenities(place.types ?? []),
      instagramHandle: null,
      reviews: [],
    }
  }),
  around: mockAround.map((place) => {
    const types = place.types ?? []
    const category =
      types.includes('restaurant') || types.includes('food')
        ? 'restaurant'
        : types.includes('bar') || types.includes('night_club')
        ? 'bar'
        : 'activity'
    return { name: place.name, category, rating: place.rating, note: '' }
  }),
}))

const outPath = resolve(__dirname, '../../public/data/spots.json')
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log('Dry run complete. Written to', outPath)
console.log(JSON.stringify(output, null, 2))
