// server/api/admin/products/index.get.ts
// Returns all database-backed products, including drafts

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { useAdminSupabase } from '~/server/utils/adminSupabase'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { data, error } = await useAdminSupabase()
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
