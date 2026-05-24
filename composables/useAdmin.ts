// composables/useAdmin.ts
// Admin session helpers for the client side

export function useAdmin() {
  const router = useRouter()
  const config = useRuntimeConfig()
  const adminPath = config.public.adminPath as string

  /** Check if current session is still valid (pings server) */
  async function checkAuth(): Promise<boolean> {
    try {
      await $fetch('/api/admin/check')
      return true
    } catch {
      return false
    }
  }

  /** Logout: clear cookie + redirect to login */
  async function logout() {
    await $fetch('/api/admin/logout', { method: 'POST' })
    await router.push(`/${adminPath}`)
  }

  return { checkAuth, logout, adminPath }
}
