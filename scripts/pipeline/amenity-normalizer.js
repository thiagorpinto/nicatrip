const CANONICAL_MAP = {
  'pool': 'pool',
  'swimming pool': 'pool',
  'outdoor pool': 'pool',
  'rooftop pool': 'pool',
  'infinity pool': 'pool',

  'surfboard rental': 'board-rental',
  'board rental': 'board-rental',
  'surf board': 'board-rental',
  'boards included': 'board-rental',
  'boards available': 'board-rental',

  'surf guide': 'surf-guiding',
  'surf guiding': 'surf-guiding',
  'surf lessons': 'surf-guiding',
  'surf instruction': 'surf-guiding',
  'surf coaching': 'surf-guiding',

  'boat trip': 'boat',
  'boat access': 'boat',
  'boat tours': 'boat',
  'boat transfer': 'boat',
  'panga': 'boat',
  'surf boat': 'boat',
  'water taxi': 'boat',

  'beachfront': 'beachfront',
  'beach access': 'beachfront',
  'oceanfront': 'beachfront',
  'on the beach': 'beachfront',
  'steps from the beach': 'beachfront',

  'restaurant': 'restaurant',
  'on-site restaurant': 'restaurant',
  'dining': 'restaurant',
  'meals included': 'restaurant',

  'bar': 'bar',
  'beach bar': 'bar',
  'swim-up bar': 'bar',

  'yoga': 'yoga',
  'yoga classes': 'yoga',
  'yoga sessions': 'yoga',

  'airport transfer': 'airport-transfer',
  'airport shuttle': 'airport-transfer',
  'airport pickup': 'airport-transfer',
  'airport pickup included': 'airport-transfer',

  'gym': 'gym',
  'fitness center': 'gym',
  'fitness room': 'gym',
  'workout room': 'gym',

  'spa': 'spa',
  'massage': 'spa',
  'massage service': 'spa',
  'wellness': 'spa',

  'wi-fi': 'wifi',
  'wifi': 'wifi',
  'free wifi': 'wifi',
  'wireless internet': 'wifi',

  'air conditioning': 'ac',
  'ac': 'ac',
  'air-conditioned rooms': 'ac',
}

// Sort keys longest-first so longer matches take priority over shorter substrings
// (e.g. "surf board" before "board", "beach bar" before "bar")
const SORTED_KEYS = Object.keys(CANONICAL_MAP).sort((a, b) => b.length - a.length)

export function normalizeAmenities(rawAmenities) {
  const seen = new Set()
  const result = []

  for (const raw of rawAmenities) {
    const lower = raw.toLowerCase()
    for (const key of SORTED_KEYS) {
      if (lower.includes(key)) {
        const canonical = CANONICAL_MAP[key]
        if (!seen.has(canonical)) {
          seen.add(canonical)
          result.push(canonical)
        }
        break
      }
    }
  }

  return result
}
