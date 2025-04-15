'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useFoodOrders } from '@/app/context/FoodOrderContext'
import updateCashtag from '@/app/utils/updateCashtag'

const PayPalButton = dynamic(() => import('@/app/components/PayPalButton'), { ssr: false })

export default function FoodOrderCheckout() {
  const { orders, clearOrders } = useFoodOrders()
  const [cashtag, setCashtag] = useState('')
  const [qrImage, setQrImage] = useState(null)
  const [showCashApp, setShowCashApp] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const tag = localStorage.getItem('cashtag')
    const qr = localStorage.getItem('qrPreviewURL')
    if (tag) setCashtag(tag)
    setQrImage(qr || '/barcode-gvixart.png')
  }, [])

  if (!hasMounted) return null

  const foodTotal = orders.reduce((sum, item) => sum + parseFloat(item.price || 0), 0)

  const handleStripeCheckout = async () => {
    const cartData = {
      timestamp: new Date().toISOString(),
      method: 'Stripe',
      items: orders.map((item) => ({
        name: item.title,
        price: parseFloat(item.price),
        quantity: 1,
      })),
      total: foodTotal,
    }

    localStorage.setItem('lastStripeFoodOrder', JSON.stringify(cartData))

    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartData.items,
        origin: window.location.origin,
      }),
    })

    const data = await res.json()
    if (data?.url) {
      window.location.href = data.url
    } else {
      alert('Stripe checkout failed.')
    }
  }

  const handleCashAppConfirm = async () => {
    if (!cashtag.trim()) {
      window.dispatchEvent(new CustomEvent("notify", {
        detail: { message: "❌ Please enter your Cash App $username.", type: "error" }
      }))
      return
    }

    localStorage.setItem('cashtag', cashtag)

    const result = await updateCashtag(cashtag)
    console.log("📦 updateCashtag result:", result)

    const orderData = {
      timestamp: new Date().toISOString(),
      method: 'CashApp',
      cashtag,
      items: orders,
      total: foodTotal,
    }

    localStorage.setItem('pendingFoodOrder', JSON.stringify(orderData))

    window.dispatchEvent(new CustomEvent("notify", {
      detail: { message: "✅ Food order marked as paid via Cash App", type: "success" }
    }))

    clearOrders()
    window.location.href = '/checkout-pending-confirmation'
  }

  if (orders.length === 0) {
    return <p className="text-center mt-10 text-lg">🍽️ No food items in your order.</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Food Order Checkout</h2>

      {/* 🧾 Order Summary */}
      <ul className="divide-y divide-gray-200 mb-4">
        {orders.map(item => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.title}</span>
            <span>${parseFloat(item.price).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="text-right font-semibold text-lg mb-6">
        Total: ${foodTotal.toFixed(2)}
      </div>

      {/* 💳 Stripe Checkout – Styled with Logo */}
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

      {/* 🅿️ PayPal */}
      <div className="mb-4">
        <PayPalButton total={foodTotal} items={orders} />
      </div>

      {/* 💸 Cash App Button */}
      <button
        onClick={() => setShowCashApp(!showCashApp)}
        className="w-full bg-green-400 text-white rounded hover:bg-green-600 transition mb-4"
      >
        <div className="flex justify-center py-3">
          <Image src="/cashapp.svg" alt="Cash App" width={150} height={33} priority />
        </div>
      </button>

      {showCashApp && (
        <div className="p-4 border rounded-md shadow-sm">
          <h3 className="text-lg font-semibold mb-2">💵 Pay with Cash App</h3>

          <div className="flex items-center">
            <p className="text-gray-700 mb-1 mr-2">Send to:</p>
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

          <div className="mb-4 mt-4">
            <label htmlFor="cashtag" className="block text-sm font-medium text-gray-700">
              Enter your $Cashtag
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

          <p className="text-gray-700 text-center py-4 mb-1">
            Confirm your payment to finish.
          </p>

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
