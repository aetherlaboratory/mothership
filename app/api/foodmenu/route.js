import axios from 'axios'

export async function GET() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_WP}/custom/v1/foodmenu`

    console.log("🍽️ Fetching food menu from:", url)

    const response = await axios.get(url)

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error("❌ Food Menu API Error:", {
      message: error.message,
      data: error.response?.data,
    })

    return new Response(
      JSON.stringify({
        error: error.response?.data || error.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
