// utils/getSubscriptionProducts.js

export async function getSubscriptionProducts() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}/wp-json/wc/v3/products?tag=subscription-plan&per_page=10`,
        {
          headers: {
            Authorization: `Basic ${btoa(
              `${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}:${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
            )}`
          }
        }
      )
  
      if (!res.ok) throw new Error('Failed to fetch subscription products')
  
      const products = await res.json()
  
      return products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.images?.[0]?.src || null
      }))
    } catch (err) {
      console.error('Error loading subscription products:', err)
      return []
    }
  }
  