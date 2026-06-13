// server/api/admin/products/[id].get.ts
// Returns a single database-backed product

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { useAdminSupabase } from '~/server/utils/adminSupabase'
import { getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing product id' })

  const { data, error } = await useAdminSupabase()
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return data
})
