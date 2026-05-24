// server/api/admin/check.get.ts
// Lightweight endpoint for the client to verify session is still valid

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createError } from 'h3'

export default defineEventHandler((event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return { authenticated: true }
})
