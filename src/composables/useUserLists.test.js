import { describe, it, expect, beforeEach, vi } from 'vitest'

beforeEach(() => {
  localStorage.clear()
  vi.resetModules()
})

describe('useUserLists — wishlist', () => {
  it('adds a spot to the wishlist on first toggle', async () => {
    const { useUserLists } = await import('./useUserLists.js')
    const { toggleWishlist, isWishlisted } = useUserLists()
    expect(isWishlisted('spot-1')).toBe(false)
    toggleWishlist('spot-1')
    expect(isWishlisted('spot-1')).toBe(true)
  })

  it('removes a spot on second toggle', async () => {
    const { useUserLists } = await import('./useUserLists.js')
    const { toggleWishlist, isWishlisted } = useUserLists()
    toggleWishlist('spot-1')
    toggleWishlist('spot-1')
    expect(isWishlisted('spot-1')).toBe(false)
  })

  it('persists wishlist to localStorage on toggle', async () => {
    const { useUserLists } = await import('./useUserLists.js')
    const { toggleWishlist } = useUserLists()
    toggleWishlist('spot-2')
    const stored = JSON.parse(localStorage.getItem('nicatrip_wishlist'))
    expect(stored).toContain('spot-2')
  })

  it('survives a simulated page reload (deserialises from localStorage)', async () => {
    const first = await import('./useUserLists.js')
    first.useUserLists().toggleWishlist('spot-3')

    vi.resetModules()

    const second = await import('./useUserLists.js')
    const { isWishlisted } = second.useUserLists()
    expect(isWishlisted('spot-3')).toBe(true)
  })

  it('wishlistCount reflects current size', async () => {
    const { useUserLists } = await import('./useUserLists.js')
    const { toggleWishlist, wishlistCount } = useUserLists()
    expect(wishlistCount.value).toBe(0)
    toggleWishlist('a')
    toggleWishlist('b')
    expect(wishlistCount.value).toBe(2)
    toggleWishlist('a')
    expect(wishlistCount.value).toBe(1)
  })
})
