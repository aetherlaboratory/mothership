const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

function normalizeImage(path) {
  if (!path) return ''
  return path.startsWith('http') ? path : `${baseUrl}${path}`
}


export default async function loadMenuWithFallback() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_WP}/custom/v1/foodmenu`, {
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
    console.error('Error loading food menu:', error)
    return normalizeDummyData()
  }
}

// Normalizes dummy JSON entries
import dummyData from '../../public/dummy-data/menuDummyData.json'

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
