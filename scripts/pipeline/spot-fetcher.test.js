import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchSpots } from './spot-fetcher.js'

const MOCK_SPOT = {
  _id: 'abc123',
  name: 'Popoyo',
  lat: 11.3,
  lon: -86.0,
  conditions: { value: 'INTERMEDIATE' },
  waveType: 'reef break',
  guides: [
    {
      description: 'A powerful left-hand reef break.',
      best_season: 'April–October',
      best_tide: 'mid',
      crowd_level: 'low',
      hazards: 'sharp reef',
    },
  ],
}

function mockResponse(body, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    json: vi.fn().mockResolvedValue(body),
  })
}

describe('fetchSpots', () => {
  it('happy path: returns correctly shaped SpotRecord[] from a valid response', async () => {
    const fetchFn = mockResponse({ data: { spots: [MOCK_SPOT] } })
    const result = await fetchSpots('http://mock', fetchFn)

    expect(result).toHaveLength(1)
    const spot = result[0]
    expect(spot.surflineId).toBe('abc123')
    expect(spot.name).toBe('Popoyo')
    expect(spot.coordinates).toEqual([11.3, -86.0])
    expect(spot.difficulty).toBe('INTERMEDIATE')
    expect(spot.waveType).toBe('reef break')
    expect(spot.guide.description).toBe('A powerful left-hand reef break.')
    expect(spot.guide.bestSeason).toBe('April–October')
    expect(spot.guide.bestTide).toBe('mid')
    expect(spot.guide.crowdLevel).toBe('low')
    expect(spot.guide.hazards).toBe('sharp reef')
  })

  it('also handles top-level spots array shape', async () => {
    const fetchFn = mockResponse({ spots: [MOCK_SPOT] })
    const result = await fetchSpots('http://mock', fetchFn)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Popoyo')
  })

  it('returns [] and logs a warning on network error', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchFn = vi.fn().mockRejectedValue(new Error('ECONNREFUSED'))

    const result = await fetchSpots('http://mock', fetchFn)

    expect(result).toEqual([])
    expect(warnSpy).toHaveBeenCalledOnce()
    warnSpy.mockRestore()
  })

  it('returns [] and logs a warning when JSON parsing throws', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchFn = vi.fn().mockResolvedValue({
      json: vi.fn().mockRejectedValue(new SyntaxError('Unexpected token')),
    })

    const result = await fetchSpots('http://mock', fetchFn)

    expect(result).toEqual([])
    expect(warnSpy).toHaveBeenCalledOnce()
    warnSpy.mockRestore()
  })

  it('returns [] and logs a warning when response has no spots array', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchFn = mockResponse({ data: { something: 'else' } })

    const result = await fetchSpots('http://mock', fetchFn)

    expect(result).toEqual([])
    expect(warnSpy).toHaveBeenCalledOnce()
    warnSpy.mockRestore()
  })

  it('returns [] and logs a warning for empty object response', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchFn = mockResponse({})

    const result = await fetchSpots('http://mock', fetchFn)

    expect(result).toEqual([])
    expect(warnSpy).toHaveBeenCalledOnce()
    warnSpy.mockRestore()
  })

  it('uses the correct Surfline URL with the Nicaragua subregion', async () => {
    const fetchFn = mockResponse({ data: { spots: [] } })
    await fetchSpots('http://mock', fetchFn)

    expect(fetchFn).toHaveBeenCalledWith(
      expect.stringContaining('58581a836630e24c44878fd8')
    )
  })

  it('handles spots with missing optional fields gracefully', async () => {
    const minimal = { _id: 'x1', name: 'Unknown', lat: 0, lon: 0 }
    const fetchFn = mockResponse({ data: { spots: [minimal] } })
    const result = await fetchSpots('http://mock', fetchFn)

    expect(result).toHaveLength(1)
    expect(result[0].guide.description).toBe('')
    expect(result[0].difficulty).toBe('')
  })
})
