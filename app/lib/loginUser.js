import { getUserData } from '@/app/utils/api'

export async function loginUser(username, password) {
  
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json()

  if (data.success) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('userToken', data.token) // 🔁 sync with main key

    const userData = await getUserData(data.token)

    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData))
      return userData
    } else {
      throw new Error('Failed to fetch user info')
    }
  } else {
    throw new Error(data.message)
  }
}
