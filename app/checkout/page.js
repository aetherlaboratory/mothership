'use client'

//app/checkout/page.js

import { useCart } from 'react-use-cart'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import  updateCashtag  from '../utils/updateCashtag' // ✅ Corrected named import

const PayPalButton = dynamic(() => import('../components/PayPalButton'), { ssr: false })

const CheckoutPage = () => {
  const { items, cartTotal, isEmpty } = useCart()
  const [cashAppConfirmed, setCashAppConfirmed] = useState(false)
  const [cashtag, setCashtag] = useState('')
  const [qrImage, setQrImage] = useState(null)
  const [showCashApp, setShowCashApp] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const tag = localStorage.getItem('cashtag')
    const qr = localStorage.getItem('qrPreviewURL')
    if (tag) setCashtag(tag)

    // ✅ Always have fallback QR if one is not in localStorage
    if (qr) setQrImage(qr)
    else setQrImage('/barcode-gvixart.png')
  }, [])

  if (!hasMounted) return null

  // ✅ Check if the cart contains a subscription
  const isSubscription = items.some(item =>
    item.tags?.includes('subscription-plan') || item.name.toLowerCase().includes('subscription')
  )

  // ✅ Return plan name as URL slug (e.g. "Monthly Plan" → "monthly-plan")
  const getPlanSlug = () => {
    const selectedPlan = items.find(item =>
      item.tags?.includes('subscription-plan') || item.name.toLowerCase().includes('subscription')
    )
    return selectedPlan?.name?.toLowerCase().replace(/\s+/g, '-')
  }

  const handleCashAppConfirm = async () => {
    if (!cashtag.trim()) {
      // 🛑 Require cashtag input
      window.dispatchEvent(new CustomEvent("notify", {
        detail: {
          message: "❌ Please enter your Cash App $username before confirming.",
          type: "error",
        },
      }))
      return
    }

    localStorage.setItem('cashtag', cashtag)

    // ✅ Call utility to save to WordPress user meta
    const result = await updateCashtag(cashtag)
    console.log("📦 updateCashtag result:", result)

    const cartData = {
      timestamp: new Date().toISOString(),
      method: 'CashApp',
      cashtag,
      items,
      total: cartTotal
    }

    // 💾 Save locally so admin can approve later
    localStorage.setItem('pendingCashAppOrder', JSON.stringify(cartData))

    window.dispatchEvent(new CustomEvent('notify', {
      detail: {
        message: `🟢 Marked as paid via Cash App: ${cashtag}`,
        type: 'success'
      }
    }))

    setCashAppConfirmed(true)

    // 🔁 Redirect depending on if it's a subscription
    if (isSubscription) {
      const slug = getPlanSlug()
      window.location.href = `/thank-you?type=subscription&plan=${slug}`
    } else {
      window.location.href = '/checkout-pending-confirmation'
    }
  }

  const handleStripeCheckout = async () => {
    const cartData = {
      timestamp: new Date().toISOString(),
      method: 'Stripe',
      items,
      total: cartTotal
    }

    localStorage.setItem('lastStripeOrder', JSON.stringify(cartData))

    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        origin: window.location.origin
      })
    })

    const data = await res.json()
    if (data?.url) {
      if (isSubscription) {
        const slug = getPlanSlug()
        window.location.href = `/thank-you?type=subscription&plan=${slug}`
      } else {
        window.location.href = data.url
      }
    } else {
      alert('Stripe checkout failed.')
    }
  }

  if (isEmpty) {
    return <p className="text-center mt-10 text-lg">🛒 Your cart is empty.</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>

      {/* 🛒 Cart Summary */}
      <ul className="divide-y divide-gray-200 mb-4">
        {items.map(item => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="text-right font-semibold text-lg mb-6">
        Total: ${cartTotal.toFixed(2)}
      </div>

      {/* 💳 Stripe Checkout */}
      <button
        onClick={handleStripeCheckout}
        className="w-full bg-gray-200 text-white py-3 rounded hover:bg-gray-400 transition mb-4"
      >
        <span className="text-black">Pay with Credit Card via</span>
        <Image
          src="/stripe.svg"
          alt="Stripe"
          width={75}
          height={31}
          className="mx-auto"
          priority
        />
      </button>

      {/* 🅿️ PayPal + Venmo */}
      <div className="mb-4">
        <PayPalButton total={cartTotal} items={items} />
      </div>

      {/* 💸 Cash App Button */}
      <button
        onClick={() => setShowCashApp(!showCashApp)}
        className="w-full bg-green-400 text-white rounded hover:bg-green-600 transition mb-4"
      >
        <div className="flex justify-center py-3">
          <Image
            src="/cashapp.svg"
            alt="Cash App"
            width={150}
            height={33}
            priority
          />
        </div>
      </button>

      {/* 🧾 Cash App Section */}
      {showCashApp && (
        <div className="p-4 border rounded-md shadow-sm">
          <h3 className="text-lg font-semibold mb-2">💵 Pay with Cash App</h3>

          <div className="flex items-center">
            <p className="text-gray-700 mb-1 mr-2">Send payment to:</p>
            <p className="text-lg font-mono bg-gray-100 px-3 py-1 inline-block rounded mb-2">
              $YourCashtag
            </p>
          </div>

          {qrImage && (
            <Image
              src={qrImage}
              alt="Cash App QR"
              width={400}
              height={300}
              className="bg-white p-5 mx-auto rounded-lg shadow-md"
              priority
            />
          )}

          {/* 💬 Cashtag Input */}
          <div className="mb-4 mt-4">
            <label htmlFor="cashtag" className="block text-sm font-medium text-gray-700">
              Now Enter Your Cash App $Username to verify:
            </label>
            <input
              type="text"
              id="cashtag"
              className="w-full mt-1 p-2 border rounded"
              placeholder="$yourcashtag"
              value={cashtag}
              onChange={(e) => setCashtag(e.target.value)}
              required
            />
          </div>

          <p className="text-gray-700 text-center py-5 mb-1">
            Then press the button below to confirm.
          </p>

          {/* ✅ Cash App Confirmation */}
          <button
            onClick={handleCashAppConfirm}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            ✅ I Paid with Cash App
          </button>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
