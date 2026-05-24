// server/utils/adminAuth.ts
// Shared utilities for admin authentication

import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'
import { getCookie, setCookie, deleteCookie } from 'h3'

const COOKIE_NAME = 'admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 hours

/** Sign a payload with HMAC-SHA256 */
function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex')
}

/** Create a signed session token */
export function createSessionToken(secret: string): string {
  const expires = Date.now() + COOKIE_MAX_AGE * 1000
  const payload = `admin:${expires}`
  const sig = sign(payload, secret)
  return `${payload}.${sig}`
}

/** Verify a session token — returns true if valid and not expired */
export function verifySessionToken(token: string, secret: string): boolean {
  try {
    const lastDot = token.lastIndexOf('.')
    if (lastDot === -1) return false
    const payload = token.slice(0, lastDot)
    const sig = token.slice(lastDot + 1)
    const expectedSig = sign(payload, secret)
    // Constant-time comparison to prevent timing attacks
    const sigBuf = Buffer.from(sig, 'hex')
    const expBuf = Buffer.from(expectedSig, 'hex')
    if (sigBuf.length !== expBuf.length) return false
    if (!timingSafeEqual(sigBuf, expBuf)) return false
    // Check expiry
    const parts = payload.split(':')
    const expires = parseInt(parts[1], 10)
    return Date.now() < expires
  } catch {
    return false
  }
}

/** Set the session cookie on the response */
export function setSessionCookie(event: H3Event, token: string) {
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

/** Clear the session cookie */
export function clearSessionCookie(event: H3Event) {
  deleteCookie(event, COOKIE_NAME, { path: '/' })
}

/** Read and verify the session from the request cookie */
export function isAdminAuthenticated(event: H3Event): boolean {
  const config = useRuntimeConfig()
  const token = getCookie(event, COOKIE_NAME)
  if (!token) return false
  return verifySessionToken(token, config.adminSessionSecret)
}
