// utils/getBaseUrl.js

export async function getBaseUrl() {
  if (typeof window === 'undefined') return '' // SSR safety

  const hostname = window.location.hostname || ''

  if (hostname === 'localhost') {
    return 'http://localhost:3000'
  }

  if (hostname.startsWith('192.168.')) {
    return `http://${hostname}:3000`
  }

  return 'https://mothership.wordifysites.com'
}
