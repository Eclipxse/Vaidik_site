// server/api/admin/products/[id].get.ts
// Returns a single product by ID — admin only

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createClient } from '@supabase/supabase-js'
import { getRouterParam, createError } from 'h3'

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

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return data
})
