// server/api/admin/products/index.get.ts
// Returns database products (simplified to return empty list, removing database dependency)

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return []
})
