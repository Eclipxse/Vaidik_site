// server/api/admin/products/static.put.ts
// Secure endpoint to update static products in composables/useProducts.ts and static.get.ts directly on the server

import { isAdminAuthenticated } from '~/server/utils/adminAuth'
import { createError, readBody } from 'h3'
import { promises as fs } from 'fs'
import { join } from 'path'

interface Duration {
  label: string
  days: number
  price: string
  stock: number
}

interface StaticProduct {
  slug: string
  name: string
  category: string
  tagline: string
  badge: string
  images: string[]
  durations: Duration[]
  features: string[]
  support: string[]
  youtube_url?: string
}

function generateProductCode(p: StaticProduct): string {
  const durStr = p.durations
    .map(
      d =>
        `      { label: '${d.label.replace(/'/g, "\\'")}', days: ${d.days}, price: '${d.price.replace(/'/g, "\\'")}', stock: ${d.stock} },`
    )
    .join('\n')

  const featStr = p.features.map(f => `      '${f.replace(/'/g, "\\'")}',`).join('\n')
  const suppStr = p.support.map(s => `      '${s.replace(/'/g, "\\'")}',`).join('\n')
  const imgStr = p.images.map(i => `      '${i.replace(/'/g, "\\'")}',`).join('\n')
  const ytStr = p.youtube_url ? `\n    youtube_url: '${p.youtube_url.replace(/'/g, "\\'")}',` : ''

  return `{
    slug: '${p.slug}',
    name: '${p.name.replace(/'/g, "\\'")}',
    category: '${p.category}' as const,
    tagline: '${p.tagline.replace(/'/g, "\\'")}',
    badge: '${p.badge.replace(/'/g, "\\'")}',
    images: [
${imgStr}
    ],
    durations: [
${durStr}
    ],
    features: [
${featStr}
    ],
    support: [
${suppStr}
    ],${ytStr}
  }`
}

function updateProductInCode(code: string, slug: string, newProductCode: string): string {
  // Find where the slug is defined
  const slugIndex = code.indexOf(`slug: '${slug}'`)
  if (slugIndex === -1) {
    throw new Error(`Product with slug ${slug} not found in code`)
  }

  // Find the opening brace of the object containing this slug.
  // It should be the closest '{' before the slugIndex.
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

  // Count braces to find the matching closing brace
  let braceCount = 1
  let closeBraceIndex = -1
  for (let i = openBraceIndex + 1; i < code.length; i++) {
    if (code[i] === '{') {
      braceCount++
    } else if (code[i] === '}') {
      braceCount--
      if (braceCount === 0) {
        // We found the end of the object!
        // We want to include the trailing comma if it exists (e.g. '},')
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

  // Replace from openBraceIndex to closeBraceIndex + 1 with newProductCode
  const before = code.substring(0, openBraceIndex)
  const after = code.substring(closeBraceIndex + 1)
  return before + newProductCode.trim() + ',' + after
}

export default defineEventHandler(async (event) => {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody<StaticProduct>(event)
  if (!body || !body.slug) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid product payload' })
  }

  // Check if we are running in a serverless environment (Netlify/Vercel)
  const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.LAMBDA_TASK_ROOT || process.env.NODE_ENV === 'production'
  if (isServerless) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Saving changes directly on the live website is disabled due to Netlify\'s read-only serverless architecture. To make permanent edits, run your site locally in development mode (npm run dev) where the files are fully writable, then stage and push your changes to GitHub to redeploy automatically!'
    })
  }

  const composablePath = join(process.cwd(), 'composables', 'useProducts.ts')
  const getApiPath = join(process.cwd(), 'server', 'api', 'admin', 'products', 'static.get.ts')

  try {
    // 1. Update composables/useProducts.ts
    let composableCode = await fs.readFile(composablePath, 'utf8')
    const newProductCode = generateProductCode(body)
    composableCode = updateProductInCode(composableCode, body.slug, newProductCode)
    await fs.writeFile(composablePath, composableCode, 'utf8')

    // 2. Update server/api/admin/products/static.get.ts
    let getApiCode = await fs.readFile(getApiPath, 'utf8')
    getApiCode = updateProductInCode(getApiCode, body.slug, newProductCode)
    await fs.writeFile(getApiPath, getApiCode, 'utf8')

    return { success: true, message: 'Product updated successfully in files' }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update product files: ${error.message}`,
    })
  }
})
