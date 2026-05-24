// server/api/admin/logout.post.ts
// Clears the admin session cookie

import { clearSessionCookie } from '~/server/utils/adminAuth'

export default defineEventHandler((event) => {
  clearSessionCookie(event)
  return { ok: true }
})
