// File: /app/media/MediaPageLayout.js
// Description: Optional layout wrapper for the /media page, can include breadcrumbs, tabs, or page title styling

'use client'

import React from 'react'

// Accepts title and children to render inside a styled layout
export default function MediaPageLayout({ title = 'Media Library', children }) {
  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      {/* Page title */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-4xl font-semibold text-gray-900">{title}</h1>
      </div>

      {/* Content passed from page.js */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}
