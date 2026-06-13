// server/api/admin/products/[id].delete.ts
// Unpublishes or permanently deletes a database-backed product

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { useAdminSupabase } from '~/server/utils/adminSupabase'
import { getRouterParam, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing product id' })

  const hardDelete = getQuery(event).hard === 'true'
  const supabase = useAdminSupabase()
  const result = hardDelete
    ? await supabase.from('products').delete().eq('id', id)
    : await supabase.from('products').update({ is_published: false }).eq('id', id)

  if (result.error) {
    throw createError({ statusCode: 500, statusMessage: result.error.message })
  }

  return { ok: true, deleted: id, hard: hardDelete }
})
