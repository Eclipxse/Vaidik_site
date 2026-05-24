// server/api/admin/products/create.post.ts
// Creates a new product (simplified, removing database dependency)

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return { id: 'mock' }
})
