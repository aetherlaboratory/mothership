import axios from 'axios'

export async function submitFormWizard(data) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/custom/v1/submit-form`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Form submission error:', error)
    return { success: false, error: error.message }
  }
}
