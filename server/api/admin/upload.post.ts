// server/api/admin/upload.post.ts
// Accepts multipart/form-data with a single 'file' field
// Saves it to public/products/uploads/ and returns the public path

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createError } from 'h3'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // Check if we are running in a serverless environment (Netlify/Vercel)
  const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.LAMBDA_TASK_ROOT || process.env.NODE_ENV === 'production'
  if (isServerless) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Uploading images directly on the live website is disabled due to Netlify\'s read-only serverless architecture. Please perform all asset configurations locally in development mode (npm run dev) and push them to GitHub.'
    })
  }

  const form = await readMultipartFormData(event)
  if (!form || form.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file received' })
  }

  const filePart = form.find(f => f.name === 'file')
  if (!filePart || !filePart.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file' })
  }

  // Only allow image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
  const mime = filePart.type || 'image/jpeg'
  if (!allowedTypes.includes(mime)) {
    throw createError({ statusCode: 400, statusMessage: 'Only images allowed (jpg, png, webp, gif)' })
  }

  // Max 5MB
  if (filePart.data.length > 5 * 1024 * 1024) {
    throw createError({ statusCode: 400, statusMessage: 'File too large (max 5MB)' })
  }

  // Sanitize filename
  const safeName = filePart.filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase()

  const timestamp = Date.now()
  const filename = `${timestamp}_${safeName}`

  // Ensure upload directory exists
  const uploadDir = join(process.cwd(), 'public', 'products', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  const filePath = join(uploadDir, filename)
  await writeFile(filePath, filePart.data)

  // Return the public-accessible path
  return { path: `/products/uploads/${filename}` }
})
