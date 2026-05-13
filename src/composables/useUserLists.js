import { reactive, computed } from 'vue'

const STORAGE_KEY = 'nicatrip_wishlist'

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

const state = reactive({
  wishlist: loadWishlist(),
})

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.wishlist]))
}

export function useUserLists() {
  function toggleWishlist(spotId) {
    if (state.wishlist.has(spotId)) {
      state.wishlist.delete(spotId)
    } else {
      state.wishlist.add(spotId)
    }
    persist()
  }

  function isWishlisted(spotId) {
    return state.wishlist.has(spotId)
  }

  const wishlistCount = computed(() => state.wishlist.size)
  const wishlistIds = computed(() => [...state.wishlist])

  return { toggleWishlist, isWishlisted, wishlistCount, wishlistIds }
}
