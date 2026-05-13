import { describe, it, expect, vi } from 'vitest';
import { enrichAccommodation } from './accommodation-enricher.js';

function makeFetch(html) {
  return vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) });
}

describe('enrichAccommodation', () => {
  it('extracts Instagram handle and nightly price from mocked website HTML', async () => {
    const html = '<a href="https://instagram.com/mysurfcamp">IG</a> Room rate: $120/night';
    const fetchFn = makeFetch(html);
    const result = await enrichAccommodation({ name: 'Surf Camp', website: 'https://example.com' }, fetchFn);
    expect(result.instagramHandle).toBe('mysurfcamp');
    expect(result.nightlyPrice).toBe(120);
  });

  it('falls back to Booking.com when primary website returns no price', async () => {
    const primaryHtml = '<a href="https://instagram.com/myhotel">IG</a>';
    const bookingHtml = '<span>$85/night</span>';
    const fetchFn = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve(primaryHtml) })
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve(bookingHtml) });
    const result = await enrichAccommodation({ name: 'My Hotel', website: 'https://myhotel.com' }, fetchFn);
    expect(result.instagramHandle).toBe('myhotel');
    expect(result.nightlyPrice).toBe(85);
  });

  it('returns partial data without throwing when only one field is found', async () => {
    const html = '<a href="https://instagram.com/campsite">IG</a>';
    const fetchFn = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve(html) })
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve('<p>no price here</p>') });
    const result = await enrichAccommodation({ name: 'Campsite', website: 'https://campsite.com' }, fetchFn);
    expect(result.instagramHandle).toBe('campsite');
    expect(result.nightlyPrice).toBeNull();
  });

  it('handles primary fetch error gracefully — returns {} without throwing', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('network error'));
    const result = await enrichAccommodation({ name: 'Hostel', website: 'https://hostel.com' }, fetchFn);
    expect(result).toEqual({});
  });

  it('handles null website — goes straight to Booking.com, instagramHandle is null', async () => {
    const bookingHtml = '<div>USD 60</div>';
    const fetchFn = makeFetch(bookingHtml);
    const result = await enrichAccommodation({ name: 'Beach Hotel', website: null }, fetchFn);
    expect(result.instagramHandle).toBeNull();
    expect(result.nightlyPrice).toBe(60);
  });

  it('handles Booking.com fallback error — returns partial result without throwing', async () => {
    const primaryHtml = '<a href="https://instagram.com/cozyplace">IG</a>';
    const fetchFn = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve(primaryHtml) })
      .mockRejectedValueOnce(new Error('booking down'));
    const result = await enrichAccommodation({ name: 'Cozy Place', website: 'https://cozy.com' }, fetchFn);
    expect(result.instagramHandle).toBe('cozyplace');
    expect(result.nightlyPrice).toBeNull();
  });
});
