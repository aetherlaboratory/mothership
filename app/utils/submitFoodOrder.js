import axios from 'axios'

// ✅ Submits food order to a custom WP REST route (to be created in PHP)
export default async function submitFoodOrder({ user, orders, allergy }) {
  try {
    const token = localStorage.getItem('userToken')

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/custom/v1/submit-food-order`,
      {
        user_id: user.id,
        user_email: user.email,
        orders,
        allergy_note: allergy,
        submitted_at: new Date().toISOString()
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
    console.error("❌ Error submitting food order:", error)
    return {
      success: false,
      error: error.response?.data?.message || error.message
    }
  }
}
