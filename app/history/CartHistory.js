"use client";

import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

const CartHistory = () => {
  const { addItem, emptyCart } = useCart();
  const [cartHistory, setCartHistory] = useState([]);

  useEffect(() => {
    const loadHistory = () => {
      const savedCarts = JSON.parse(localStorage.getItem("cartHistory")) || [];
      console.log("📜 Loaded Cart History:", savedCarts);

      // ✅ Reverse to show latest first
      setCartHistory(savedCarts.reverse());
    };

    loadHistory();
  }, []);

  // ✅ Delete Cart from History
  const deleteCart = (index) => {
    const updatedHistory = cartHistory.filter((_, i) => i !== index);
    localStorage.setItem("cartHistory", JSON.stringify(updatedHistory));
    setCartHistory(updatedHistory);

    // ✅ Trigger notification
    window.dispatchEvent(new CustomEvent("notify", { 
      detail: { message: "🗑️ Deleted a saved cart", type: "error" } 
    }));

    console.log(`🗑️ Deleted cart at index ${index}`);
  };

  // ✅ Restore Cart to Main Cart
  const restoreCart = (cart) => {
    emptyCart(); // ✅ Clear current cart before restoring
    cart.items.forEach((item) => {
      addItem(item); // ✅ Add each item back
    });

    // ✅ Trigger notification
    window.dispatchEvent(new CustomEvent("notify", { 
      detail: { message: "♻️ Restored a saved cart", type: "success" } 
    }));

    console.log(`♻️ Restored cart from ${cart.timestamp}`);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Deleted Cart History</h3>
      {cartHistory.length === 0 ? (
        <p className="text-gray-600">No deleted carts yet.</p>
      ) : (
        <ul className="space-y-4">
          {cartHistory.map((cart, index) => (
            <li key={index} className="p-4 border rounded-md shadow-md">
              <p className="text-sm text-gray-500">Deleted on: {new Date(cart.timestamp).toLocaleString()}</p>
              
              <ul className="mt-2 space-y-2">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-gray-700">
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>

              {/* Buttons for Delete & Restore */}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => restoreCart(cart)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  ♻️ Restore Cart
                </button>
                <button
                  onClick={() => deleteCart(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartHistory;
