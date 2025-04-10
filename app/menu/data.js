// app/menu/data.js

// Fetches foodmenu posts from the custom REST API endpoint
export default async function fetchMenuData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_WP}/custom/v1/foodmenu`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('Failed to fetch food menu data')
      return []
    }

    const data = await res.json()

    // Normalize each post to include required fields
    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      featuredImage: post.featured_image || '',
      price: post.price || '',
      prepTime: post.prep_time || '',
      steps: post.food_steps || [],
      gallery: post.food_gallery || [],
      categories: post.categories || [], // Assumes your WP exposes categories array
    }))
  } catch (error) {
    console.error('Error fetching food menu:', error)
    return []
  }
}
