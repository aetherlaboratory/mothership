// /app/api/user/update-cashtag/route.js

import axios from 'axios'

export async function POST(req) {
  try {
    // 🔓 Parse incoming data
    const { cashtag } = await req.json()
    const token = req.headers.get('authorization')?.replace('Bearer ', '')

    if (!cashtag || !token) {
      return new Response(JSON.stringify({ error: 'Missing cashtag or token' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 🔍 Get user data using token
    const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users/me?context=edit`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user = userRes.data
    if (!user?.id) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 💾 Save cashtag to WP user meta
    await axios.post(`${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users/${user.id}`, {
      meta: {
        cashapp_cashtag: cashtag
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return new Response(JSON.stringify({ message: 'Cashtag saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('❌ Error saving cashtag:', error.message)
    return new Response(JSON.stringify({ error: 'Failed to save cashtag' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
