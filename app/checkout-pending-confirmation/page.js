"use client";

import { useEffect, useState } from "react";

const CheckoutConfirmationPage = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Pull from whichever method stored the order
    const data =
      JSON.parse(localStorage.getItem("pendingCashAppOrder")) ||
      JSON.parse(localStorage.getItem("lastPayPalOrder")) ||
      JSON.parse(localStorage.getItem("lastStripeOrder"));

    if (data) {
      setOrderData(data);
      // Optionally: clear cart after confirming
      localStorage.removeItem("pendingCashAppOrder");
      localStorage.removeItem("lastPayPalOrder");
      localStorage.removeItem("lastStripeOrder");
    }
  }, []);

  if (!orderData) {
    return <p className="text-center mt-10 text-lg">🔄 Loading order details...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">🎉 Thank you for your order!</h2>

      <p className="text-gray-600 mb-2">
        Order #: <strong>{generateOrderNumber(orderData.timestamp)}</strong>
      </p>

      <p className="text-gray-700 mb-6">
        We've received your payment via <strong>{orderData.method}</strong>.
      </p>

      <div className="text-left">
        <h3 className="text-lg font-semibold mb-2">🧾 Items Ordered:</h3>
        <ul className="mb-4">
          {orderData.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <p className="text-right font-bold">Total: ${orderData.total.toFixed(2)}</p>
      </div>

      <button
        onClick={() => (window.location.href = "/products")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        🛍️ Continue Shopping
      </button>
    </div>
  );
};

// 🔢 Generates a pseudo Order ID from timestamp
function generateOrderNumber(timestamp) {
  return "ORD-" + timestamp.replace(/\D/g, "").slice(0, 12);
}

export default CheckoutConfirmationPage;
