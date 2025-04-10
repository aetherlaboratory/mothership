'use client';

export async function fetchWordPressTracks() {
  try {
    const base = process.env.NEXT_PUBLIC_API_WP;
    const endpoint = `${base}/custom/v1/audio-tracks`;
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    const cleaned = data.map((track) => ({
      id: track.id,
      title: track.title || 'Untitled',
      artist: track.artist || 'Unknown Artist',
      album: track.album || 'Unknown Album',
      url: track.url,
      cover_art_url: track.cover_art_url || '',
    }));

    if (process.env.NODE_ENV === 'development') {
      console.log('🎧 Fetched Tracks:', cleaned);
    }

    return cleaned;
  } catch (err) {
    console.error('❌ Failed to fetch WordPress audio tracks:', err);
    return [];
  }
}
