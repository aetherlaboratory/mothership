import axios from 'axios'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_WP}/custom/v1/appointments`

export const postAppointment = async (token, payload) => {
  if (!token) throw new Error('Missing user token')
  const res = await axios.post(BASE_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return res.data
}

export const getAppointment = async (token, id) => {
  const res = await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const updateAppointment = async (token, id, payload) => {
  const res = await axios.put(`${BASE_URL}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return res.data
}

export const deleteAppointment = async (token, id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}
