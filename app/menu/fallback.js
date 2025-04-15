'use client'

import dummyData from '../../public/dummy-data/menuDummyData.json'

// ✅ Determine how the app is being accessed
function getEnvironmentHost() {
  if (typeof window === 'undefined') return 'localhost'
  return window.location.hostname
}

// ✅ Determine app’s local frontend base for relative image normalization
function getBaseUrl() {
  const host = getEnvironmentHost()
  if (host.startsWith('192.168.')) return 'http://192.168.1.185:3000'
  return 'http://localhost:3000'
}

// ✅ Normalize images from dummy or custom post meta
function normalizeImage(path) {
  if (!path) return ''
  return path.startsWith('http') ? path : `${getBaseUrl()}${path}`
}

// ✅ Main data loader for foodmenu content
export default async function loadMenuWithFallback() {
  try {
    // ✅ Always use actual WordPress API for foodmenu content
    const wpApiBase = 'https://mothership.wordifysites.com/wp-json'

    const res = await fetch(`${wpApiBase}/custom/v1/foodmenu`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      console.warn('WordPress fetch failed. Using dummy data.')
      return normalizeDummyData()
    }

    const data = await res.json()

    if (!Array.isArray(data) || data.length === 0) {
      console.info('No WordPress foodmenu posts found. Using dummy data.')
      return normalizeDummyData()
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      featuredImage: normalizeImage(post.featuredImage || post.featured_image),
      price: post.price || '',
      prepTime: post.prepTime || post.prep_time || '',
      steps: post.steps || post.food_steps || [],
      gallery: Array.isArray(post.gallery || post.food_gallery)
        ? (post.gallery || post.food_gallery).map(normalizeImage)
        : [],
      categories: post.categories || [],
    }))
  } catch (error) {
    console.error('❌ Error loading food menu:', error)
    return normalizeDummyData()
  }
}

// ✅ Normalizes dummy data if WP fetch fails
function normalizeDummyData() {
  return dummyData.map(item => ({
    id: item.id,
    title: item.title,
    content: item.content,
    featuredImage: normalizeImage(item.featuredImage || item.featured_image),
    price: item.price || '',
    prepTime: item.prepTime || item.prep_time || '',
    steps: item.steps || item.food_steps || [],
    gallery: Array.isArray(item.gallery || item.food_gallery)
      ? (item.gallery || item.food_gallery).map(normalizeImage)
      : [],
    categories: item.categories || [],
  }))
}
