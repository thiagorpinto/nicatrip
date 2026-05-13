const PLACES_BASE = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
const RADIUS = 10000

function buildUrl(lat, lng, type, apiKey, pageToken) {
  const params = new URLSearchParams({
    location: `${lat},${lng}`,
    radius: String(RADIUS),
    type,
    key: apiKey,
  })
  if (pageToken) params.set('pagetoken', pageToken)
  return `${PLACES_BASE}?${params.toString()}`
}

function mapPlace(place) {
  return {
    name: place.name ?? '',
    placeId: place.place_id ?? '',
    coordinates: [
      place.geometry?.location?.lat ?? 0,
      place.geometry?.location?.lng ?? 0,
    ],
    rating: place.rating ?? null,
    photos: (place.photos ?? []).map(p => p.photo_reference).filter(Boolean),
    website: place.website ?? null,
    types: place.types ?? [],
  }
}

async function fetchPage(url, fetchFn) {
  const res = await fetchFn(url)
  return res.json()
}

export async function fetchPlaces({
  lat,
  lng,
  type,
  apiKey,
  maxResults,
  fetchFn = fetch,
}) {
  const firstUrl = buildUrl(lat, lng, type, apiKey)
  const firstPage = await fetchPage(firstUrl, fetchFn)
  let results = (firstPage.results ?? []).map(mapPlace)

  // If fewer than 5 accommodations came back, try a second paginated request
  if (type === 'lodging' && results.length < 5 && firstPage.next_page_token) {
    const secondUrl = buildUrl(lat, lng, type, apiKey, firstPage.next_page_token)
    const secondPage = await fetchPage(secondUrl, fetchFn)
    results = results.concat((secondPage.results ?? []).map(mapPlace))
  }

  return results.slice(0, maxResults)
}

const COOL_STUFF_TYPES = ['restaurant', 'bar', 'tourist_attraction']
const COOL_STUFF_MAX = 25

export async function fetchCoolStuffAround({ lat, lng, apiKey, fetchFn = fetch }) {
  const pages = await Promise.all(
    COOL_STUFF_TYPES.map(type =>
      fetchPlaces({ lat, lng, type, apiKey, maxResults: COOL_STUFF_MAX, fetchFn })
    )
  )
  const merged = pages.flat()
  return merged.slice(0, COOL_STUFF_MAX)
}
