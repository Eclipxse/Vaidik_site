// server/api/admin/products/[id].get.ts
// Returns a single product (simplified to return empty object, removing database dependency)

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return {}
})
