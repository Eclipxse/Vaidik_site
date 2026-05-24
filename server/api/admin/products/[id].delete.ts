// server/api/admin/products/[id].delete.ts
// Deletes a product — admin only

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createClient } from '@supabase/supabase-js'
import { getRouterParam, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing product id' })

  const query = getQuery(event)
  const hardDelete = query.hard === 'true'

  const config = useRuntimeConfig()
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    config.supabaseServiceKey || process.env.SUPABASE_SERVICE_KEY!
  )

  let error: { message: string } | null = null

  if (hardDelete) {
    // Hard delete — permanently remove from DB
    const result = await supabase.from('products').delete().eq('id', id)
    error = result.error
  } else {
    // Soft delete — just unpublish
    const result = await supabase
      .from('products')
      .update({ is_published: false })
      .eq('id', id)
    error = result.error
  }

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // Audit log
  await supabase.from('audit_log').insert({
    action: hardDelete ? 'hard_delete' : 'soft_delete',
    table_name: 'products',
    record_id: id,
    admin_email: 'admin',
    metadata: { hard: hardDelete },
  })

  return { ok: true, deleted: id, hard: hardDelete }
})
