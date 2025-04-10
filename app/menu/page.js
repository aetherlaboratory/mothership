// app/menu/page.js

'use client'

import { useEffect, useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import LayoutCard from './layoutCard'
import LayoutClassic from './layoutClassic'
// import fetchMenuData from './data'
import loadMenuWithFallback from './fallback'


export default function MenuPage() {
  // Holds all foodmenu posts
  const [menuItems, setMenuItems] = useState([])
  // Current selected layout type: 'card' or 'classic'
  const [layout, setLayout] = useState('card')
  // Current active category filter
  const [activeCategory, setActiveCategory] = useState('All')
  // All categories extracted from the posts
  const [categories, setCategories] = useState(['All'])

  // Fetch menu items on mount
  useEffect(() => {
    async function loadData() {
    const items = await loadMenuWithFallback()

      setMenuItems(items)

      // Extract unique categories from items
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

  // Filter items based on selected category
  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item =>
        item.categories?.includes(activeCategory)
      )

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

      {/* Render selected layout with filtered data */}
      {layout === 'card' ? (
        <LayoutCard items={filteredItems} />
      ) : (
        <LayoutClassic items={filteredItems} />
      )}
    </div>
  )
}
