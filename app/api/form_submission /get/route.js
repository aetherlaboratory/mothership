// app/api/form_submission/get/route.js

import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/custom/v1/submissions`)
    return NextResponse.json(res.data)
  } catch (err) {
    console.error('❌ Error fetching submissions:', err?.response?.data || err.message)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
