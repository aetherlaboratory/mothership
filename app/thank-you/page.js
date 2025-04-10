'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  BadgeCheck,
  CalendarCheck,
  PackageCheck,
  MailCheck,
  Info,
  UserCheck,
  Lock
} from 'lucide-react'
import axios from 'axios'

export default function ThankYouPage() {
  const params = useSearchParams()
  const type = params.get('type')
  const plan = params.get('plan')
  const [message, setMessage] = useState(null)
  const [product, setProduct] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ✅ Check if user is logged in via localStorage
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) setIsLoggedIn(true)
  }, [])

  // ✅ Fetch matching WooCommerce subscription product
  useEffect(() => {
    const fetchProduct = async () => {
      if (!plan || type !== 'subscription') return
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/custom/v1/subscription-products`)
        const match = res.data.find(p =>
          p.name.toLowerCase().includes(plan.replace('-', ' '))
        )
        setProduct(match)
      } catch (err) {
        console.error('❌ Failed to fetch subscription product:', err)
      }
    }

    fetchProduct()
  }, [plan, type])

  // ✅ Set dynamic message based on `type`
  useEffect(() => {
    switch (type) {
      case 'subscription':
        setMessage({
          icon: <BadgeCheck className="w-10 h-10 text-green-500 mb-2" />,
          title: 'Subscription Confirmed',
          subtitle: plan ? `You're now subscribed to the ${plan.replace('-', ' ')} plan.` : 'Subscription Active!',
          detail: 'Access to subscriber features is now unlocked. Check your email for confirmation.'
        })
        break

      case 'download':
        setMessage({
          icon: <CalendarCheck className="w-10 h-10 text-blue-500 mb-2" />,
          title: 'Download Ready',
          subtitle: 'Your download is complete.',
          detail: 'You can now access your digital file. Check your dashboard or email for the link.'
        })
        break

      case 'order':
        setMessage({
          icon: <PackageCheck className="w-10 h-10 text-purple-500 mb-2" />,
          title: 'Order Confirmed',
          subtitle: 'Thank you for your purchase!',
          detail: 'We’re preparing your shipment. You’ll receive tracking info soon.'
        })
        break

      case 'newsletter':
        setMessage({
          icon: <MailCheck className="w-10 h-10 text-amber-500 mb-2" />,
          title: 'Newsletter Subscribed',
          subtitle: 'Welcome to the Mothership newsletter!',
          detail: 'We’ll only send you updates you care about. You can manage preferences anytime.'
        })
        break

      default:
        setMessage({
          icon: <Info className="w-10 h-10 text-gray-400 mb-2" />,
          title: 'Thank You!',
          subtitle: 'Your action was completed successfully.',
          detail: 'You can now return to the homepage or explore other sections.'
        })
    }
  }, [type, plan])

  return (
    <main className="flex flex-col justify-center items-center min-h-screen px-6 text-center">
      {message && (
        <div className="max-w-md w-full bg-white p-8 border rounded-lg shadow-md">
          {message.icon}
          <h1 className="text-3xl font-bold mb-2">{message.title}</h1>
          <p className="text-lg text-gray-700 mb-1">{message.subtitle}</p>
          <p className="text-sm text-gray-500 mb-6">{message.detail}</p>

          {/* ✅ Subscription summary if product data is found */}
          {type === 'subscription' && product && (
            <div className="border-t pt-4 mt-4 text-left text-sm text-gray-700 space-y-2">
              <p><strong>Plan:</strong> {product.name}</p>
              <p><strong>Price:</strong> <span dangerouslySetInnerHTML={{ __html: product.price_html }} /></p>
              <ul className="list-disc list-inside text-xs mt-2 text-gray-600">
                {plan === 'free' && (
                  <>
                    <li>Browse public content</li>
                    <li>Limited downloads</li>
                  </>
                )}
                {plan === 'monthly' && (
                  <>
                    <li>Unlimited access</li>
                    <li>Cancel anytime</li>
                    <li>Monthly bonuses</li>
                  </>
                )}
                {plan === 'annual' && (
                  <>
                    <li>Best value plan</li>
                    <li>Yearly exclusive perks</li>
                  </>
                )}
                {plan === 'flat-fee' && (
                  <>
                    <li>Lifetime access</li>
                    <li>No renewals ever</li>
                  </>
                )}
              </ul>
            </div>
          )}

          {/* ✅ Footer CTA */}
          <div className="mt-6">
            {isLoggedIn ? (
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                <UserCheck size={18} /> Go to Dashboard
              </a>
            ) : (
              <a
                href="/login"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                <Lock size={18} /> Login to Access
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
