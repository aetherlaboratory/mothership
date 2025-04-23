// app/form/field-types/PostSelectorField.js

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

// ✅ Default config for this field type
export const defaultConfig = {
  post_type: 'product', // default to WooCommerce product
  multiple: true,
  required: false,
}

// ✅ Fetch and render selected posts of given type
export function RenderField({ field, formik }) {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_WP}/wp/v2/${field.settings.post_type}?per_page=100`)
        setPosts(res.data)
      } catch (err) {
        console.error('Failed to fetch posts:', err)
      }
    }
    fetchPosts()
  }, [field.settings.post_type])

  const selected = formik.values[field.name] || []

  const togglePost = (id) => {
    if (selected.includes(id)) {
      formik.setFieldValue(field.name, selected.filter((pid) => pid !== id))
    } else {
      formik.setFieldValue(field.name, [...selected, id])
    }
  }

  const filtered = posts.filter((post) => {
    const term = search.toLowerCase()
    return post.title?.rendered.toLowerCase().includes(term)
  })

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder={`Search ${field.settings.post_type}s...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 w-full rounded"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((post) => {
          const isActive = selected.includes(post.id)
          const image = post?.featured_media_url || '/default-thumbnail.jpg'

          return (
            <div
              key={post.id}
              onClick={() => togglePost(post.id)}
              className={`rounded-xl overflow-hidden cursor-pointer relative shadow ${
                isActive ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
            >
              <img
                src={image}
                alt={post.title.rendered}
                className="w-full h-32 object-cover"
              />
              <div className="p-2 text-center">
                <div className="font-semibold text-sm" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                {post.date && (
                  <div className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ✅ Yup validation schema
export function validationSchema(field, Yup) {
  return field.multiple
    ? Yup.array().of(Yup.number()).min(field.required ? 1 : 0)
    : Yup.number().nullable()
}
