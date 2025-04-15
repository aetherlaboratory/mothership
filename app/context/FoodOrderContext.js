'use client'

import { createContext, useContext, useState, useEffect } from 'react'

// ✅ Create context
const FoodOrderContext = createContext()

// ✅ Provider component to wrap food-order related pages
export const FoodOrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([])

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('foodOrders')
    if (stored) setOrders(JSON.parse(stored))
  }, [])

  // ✅ Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('foodOrders', JSON.stringify(orders))
  }, [orders])

  // ✅ Add item to order
const addToOrder = (item) => {
  setOrders(prev => [...prev, item])

  console.log('✅ Added to food order:', item)

  window.dispatchEvent(
    new CustomEvent('notify', {
      detail: {
        message: `🍱  Added ${item.title} to your food order!`,
        type: 'success',
      },
    })
  )
}


  // ✅ Remove item by ID
  const removeFromOrder = (id) => {
    setOrders(prev => prev.filter(item => item.id !== id))
  }

  // ✅ Clear all
  const clearOrders = () => {
    setOrders([])
  }

  return (
    <FoodOrderContext.Provider value={{ orders, addToOrder, removeFromOrder, clearOrders }}>
      {children}
    </FoodOrderContext.Provider>
  )
}

// ✅ Custom hook to use in components
export const useFoodOrders = () => {
  const context = useContext(FoodOrderContext)
  if (!context) throw new Error("useFoodOrders must be used inside FoodOrderProvider")
  return context
}
