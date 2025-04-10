// app/hooks/useBodyClass.js

'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function useBodyClass() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    // Clean and convert pathname to slug format
    const cleanSlug = pathname === '/' ? 'home' : pathname.replace(/\//g, '-').replace(/^-|-$/g, '')

    // Class to apply
    const className = `page-${cleanSlug}`

    // Add the class to body
    document.body.classList.add(className)

    // Remove on cleanup (important for SPA-like transitions)
    return () => {
      document.body.classList.remove(className)
    }
  }, [pathname])
}
