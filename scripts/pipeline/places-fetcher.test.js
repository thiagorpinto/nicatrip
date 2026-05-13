import { describe, it, expect, vi } from 'vitest'
import { fetchPlaces, fetchCoolStuffAround } from './places-fetcher.js'

const BASE_ARGS = { lat: 11.3, lng: -86.0, apiKey: 'TEST_KEY' }

function makePlace(id) {
  return {
    name: `Place ${id}`,
    place_id: `pid_${id}`,
    geometry: { location: { lat: 11.3, lng: -86.0 } },
    rating: 4.2,
    photos: [{ photo_reference: `ref_${id}` }],
    website: `https://place${id}.com`,
    types: ['lodging'],
  }
}

function makePlaces(n, startIndex = 0) {
  return Array.from({ length: n }, (_, i) => makePlace(startIndex + i))
}

function mockFetchFn(pages) {
  let call = 0
  return vi.fn().mockImplementation(() => {
    const body = pages[call] ?? { results: [] }
    call++
    return Promise.resolve({ json: () => Promise.resolve(body) })
  })
}

describe('fetchPlaces', () => {
  it('returns correctly shaped PlaceRecord[] from a single page', async () => {
    const places = makePlaces(8)
    const fetchFn = mockFetchFn([{ results: places }])
    const result = await fetchPlaces({ ...BASE_ARGS, type: 'lodging', maxResults: 15, fetchFn })

    expect(result).toHaveLength(8)
    expect(result[0]).toMatchObject({
      name: 'Place 0',
      placeId: 'pid_0',
      coordinates: [11.3, -86.0],
      rating: 4.2,
      photos: ['ref_0'],
      website: 'https://place0.com',
      types: ['lodging'],
    })
  })

  it('caps results at maxResults', async () => {
    const fetchFn = mockFetchFn([{ results: makePlaces(20) }])
    const result = await fetchPlaces({ ...BASE_ARGS, type: 'lodging', maxResults: 15, fetchFn })
    expect(result).toHaveLength(15)
  })

  it('issues a second paginated request when lodging first page returns < 5', async () => {
    const firstPage = { results: makePlaces(3), next_page_token: 'TOKEN_ABC' }
    const secondPage = { results: makePlaces(5, 3) }
    const fetchFn = mockFetchFn([firstPage, secondPage])

    const result = await fetchPlaces({ ...BASE_ARGS, type: 'lodging', maxResults: 15, fetchFn })

    expect(fetchFn).toHaveBeenCalledTimes(2)
    // Second call URL should include the page token
    expect(fetchFn.mock.calls[1][0]).toContain('TOKEN_ABC')
    expect(result).toHaveLength(8) // 3 + 5
  })

  it('does NOT issue a second request when first page returns >= 5 results', async () => {
    const fetchFn = mockFetchFn([{ results: makePlaces(5), next_page_token: 'SHOULD_NOT_USE' }])
    await fetchPlaces({ ...BASE_ARGS, type: 'lodging', maxResults: 15, fetchFn })
    expect(fetchFn).toHaveBeenCalledTimes(1)
  })

  it('does NOT issue a second request for non-lodging types even if < 5 results', async () => {
    const fetchFn = mockFetchFn([{ results: makePlaces(2), next_page_token: 'TOKEN' }])
    await fetchPlaces({ ...BASE_ARGS, type: 'restaurant', maxResults: 25, fetchFn })
    expect(fetchFn).toHaveBeenCalledTimes(1)
  })

  it('handles empty results gracefully', async () => {
    const fetchFn = mockFetchFn([{ results: [] }])
    const result = await fetchPlaces({ ...BASE_ARGS, type: 'lodging', maxResults: 15, fetchFn })
    expect(result).toEqual([])
  })

  it('handles missing photos/website gracefully', async () => {
    const place = { name: 'Bare', place_id: 'bare1', geometry: { location: { lat: 0, lng: 0 } } }
    const fetchFn = mockFetchFn([{ results: [place] }])
    const result = await fetchPlaces({ ...BASE_ARGS, type: 'lodging', maxResults: 15, fetchFn })
    expect(result[0].photos).toEqual([])
    expect(result[0].website).toBeNull()
    expect(result[0].rating).toBeNull()
  })
})

describe('fetchCoolStuffAround', () => {
  it('calls fetchPlaces for each of the 3 types', async () => {
    // 10 results per type = 30 total, should be capped at 25
    const fetchFn = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ results: makePlaces(10) }),
    })

    const result = await fetchCoolStuffAround({ ...BASE_ARGS, fetchFn })

    expect(fetchFn).toHaveBeenCalledTimes(3)
    expect(result).toHaveLength(25)
  })

  it('merges results across types', async () => {
    let call = 0
    const types = ['restaurant', 'bar', 'tourist_attraction']
    const fetchFn = vi.fn().mockImplementation((url) => {
      // Return 3 results per type so we can verify merge (total 9, under cap)
      return Promise.resolve({
        json: () => Promise.resolve({ results: makePlaces(3, call++ * 3) }),
      })
    })

    const result = await fetchCoolStuffAround({ ...BASE_ARGS, fetchFn })

    expect(result).toHaveLength(9)
  })

  it('caps total at 25 when types combined exceed the limit', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ results: makePlaces(25) }),
    })

    const result = await fetchCoolStuffAround({ ...BASE_ARGS, fetchFn })
    expect(result.length).toBeLessThanOrEqual(25)
  })
})
