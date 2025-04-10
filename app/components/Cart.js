"use client";

import { useCart } from "react-use-cart";
import { useRouter } from "next/navigation"; // ✅ For routing

const Cart = () => {
  const { isEmpty, items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const router = useRouter();

  const saveDeletedCart = () => {
    if (items.length > 0) {
      const previousCarts = JSON.parse(localStorage.getItem("cartHistory")) || [];
      const newCart = {
        timestamp: new Date().toISOString(),
        items: [...items],
      };
      previousCarts.push(newCart);
      localStorage.setItem("cartHistory", JSON.stringify(previousCarts));
      console.log("✅ Cart saved to history:", previousCarts);
    }
  };

  const forceRefresh = () => {
    console.log("🔄 Refreshing page to update cart...");
    window.location.reload();
  };

  if (isEmpty) return <p className="text-center text-lg">🛒 Your cart is empty.</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Shopping Cart</h2>

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-4">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">${item.price} x {item.quantity}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  updateItemQuantity(item.id, item.quantity + 1);
                  forceRefresh();
                }}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                ➕
              </button>

              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    updateItemQuantity(item.id, item.quantity - 1);
                  } else {
                    removeItem(item.id);
                  }
                  forceRefresh();
                }}
                className="px-2 py-1 bg-yellow-500 text-white rounded mx-2"
              >
                ➖
              </button>

              <button
                onClick={() => {
                  removeItem(item.id);
                  forceRefresh();
                }}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Checkout Button */}
      <button
        onClick={() => router.push("/checkout")}
        className="w-full bg-purple-600 text-white p-2 mt-4 rounded hover:bg-purple-700 transition"
      >
        🛒 Proceed to Checkout
      </button>

      {/* Clear Cart */}
      <button
        onClick={() => {
          saveDeletedCart();
          emptyCart();
          forceRefresh();
        }}
        className="w-full bg-blue-600 text-white p-2 mt-4 rounded"
      >
        🗑️ Clear Cart (Save to History)
      </button>
    </div>
  );
};

export default Cart;
