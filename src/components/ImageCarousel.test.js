import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ImageCarousel from './ImageCarousel.vue'

const photos = ['a.jpg', 'b.jpg', 'c.jpg']

describe('ImageCarousel', () => {
  it('shows placeholder when no photos', () => {
    const w = mount(ImageCarousel, { props: { photos: [] } })
    expect(w.text()).toContain('No photos')
  })

  it('next arrow advances active index', async () => {
    const w = mount(ImageCarousel, { props: { photos } })
    expect(w.find('img').attributes('src')).toBe('a.jpg')
    await w.find('.next').trigger('click')
    expect(w.find('img').attributes('src')).toBe('b.jpg')
  })

  it('prev arrow wraps around from first to last', async () => {
    const w = mount(ImageCarousel, { props: { photos } })
    await w.find('.prev').trigger('click')
    expect(w.find('img').attributes('src')).toBe('c.jpg')
  })

  it('dot click sets correct index', async () => {
    const w = mount(ImageCarousel, { props: { photos } })
    const dots = w.findAll('.dot')
    await dots[2].trigger('click')
    expect(w.find('img').attributes('src')).toBe('c.jpg')
  })
})
