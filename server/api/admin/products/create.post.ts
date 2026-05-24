// server/api/admin/products/create.post.ts
// Creates a new product — admin only

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createClient } from '@supabase/supabase-js'
import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const config = useRuntimeConfig()
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    config.supabaseServiceKey || process.env.SUPABASE_SERVICE_KEY!
  )

  const body = await readBody(event)

  const allowed = [
    'name', 'description', 'category', 'sub_category', 'features',
    'price', 'original_price', 'duration', 'thumbnail_url',
    'stock_status', 'is_published', 'is_featured', 'sort_order',
    'youtube_url', 'images', 'support', 'durations',
  ]
  const productData: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) productData[key] = body[key]
  }

  const { data, error } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // Audit log
  await supabase.from('audit_log').insert({
    action: 'create',
    table_name: 'products',
    record_id: data.id,
    admin_email: 'admin',
    metadata: { name: data.name },
  })

  return data
})
