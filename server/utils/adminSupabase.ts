import { createClient } from '@supabase/supabase-js'
import { createError } from 'h3'

export function useAdminSupabase() {
  const config = useRuntimeConfig()
  const url = process.env.SUPABASE_URL
  const serviceKey = config.supabaseServiceKey

  if (!url || !serviceKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Admin database access is not configured',
    })
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
