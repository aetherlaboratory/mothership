// app/hooks/useSearchToggle.js
import { useState } from 'react'

let toggleFn

export const useSearchToggle = () => {
  const [showSearch, setShowSearch] = useState(false)
  toggleFn = () => setShowSearch(prev => !prev)
  return { showSearch, toggleSearch: toggleFn }
}

export const triggerSearchToggle = () => toggleFn?.()
