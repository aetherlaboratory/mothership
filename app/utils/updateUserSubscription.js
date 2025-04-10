import axios from 'axios'

// ✅ Plan to Rank Map
const PLAN_RANKS = {
  'Free Tier': 1,
  'Flat Fee Tier': 2,
  'Monthly Tier': 3,
  'Annual Tier': 4
}

/**
 * 🔁 Push subscription metadata to WordPress user
 * @param {string} email - WordPress user email
 * @param {string} planName - Product name (e.g. "Monthly Tier")
 */
export const updateUserSubscription = async (email, planName) => {
  const purchaseDate = new Date().toISOString()
  const rank = PLAN_RANKS[planName] || 1

  try {
    // 1️⃣ Admin Auth
    const authRes = await axios.post(`${process.env.NEXT_PUBLIC_API_WP}/jwt-auth/v1/token`, {
      username: process.env.NEXT_PUBLIC_WP_ADMIN_USERNAME,
      password: process.env.NEXT_PUBLIC_WP_ADMIN_PASSWORD
    })

    const token = authRes.data.token

    // 2️⃣ Find User by Email
    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users?search=${email}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    const user = userRes.data?.[0]
    if (!user) throw new Error('User not found')

    // 3️⃣ Update Meta + Role
    const updateRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users/${user.id}`,
      {
        roles: ['subscribed'], // ✅ Custom role must already exist
        meta: {
          _subscription_plan_name: planName,
          _subscription_rank: rank,
          _subscription_last_purchase: purchaseDate
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(`✅ Subscription updated for ${email}: ${planName} / Rank ${rank}`)
    return true
  } catch (err) {
    console.error('❌ Subscription update failed:', err.response?.data || err.message)
    return false
  }
}
