// server/api/admin/products/[id].put.ts
// Updates a product (simplified to return success response, removing database dependency)

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return { ok: true }
})
