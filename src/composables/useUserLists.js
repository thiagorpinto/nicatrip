import { reactive, computed } from 'vue'

const STORAGE_KEY = 'nicatrip_wishlist'

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const ids = raw ? JSON.parse(raw) : []
    return Object.fromEntries(ids.map(id => [id, true]))
  } catch {
    return {}
  }
}

// Reactive record: { [spotId]: true } — plain object, unambiguous Vue 3 reactivity
const wishlist = reactive(loadWishlist())

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.keys(wishlist)))
}

export function useUserLists() {
  function toggleWishlist(spotId) {
    if (wishlist[spotId]) {
      delete wishlist[spotId]
    } else {
      wishlist[spotId] = true
    }
    persist()
  }

  function isWishlisted(spotId) {
    return !!wishlist[spotId]
  }

  const wishlistCount = computed(() => Object.keys(wishlist).length)
  const wishlistIds = computed(() => Object.keys(wishlist))

  return { toggleWishlist, isWishlisted, wishlistCount, wishlistIds }
}
