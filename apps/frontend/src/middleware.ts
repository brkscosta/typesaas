import { getUrl } from '@/lib/get-url'
import { env } from '@typesaas/env'
import { getToken } from 'next-auth/jwt'
import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = await getToken({
    req: request,
    secret: env.ENCRYPTION_SECRET,
    raw: true,
  })

  console.log('path', path)

  if (['/signin', '/error'].includes(path) && token) {
    return NextResponse.redirect(new URL(getUrl('dashboard')))
  }

  if (path.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL(getUrl('signin')))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
