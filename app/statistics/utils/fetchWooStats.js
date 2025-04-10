// Central utility to fetch WooCommerce + WordPress stats
// All requests go through internal API routes to bypass CORS and secure credentials

// Get total user count from internal API
export async function getUserCount() {
    const res = await fetch('/api/statistics/users')
    const data = await res.json()
    return data.total || 0
  }
  
  // Get total product count from internal API
  export async function getProductCount() {
    const res = await fetch('/api/statistics/products')
    const data = await res.json()
    return data.total || 0
  }
  
  // Get total order count from internal API
  export async function getOrderCount() {
    const res = await fetch('/api/statistics/orders')
    const data = await res.json()
    return data.total || 0
  }
  
  // Get total revenue from internal API
  export async function getTotalRevenue() {
    const res = await fetch('/api/statistics/revenue')
    const data = await res.json()
    return data.total || 0
  }
  
  // Get daily sales for the last 7 days from internal API
  export async function getSalesLast7Days() {
    const res = await fetch('/api/statistics/sales')
    const data = await res.json()
    return data || []
  }
  
  // Get top-selling products (default 5) from internal API
  export async function getTopSellingProducts(limit = 5) {
    const res = await fetch(`/api/statistics/top-products?limit=${limit}`)
    const data = await res.json()
    return data || []
  }
  