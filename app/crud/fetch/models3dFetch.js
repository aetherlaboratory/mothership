'use server'

// ==============================
// /app/crud/fetch/models3dFetch.js
// Handles GET and PUT requests to WordPress REST API for models3d posts
// ==============================
const API_URL = process.env.NEXT_PUBLIC_API_WP;


// Fetch all models3d posts
export async function fetch3ds() {
  const res = await fetch(`${API_URL}/wp/v2/3dart?per_page=20`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
}

// Fetch a single models3d post by ID
export async function fetch3d(id) {
  const res = await fetch(`${API_URL}/wp/v2/3dart/${id}`);
  if (!res.ok) throw new Error('Failed to fetch single post');
  return await res.json();
}

// Update a models3d post using JWT token
export async function update3d(id, data, token) {
  const res = await fetch(`${API_URL}/wp/v2/3dart/${id}`, {
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
