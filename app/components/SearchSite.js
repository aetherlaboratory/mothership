// app/components/SearchSite.js

'use client'

import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Index } from 'flexsearch'
import Link from 'next/link'
import { useSearchToggle } from '../hooks/useSearchToggle' // ✅ import toggle


const mockData = [
  {
    id: 1,
    type: 'page',
    title: 'About Us',
    path: '/about',
    text: 'Learn more about our mission, values, and team.',
  },
  {
    id: 2,
    type: 'page',
    title: 'Services',
    path: '/services',
    text: 'We offer web development, design, and consulting services.',
  },
  {
    id: 3,
    type: 'user',
    title: 'Jane Doe',
    username: 'janedoe',
    path: '/view-profile/janedoe',
    image: 'https://placehold.co/300x300?text=Jane+Doe',
    text: 'Full-stack developer and admin user.',
  },
  {
    id: 4,
    type: 'user',
    title: 'John Smith',
    username: 'johnsmith',
    path: '/view-profile/johnsmith',
    image: 'https://placehold.co/300x300?text=John+Smith',
    text: 'Creative director and UX designer.',
  },
  {
    id: 5,
    type: 'user',
    title: 'Lisa Ray',
    username: 'lisaray',
    path: '/view-profile/lisaray',
    image: 'https://placehold.co/300x300?text=Lisa+Ray',
    text: 'Frontend engineer and component builder.',
  },
]


export default function SearchSite() {
  const { showSearch } = useSearchToggle() // ✅ gets global visibility state
  const [index, setIndex] = useState(null)
  const [results, setResults] = useState([])
  const [inputTouched, setInputTouched] = useState(false)

  useEffect(() => {
    const newIndex = new Index({ tokenize: 'forward', preset: 'match' })
    mockData.forEach((item) => {
      let content = item.text
      if (item.title) content += ' ' + item.title
      newIndex.add(item.id, content)
    })
    setIndex(newIndex)
  }, [])

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: () => {}, // no-op
  })

  useEffect(() => {
    const runSearch = async () => {
      if (!index || !formik.values.search) {
        setResults([])
        return
      }

      const matches = await index.search(formik.values.search)
      const found = mockData.filter((item) => matches.includes(item.id))
      setResults(found)
    }

    runSearch()
  }, [formik.values.search, index])

  const userResults = results.filter((item) => item.type === 'user')
  const contentResults = results.filter((item) => item.type !== 'user')

  if (!showSearch) return null // ✅ hidden until toggled

  return (
    <div className="animate__animated animate__fadeInDown bg-white border border-gray-200 px-3 shadow-sm rounded-lg space-y-6 w-full max-w-7xl mx-auto mt-6">
      <form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
        <div className="space-y-2">
          <div className="flex flex-wrap">
          <input
            id="search"
            name="search"
            type="text"
            autoComplete="off"
            onChange={formik.handleChange}
            onFocus={() => setInputTouched(true)}
            value={formik.values.search}
            placeholder="Search for pages, content, or users..."
            className="w-7/12 sm:w-9/12 mx-auto block px-4 mt-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


           <div className="mx-auto flex justify-end align-center pt-4">
            <button
              type="submit"
              className="text-lg px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Search
            </button>
          </div>
          </div>



          {inputTouched && (
            <div
              key={formik.values.search.length + '-' + inputTouched}
              className="mx-auto w-full sm:w-8/12 md:w-9/12 block pt-2 pl-9 md:ml-0 animate__animated animate__fadeInDown"
            >
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {[
                  { label: 'Products', color: 'bg-red-600' },
                  { label: 'Users', color: 'bg-green-600' },
                  { label: 'Pages', color: 'bg-blue-600' },
                  { label: 'Posts', color: 'bg-purple-600' },
                  { label: 'Images', color: 'bg-pink-600' },
                  { label: 'Videos', color: 'bg-yellow-500' },
                  { label: 'Audio', color: 'bg-indigo-600' },
                  { label: 'Schedule', color: 'bg-teal-600' },
                  { label: 'Events', color: 'bg-orange-600' },
                  { label: 'Food', color: 'bg-lime-600' },
                  { label: 'Admin', color: 'bg-gray-700' },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    className={`text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm hover:opacity-90 transition ${btn.color}`}
                    onClick={() => console.log('Filter clicked:', btn.label)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        
        </div>
      </form>

      {userResults.length > 0 && (
        <div className="bg-gray-500 p-3 flex flex-wrap gap-4">
          {userResults.map((user) => (
            <Link
              href={user.path}
              key={user.id}
              className="relative w-[180px] h-[220px] rounded-xl overflow-hidden shadow group"
            >
              <img
                src={user.image}
                alt={user.username}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="w-full absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-semibold text-sm bg-black/60 px-2 py-1 rounded">
                {user.title}
              </div>
              <div className="absolute top-2 right-2 h-3 w-3 bg-green-400 rounded-full shadow-md animate-pulse online-status" />
            </Link>
          ))}
        </div>
      )}

      <div>
        {results.length === 0 && formik.values.search && (
          <p className="text-sm text-gray-500 italic">
            No results found for “{formik.values.search}”.
          </p>
        )}

        <ul className="space-y-4">
          {contentResults.map((item) => (
            <li key={item.id} className="border rounded-lg p-4 hover:shadow-sm transition">
              <Link href={item.path} className="text-lg font-semibold text-blue-600 hover:underline">
                {item.title}
              </Link>
              <p className="text-sm text-gray-700 mt-1">{item.text}</p>
              <span className="text-xs text-gray-400 block mt-1">Type: {item.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
