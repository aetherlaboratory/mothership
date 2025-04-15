'use client'

import { useEffect, useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import LayoutCard from './layoutCard'
import LayoutClassic from './layoutClassic'
import loadMenuWithFallback from './fallback'
import useAuthGuard from '../hooks/useAuthGuard'

export default function MenuPage() {
  const { user, loading } = useAuthGuard()

  const [menuItems, setMenuItems] = useState([])
  const [layout, setLayout] = useState('card')
  const [activeCategory, setActiveCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    async function loadData() {
      const items = await loadMenuWithFallback()
      setMenuItems(items)

      const foundCategories = new Set()
      items.forEach(item => {
        if (Array.isArray(item.categories)) {
          item.categories.forEach(cat => foundCategories.add(cat))
        }
      })
      setCategories(['All', ...Array.from(foundCategories)])
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        ⏳ Checking login status...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-red-600">
        🔐 You must be logged in to view the menu.
      </div>
    )
  }

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.categories?.includes(activeCategory))

  return (
    <div className="p-6 space-y-6">
      {/* Layout Toggle Buttons */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Restaurant Menu</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setLayout('card')}
            className={`p-2 border rounded ${layout === 'card' ? 'bg-black text-white' : 'bg-white'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setLayout('classic')}
            className={`p-2 border rounded ${layout === 'classic' ? 'bg-black text-white' : 'bg-white'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === category ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Render Layout */}
      {layout === 'card' ? (
        <LayoutCard items={filteredItems} />
      ) : (
        <LayoutClassic items={filteredItems} />
      )}
    </div>
  )
}
