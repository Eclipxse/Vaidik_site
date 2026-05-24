// server/api/admin/login.post.ts
// Verifies the admin password and sets a signed httpOnly session cookie

import { readBody, createError } from 'h3'
import { timingSafeEqual } from 'node:crypto'
import { createSessionToken, setSessionCookie } from '~/server/utils/adminAuth'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { password } = body as { password?: string }

  if (!password) {
    throw createError({ statusCode: 400, statusMessage: 'Password required' })
  }

  if (!config.adminPassword) {
    throw createError({ statusCode: 500, statusMessage: 'Admin password not configured' })
  }

  // Constant-time comparison to prevent timing attacks
  const inputBuf = Buffer.from(password)
  const expectedBuf = Buffer.from(config.adminPassword)
  const valid =
    inputBuf.length === expectedBuf.length &&
    timingSafeEqual(inputBuf, expectedBuf)

  if (!valid) {
    // Small delay to slow brute force
    await new Promise(r => setTimeout(r, 500))
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  // Issue a signed session token in an httpOnly cookie
  const token = createSessionToken(config.adminSessionSecret)
  setSessionCookie(event, token)

  return { ok: true }
})
