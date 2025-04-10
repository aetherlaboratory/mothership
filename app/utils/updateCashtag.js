import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const { cashtag } = req.body
  const token = req.headers.authorization?.split(' ')[1]

  if (!token || !cashtag) return res.status(400).json({ error: 'Missing token or cashtag' })

  try {
    const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users/me?context=edit`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user = userRes.data
    if (!user) throw new Error('User not found')

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

    res.status(200).json({ message: 'Cashtag saved successfully' })
  } catch (err) {
    console.error('❌ Cashtag update failed:', err.message)
    res.status(500).json({ error: 'Failed to save cashtag' })
  }
}
