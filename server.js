// File: server.js
// Description: A simple Express server that proxies media uploads to your WordPress media library

const express = require('express')
const multer = require('multer') // handles file parsing
const cors = require('cors') // allows frontend to send requests
const axios = require('axios') // HTTP client for uploading to WP
const path = require('path')

// Load env variables
require('dotenv').config()

const app = express()
const port = 4000 // You can change this if needed

// Setup file upload with Multer (in memory storage)
const upload = multer({ storage: multer.memoryStorage() })

// Enable CORS so frontend (Next.js) can communicate
app.use(cors())

// Route: Upload file and forward to WordPress
app.post('/upload-media', upload.single('file'), async (req, res) => {
  const file = req.file

  // If no file was sent
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  // Prepare WP API endpoint
  const wpEndpoint = `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/media`

  try {
    // Send the file to WordPress using axios
    const wpRes = await axios.post(wpEndpoint, file.buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${file.originalname}"`,
        'Content-Type': file.mimetype,
        'Authorization': `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_WP_USERNAME}:${process.env.NEXT_PUBLIC_WP_APP_PASSWORD}`
        ).toString('base64')}`,
      },
    })

    // Return WordPress media response
    res.json(wpRes.data)
  } catch (error) {
    console.error('Upload failed:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to upload to WordPress' })
  }
})

// Start the Express server
app.listen(port, () => {
  console.log(`🚀 Express media server running at http://localhost:${port}`)
})
