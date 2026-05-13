import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import StayTab from './StayTab.vue'

const accs = [
  { name: 'Hotel A', type: 'hotel', nightlyPrice: 80, rating: 4.2, photos: [], amenities: ['🏊 Pool', '📶 Wi-Fi'], instagramHandle: null, reviews: [] },
  { name: 'Camp B', type: 'surf-camp', nightlyPrice: 50, rating: 4.8, photos: [], amenities: ['🏄 Board rental', '📶 Wi-Fi'], instagramHandle: 'campb', reviews: ['Great vibe!'] },
  { name: 'Hotel C', type: 'hotel', nightlyPrice: 120, rating: 3.9, photos: [], amenities: ['🏊 Pool', '💪 Gym'], instagramHandle: null, reviews: [] },
]

describe('StayTab', () => {
  it('renders all cards when no filters active', () => {
    const w = mount(StayTab, { props: { accommodations: accs } })
    expect(w.findAll('.card').length).toBe(3)
  })

  it('chip selection hides non-matching cards', async () => {
    const w = mount(StayTab, { props: { accommodations: accs } })
    const poolChip = w.findAll('.chip').find(c => c.text().includes('Pool'))
    await poolChip.trigger('click')
    expect(w.findAll('.card').length).toBe(2) // Hotel A and Hotel C have Pool
  })

  it('two chips apply AND logic', async () => {
    const w = mount(StayTab, { props: { accommodations: accs } })
    const chips = w.findAll('.chip')
    const poolChip = chips.find(c => c.text().includes('Pool'))
    const wifiChip = chips.find(c => c.text().includes('Wi-Fi'))
    await poolChip.trigger('click')
    await wifiChip.trigger('click')
    // Only Hotel A has both Pool AND Wi-Fi
    expect(w.findAll('.card').length).toBe(1)
    expect(w.find('.acc-name').text()).toBe('Hotel A')
  })

  it('shows X of Y summary when filter active', async () => {
    const w = mount(StayTab, { props: { accommodations: accs } })
    await w.findAll('.chip')[0].trigger('click')
    expect(w.find('.filter-summary').exists()).toBe(true)
    expect(w.find('.filter-summary').text()).toContain('of 3 stays match')
  })

  it('Clear resets filters', async () => {
    const w = mount(StayTab, { props: { accommodations: accs } })
    await w.findAll('.chip')[0].trigger('click')
    await w.find('.btn-clear').trigger('click')
    expect(w.findAll('.card').length).toBe(3)
    expect(w.find('.filter-summary').exists()).toBe(false)
  })

  it('filters reset when spot prop changes', async () => {
    const w = mount(StayTab, { props: { accommodations: accs } })
    await w.findAll('.chip')[0].trigger('click')
    expect(w.findAll('.card').length).toBeLessThan(3)
    await w.setProps({ accommodations: [...accs] })
    expect(w.findAll('.card').length).toBe(3)
  })
})
