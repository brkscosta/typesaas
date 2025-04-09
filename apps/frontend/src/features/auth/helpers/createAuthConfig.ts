import { createAuthPrismaAdapter } from '@/features/auth/helpers/createPrismaAdapter'
import { providers } from '@/features/auth/providers'
import { env } from '@typesaas/env'
import { clientUserSchemaAdapter } from '@typesaas/schemas'
import type { AuthOptions, Session } from 'next-auth'

export const createAuthConfig = (): AuthOptions => ({
  adapter: createAuthPrismaAdapter(),
  secret: env.ENCRYPTION_SECRET,
  providers,
  pages: {
    signIn: '/signin',
    error: '/error',
    verifyRequest: '/verify-request',
  },
  callbacks: {
    session({ session, user }): Session {
      return {
        ...session,
        user: clientUserSchemaAdapter.parse(user),
      }
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: env.NODE_ENV === 'production',
      },
    },
  },
})
