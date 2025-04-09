import type { Prisma } from '@typesaas/prisma/types'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: Prisma.User
  }
}
