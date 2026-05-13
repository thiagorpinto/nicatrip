const NICARAGUA_SUBREGION_ID = '58581a836630e24c4487903a'

function extractSpot(spot) {
  const { _id, name, lat, lon, conditions, guides } = spot
  const guide = guides?.[0] ?? {}
  return {
    surflineId: _id ?? '',
    name: name ?? '',
    coordinates: [lat ?? 0, lon ?? 0],
    difficulty: conditions?.value ?? '',
    waveType: spot.waveType ?? spot.wave_type ?? '',
    guide: {
      description: guide.description ?? '',
      bestSeason: guide.best_season ?? guide.bestSeason ?? '',
      bestTide: guide.best_tide ?? guide.bestTide ?? '',
      crowdLevel: guide.crowd_level ?? guide.crowdLevel ?? '',
      hazards: guide.hazards ?? '',
    },
  }
}

export async function fetchSpots(
  baseUrl = 'https://services.surfline.com',
  fetchFn = fetch
) {
  const url =
    `${baseUrl}/kbyg/regions/overview?subregionId=${NICARAGUA_SUBREGION_ID}&maxHeights=false`

  let data
  try {
    const res = await fetchFn(url)
    data = await res.json()
  } catch (err) {
    console.warn('[spot-fetcher] Network or parse error:', err?.message ?? err)
    return []
  }

  const spots = data?.data?.spots ?? data?.spots
  if (!Array.isArray(spots)) {
    console.warn('[spot-fetcher] Unexpected API response shape — no spots array found')
    return []
  }

  return spots.map(extractSpot)
}
