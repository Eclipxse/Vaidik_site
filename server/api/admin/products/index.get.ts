// server/api/admin/products/index.get.ts
// Returns ALL products (including unpublished) — admin only

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createClient } from '@supabase/supabase-js'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const config = useRuntimeConfig()
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    config.supabaseServiceKey || process.env.SUPABASE_SERVICE_KEY!
  )

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
