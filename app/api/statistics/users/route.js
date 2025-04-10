// Server-side proxy to fetch user count from WordPress
export async function GET() {
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_WP_USERNAME}:${process.env.NEXT_PUBLIC_WP_APP_PASSWORD}`
    ).toString('base64')
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users?per_page=1`,
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    )
  
    const total = res.headers.get('X-WP-Total')
    return Response.json({ total: parseInt(total || '0') })
  }
  