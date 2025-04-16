import axios from 'axios'

export default async function submitFoodOrder({ user, orders, allergy, notes, method = 'CashApp', paid = false }) {
  try {
    const token = localStorage.getItem('userToken')

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/custom/v1/submit-food-order`,
      {
        user_name: user?.name || user?.username || 'Unknown',
        user_email: user?.email || '',
        items: orders,
        method,
        paid,
        total: orders.reduce((sum, item) => sum + parseFloat(item.price || 0), 0),
        allergy_note: allergy,
        notes
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return { success: true, data: response.data }
  } catch (error) {
    console.error('❌ submitFoodOrder failed:', error)
    return {
      success: false,
      error: error.response?.data?.message || error.message
    }
  }
}
