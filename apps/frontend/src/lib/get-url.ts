import { env } from '@typesaas/env'

export function getUrl(path?: string) {
  const baseUrl = env.NEXTAUTH_URL || ''
  const normalizedBaseUrl = path && !baseUrl.startsWith('/') ? `/${path}` : path || ''

  return `${baseUrl}${normalizedBaseUrl}`
}
