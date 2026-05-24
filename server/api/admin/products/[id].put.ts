// server/api/admin/products/[id].put.ts
// Updates a product — admin only

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createClient } from '@supabase/supabase-js'
import { readBody, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing product id' })

  const config = useRuntimeConfig()
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    config.supabaseServiceKey || process.env.SUPABASE_SERVICE_KEY!
  )

  const body = await readBody(event)

  // Whitelist of updatable fields — prevents mass assignment
  const allowed = [
    'name', 'description', 'category', 'sub_category', 'features',
    'price', 'original_price', 'duration', 'thumbnail_url',
    'stock_status', 'is_published', 'is_featured', 'sort_order',
    'youtube_url', 'images', 'support',
  ]
  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No valid fields to update' })
  }

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // Audit log
  await supabase.from('audit_log').insert({
    action: 'update',
    table_name: 'products',
    record_id: id,
    admin_email: 'admin',
    metadata: { updated_fields: Object.keys(updates) },
  })

  return data
})
