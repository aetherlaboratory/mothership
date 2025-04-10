'use server'

// ==============================
// /app/crud/fetch/audioFetch.js
// Handles GET and PUT requests to WordPress REST API for audio posts
// ==============================
const API_URL = process.env.NEXT_PUBLIC_API_WP;


// Fetch all audio posts
export async function fetchAudios() {
  const res = await fetch(`${API_URL}/wp/v2/audio?per_page=20`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
}

// Fetch a single audio post by ID
export async function fetchAudio(id) {
  const res = await fetch(`${API_URL}/wp/v2/audio/${id}`);
  if (!res.ok) throw new Error('Failed to fetch single post');
  return await res.json();
}

// Update a audio post using JWT token
export async function updateAudio(id, data, token) {
  const res = await fetch(`${API_URL}/wp/v2/audio/${id}`, {
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
