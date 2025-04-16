import axios from 'axios'

export default async function getAllFoodOrders(token) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/custom/v1/food-orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return { success: true, data: res.data }
  } catch (error) {
    console.error('❌ Failed to fetch food orders:', error)
    return { success: false, error: error.message }
  }
}
