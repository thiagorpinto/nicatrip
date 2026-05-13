import { describe, it, expect } from 'vitest'
import { normalizeAmenities } from './amenity-normalizer.js'

describe('normalizeAmenities', () => {
  // --- pool ---
  it.each(['pool', 'swimming pool', 'outdoor pool', 'rooftop pool', 'infinity pool'])(
    'maps "%s" to pool', (raw) => {
      expect(normalizeAmenities([raw])).toContain('pool')
    }
  )

  // --- board-rental ---
  it.each(['surfboard rental', 'board rental', 'surf board', 'boards included', 'boards available'])(
    'maps "%s" to board-rental', (raw) => {
      expect(normalizeAmenities([raw])).toContain('board-rental')
    }
  )

  // --- surf-guiding ---
  it.each(['surf guide', 'surf guiding', 'surf lessons', 'surf instruction', 'surf coaching'])(
    'maps "%s" to surf-guiding', (raw) => {
      expect(normalizeAmenities([raw])).toContain('surf-guiding')
    }
  )

  // --- boat ---
  it.each(['boat trip', 'boat access', 'boat tours', 'boat transfer', 'panga', 'surf boat', 'water taxi'])(
    'maps "%s" to boat', (raw) => {
      expect(normalizeAmenities([raw])).toContain('boat')
    }
  )

  // --- beachfront ---
  it.each(['beachfront', 'beach access', 'oceanfront', 'on the beach', 'steps from the beach'])(
    'maps "%s" to beachfront', (raw) => {
      expect(normalizeAmenities([raw])).toContain('beachfront')
    }
  )

  // --- restaurant ---
  it.each(['restaurant', 'on-site restaurant', 'dining', 'meals included'])(
    'maps "%s" to restaurant', (raw) => {
      expect(normalizeAmenities([raw])).toContain('restaurant')
    }
  )

  // --- bar ---
  it.each(['bar', 'beach bar', 'swim-up bar'])(
    'maps "%s" to bar', (raw) => {
      expect(normalizeAmenities([raw])).toContain('bar')
    }
  )

  // --- yoga ---
  it.each(['yoga', 'yoga classes', 'yoga sessions'])(
    'maps "%s" to yoga', (raw) => {
      expect(normalizeAmenities([raw])).toContain('yoga')
    }
  )

  // --- airport-transfer ---
  it.each(['airport transfer', 'airport shuttle', 'airport pickup', 'airport pickup included'])(
    'maps "%s" to airport-transfer', (raw) => {
      expect(normalizeAmenities([raw])).toContain('airport-transfer')
    }
  )

  // --- gym ---
  it.each(['gym', 'fitness center', 'fitness room', 'workout room'])(
    'maps "%s" to gym', (raw) => {
      expect(normalizeAmenities([raw])).toContain('gym')
    }
  )

  // --- spa ---
  it.each(['spa', 'massage', 'massage service', 'wellness'])(
    'maps "%s" to spa', (raw) => {
      expect(normalizeAmenities([raw])).toContain('spa')
    }
  )

  // --- wifi ---
  it.each(['wi-fi', 'wifi', 'free wifi', 'wireless internet'])(
    'maps "%s" to wifi', (raw) => {
      expect(normalizeAmenities([raw])).toContain('wifi')
    }
  )

  // --- ac ---
  it.each(['air conditioning', 'ac', 'air-conditioned rooms'])(
    'maps "%s" to ac', (raw) => {
      expect(normalizeAmenities([raw])).toContain('ac')
    }
  )

  it('ignores unrecognised strings', () => {
    expect(normalizeAmenities(['helicopter pad', 'butler service', 'telepathy'])).toEqual([])
  })

  it('is case-insensitive', () => {
    expect(normalizeAmenities(['POOL'])).toContain('pool')
    expect(normalizeAmenities(['Swimming Pool'])).toContain('pool')
    expect(normalizeAmenities(['SURF LESSONS'])).toContain('surf-guiding')
    expect(normalizeAmenities(['Free WiFi'])).toContain('wifi')
  })

  it('deduplicates when two raw strings map to the same canonical key', () => {
    const result = normalizeAmenities(['pool', 'swimming pool', 'infinity pool'])
    expect(result.filter(v => v === 'pool')).toHaveLength(1)
  })

  it('returns each canonical key at most once across diverse inputs', () => {
    const result = normalizeAmenities(['wifi', 'free wifi', 'wi-fi'])
    expect(result).toEqual(['wifi'])
  })

  it('returns empty array for empty input', () => {
    expect(normalizeAmenities([])).toEqual([])
  })
})
