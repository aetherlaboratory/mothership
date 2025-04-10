'use client'

import { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import axios from 'axios'
import {
  BadgeCheck,
  Gem,
  Calendar,
  Crown
} from 'lucide-react'

// ✅ Define tier details
const tierMapping = {
  free: {
    keyword: 'free',
    icon: <BadgeCheck className="h-10 w-10 text-green-500 mx-auto mb-2" />,
    buttonText: 'Continue Free',
    features: [
      'Browse all public content',
      'Access limited product downloads',
      'No credit card required'
    ]
  },
  'flat-fee': {
    keyword: 'flat',
    icon: <Gem className="h-10 w-10 text-purple-500 mx-auto mb-2" />,
    buttonText: 'Unlock Forever',
    features: [
      'Lifetime access to all content',
      'Download full libraries',
      'Early access to new features'
    ]
  },
  monthly: {
    keyword: 'monthly',
    icon: <Calendar className="h-10 w-10 text-blue-500 mx-auto mb-2" />,
    buttonText: 'Start Monthly',
    features: [
      'Unlimited streaming and downloads',
      'Cancel anytime',
      'Bonus monthly perks and coupons'
    ]
  },
  annual: {
    keyword: 'annual',
    icon: <Crown className="h-10 w-10 text-yellow-500 mx-auto mb-2" />,
    buttonText: 'Start Annual',
    features: [
      'Best value subscription',
      '12 months of premium access',
      'Exclusive yearly-only perks'
    ]
  }
}

export default function SubscriptionsPage() {
  const { emptyCart, addItem } = useCart()
  const [products, setProducts] = useState([])

  // ✅ Fetch from custom WP endpoint
  useEffect(() => {
    const fetchSubscriptionProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_WP}/custom/v1/subscription-products`
        )
        console.log('📦 Subscription products from custom API:', res.data)
        setProducts(res.data)
      } catch (err) {
        console.error('❌ Failed to fetch subscription products:', err)
      }
    }

    fetchSubscriptionProducts()
  }, [])

  // ✅ Match Woo products to tier slugs via name keywords
  const matchedTiers = Object.entries(tierMapping)
    .map(([slug, config]) => {
      const product = products.find(p =>
        p.name.toLowerCase().includes(config.keyword)
      )
      if (!product) return null
      return { slug, product, ...config }
    })
    .filter(Boolean)

  // ✅ Add to cart + notify + redirect
  const handleAddSubscription = (tier) => {
    emptyCart()
    addItem({
      id: tier.product.id,
      name: tier.product.name,
      price: parseFloat(tier.product.price),
      quantity: 1,
      customData: { isSubscription: true }
    })

    // ✅ Notify user
    window.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          message: `🛒 ${tier.product.name} selected! Redirecting to checkout...`,
          type: 'success'
        }
      })
    )

    // ✅ Redirect to registration flow
    setTimeout(() => {
      window.location.href = `/subscription-register?plan=${tier.slug}`
    }, 1000)
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-gray-600">
          Whether you're just browsing or ready to unlock everything, pick the subscription that works best for you.
          Upgrade anytime. No hidden fees, just straightforward access.
        </p>
      </section>

      {/* Dynamic Pricing Cards */}
      <section
        className={`grid gap-6 ${
          matchedTiers.length === 1
            ? 'grid-cols-1'
            : matchedTiers.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : matchedTiers.length === 3
            ? 'grid-cols-1 md:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {matchedTiers.map((tier, index) => (
          <div key={index} className="border rounded-lg shadow-lg flex flex-col justify-between bg-white overflow-hidden">
            {/* Card Header with Slanted Bottom */}
            <div
              className="bg-gray-900 text-white text-center p-6 relative"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
            >
              {tier.icon}
              <h2 className="text-2xl font-semibold mb-2 text-gray-100">{tier.product.name}</h2>
              <div
                className="text-3xl font-bold text-blue-400"
                dangerouslySetInnerHTML={{ __html: tier.product.price_html }}
              />
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <ul className="mb-6 space-y-2 text-gray-700">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>✔️</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleAddSubscription(tier)}
                className="mt-auto inline-block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {tier.buttonText}
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
