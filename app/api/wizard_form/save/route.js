// app/api/wizard_form/save/route.js

import axios from 'axios'

export async function POST(request) {
  const body = await request.json()
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/custom/v1/save-form`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return new Response(JSON.stringify(res.data), { status: 200 })
  } catch (err) {
    console.error('❌ Error saving wizard form:', err?.response?.data || err.message)
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 })
  }
}
