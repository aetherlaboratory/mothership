// app/api/send-contact/route.js

import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

export async function POST(request) {
  const { name, email, message } = await request.json()

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
  }

  // ✅ Create transport using Gmail + App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_GOOGLE_USERNAME,
      pass: process.env.NEXT_PUBLIC_GOOGLE_APP_PASSWORD,
    },
  })

  // ✅ Send mail
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.NEXT_PUBLIC_GOOGLE_USERNAME, // ✅ Send to admin
      subject: '📨 New Contact Form Message',
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })
  } catch (error) {
    console.error('❌ Email send error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 })
  }

  // ✅ Save message to local JSON (can later connect to WordPress)
  const filePath = path.join(process.cwd(), 'messages.json')
  const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : []

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toISOString(),
  }

  fs.writeFileSync(filePath, JSON.stringify([newMessage, ...existing], null, 2))

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
