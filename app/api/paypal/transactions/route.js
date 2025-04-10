import axios from 'axios'

export async function GET() {
  try {
    console.log('🌐 Requesting PayPal OAuth token...')

    const authRes = await axios({
      method: 'post',
      url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      data: 'grant_type=client_credentials',
    })

    const accessToken = authRes.data.access_token
    console.log('✅ PayPal token received:', accessToken ? 'Yes' : 'No')

    const endDate = new Date().toISOString()
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    console.log(`📆 Fetching transactions from ${startDate} to ${endDate}`)

    const txRes = await axios.get(
      `https://api-m.sandbox.paypal.com/v1/reporting/transactions?start_date=${startDate}&end_date=${endDate}&fields=all&page_size=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('📦 PayPal transactions received:', txRes.data?.transaction_details?.length)

    return new Response(JSON.stringify(txRes.data.transaction_details || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('❌ PAYPAL ROUTE ERROR:', err?.response?.data || err.message)
    return new Response(JSON.stringify({
      error: err?.response?.data || err.message,
      detail: 'OAuth or Transaction Fetch Failed',
    }), {
      status: 500,
    })
  }
}
