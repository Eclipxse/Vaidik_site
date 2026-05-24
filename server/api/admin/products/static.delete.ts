// server/api/admin/products/static.delete.ts
// Secure endpoint to delete a static product from composables/useProducts.ts and static.get.ts directly on the server

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createError, getQuery } from 'h3'
import { promises as fs } from 'fs'
import { join } from 'path'

function removeProductFromCode(code: string, slug: string): string {
  const slugIndex = code.indexOf(`slug: '${slug}'`)
  if (slugIndex === -1) {
    throw new Error(`Product with slug "${slug}" not found in code`)
  }

  // Find opening brace '{' before the slug
  let openBraceIndex = -1
  for (let i = slugIndex; i >= 0; i--) {
    if (code[i] === '{') {
      openBraceIndex = i
      break
    }
  }

  if (openBraceIndex === -1) {
    throw new Error("Could not find opening brace for product object")
  }

  // Find matching closing brace '}'
  let braceCount = 1
  let closeBraceIndex = -1
  for (let i = openBraceIndex + 1; i < code.length; i++) {
    if (code[i] === '{') {
      braceCount++
    } else if (code[i] === '}') {
      braceCount--
      if (braceCount === 0) {
        // Include the trailing comma if it exists
        if (code[i + 1] === ',') {
          closeBraceIndex = i + 1
        } else {
          closeBraceIndex = i
        }
        break
      }
    }
  }

  if (closeBraceIndex === -1) {
    throw new Error("Could not find closing brace for product object")
  }

  const before = code.substring(0, openBraceIndex)
  const after = code.substring(closeBraceIndex + 1)
  return before + after
}

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const query = getQuery(event)
  const slug = query.slug as string

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing product slug' })
  }

  const composablePath = join(process.cwd(), 'composables', 'useProducts.ts')
  const getApiPath = join(process.cwd(), 'server', 'api', 'admin', 'products', 'static.get.ts')

  try {
    // 1. Delete from composables/useProducts.ts
    let composableCode = await fs.readFile(composablePath, 'utf8')
    composableCode = removeProductFromCode(composableCode, slug)
    await fs.writeFile(composablePath, composableCode, 'utf8')

    // 2. Delete from server/api/admin/products/static.get.ts
    let getApiCode = await fs.readFile(getApiPath, 'utf8')
    getApiCode = removeProductFromCode(getApiCode, slug)
    await fs.writeFile(getApiPath, getApiCode, 'utf8')

    return { success: true, message: `Product "${slug}" deleted successfully from source files` }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to delete product from files: ${error.message}`,
    })
  }
})
