// server/api/admin/products/[id].put.ts
// Updates a database-backed product

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { useAdminSupabase } from '~/server/utils/adminSupabase'
import { readBody, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing product id' })

  const body = await readBody<Record<string, unknown>>(event)
  const allowed = [
    'name', 'description', 'category', 'sub_category', 'badge', 'features',
    'price', 'original_price', 'duration', 'thumbnail_url',
    'stock_status', 'is_published', 'is_featured', 'sort_order',
    'youtube_url', 'images', 'support', 'durations',
  ]
  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  if (!Object.keys(updates).length) {
    throw createError({ statusCode: 400, statusMessage: 'No valid fields to update' })
  }

  const { data, error } = await useAdminSupabase()
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
