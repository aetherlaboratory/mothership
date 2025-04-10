// app/api/login/route.js
import axios from 'axios'

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/jwt-auth/v1/token`,
      { username, password }
    )

    const { token, user_email, user_nicename, user_display_name } = response.data

    return new Response(JSON.stringify({
      success: true,
      token,
      user: {
        email: user_email,
        nicename: user_nicename,
        displayName: user_display_name
      }
    }), { status: 200 })
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message)

    return new Response(JSON.stringify({
      success: false,
      message: error.response?.data?.message || 'Login failed'
    }), { status: 401 })
  }
}
