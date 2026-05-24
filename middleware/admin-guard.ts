// middleware/admin-guard.ts
// Runs on all [adminPath]/* pages — ensures the URL matches the secret admin path,
// otherwise redirects to home to prevent URL enumeration.

export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  const adminPath = config.public.adminPath as string

  // The first segment of the URL
  const firstSegment = String(to.params.adminPath || '')

  // If the URL doesn't match our secret admin path, redirect home
  if (firstSegment !== adminPath) {
    return navigateTo('/')
  }
})
