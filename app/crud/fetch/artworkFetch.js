'use server'

// ==============================
// /app/crud/fetch/artworkFetch.js
// Handles GET and PUT requests to WordPress REST API for artwork posts
// ==============================
const API_URL = process.env.NEXT_PUBLIC_API_WP;


// Fetch all artwork posts
export async function fetchArtworks() {
  const res = await fetch(`${API_URL}/wp/v2/2dart?per_page=20`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
}

// Fetch a single artwork post by ID
export async function fetchArtwork(id) {
  const res = await fetch(`${API_URL}/wp/v2/2dart/${id}`);
  if (!res.ok) throw new Error('Failed to fetch single post');
  return await res.json();
}

// Update a artwork post using JWT token
export async function updateArtwork(id, data, token) {
  const res = await fetch(`${API_URL}/wp/v2/2dart/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update post');
  return await res.json();
}
