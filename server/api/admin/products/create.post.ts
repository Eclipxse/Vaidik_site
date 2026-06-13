// server/api/admin/products/create.post.ts
// Creates a new database-backed product

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { useAdminSupabase } from '~/server/utils/adminSupabase'
import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody<Record<string, unknown>>(event)
  const allowed = [
    'name', 'description', 'category', 'sub_category', 'badge', 'features',
    'price', 'original_price', 'duration', 'thumbnail_url',
    'stock_status', 'is_published', 'is_featured', 'sort_order',
    'youtube_url', 'images', 'support', 'durations',
  ]
  const productData: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) productData[key] = body[key]
  }

  if (!productData.name || !productData.category || productData.price === null || productData.price === undefined) {
    throw createError({ statusCode: 400, statusMessage: 'Name, category, and price are required' })
  }

  const supabase = useAdminSupabase()
  const { data, error } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
