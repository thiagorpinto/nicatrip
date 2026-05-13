function extractInstagram(html) {
  const patterns = [
    /instagram\.com\/([A-Za-z0-9_\.]+)/g,
  ];
  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    const match = pattern.exec(html);
    if (match) {
      const handle = match[1].replace(/\/$/, '');
      if (handle && handle !== 'p' && handle !== 'reel' && handle !== 'explore') {
        return handle;
      }
    }
  }
  return null;
}

function extractPrice(html) {
  const patterns = [
    /\$\s*(\d+(?:\.\d+)?)(?:\/night)?/i,
    /USD\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*USD/i,
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(html);
    if (match) {
      return Number(match[1]);
    }
  }
  return null;
}

export async function enrichAccommodation(placeRecord, fetchFn = fetch) {
  let instagramHandle = null;
  let nightlyPrice = null;

  if (placeRecord.website) {
    let html;
    try {
      const res = await fetchFn(placeRecord.website);
      html = await res.text();
    } catch (err) {
      console.warn('accommodation-enricher: primary fetch failed', err);
      return {};
    }
    instagramHandle = extractInstagram(html);
    nightlyPrice = extractPrice(html);
  }

  if (nightlyPrice === null) {
    const bookingUrl = `https://www.booking.com/search.html?ss=${encodeURIComponent(placeRecord.name)}`;
    try {
      const res = await fetchFn(bookingUrl);
      const html = await res.text();
      nightlyPrice = extractPrice(html);
    } catch (err) {
      console.warn('accommodation-enricher: booking.com fallback fetch failed', err);
      return { instagramHandle, nightlyPrice: null };
    }
  }

  return { instagramHandle, nightlyPrice };
}
