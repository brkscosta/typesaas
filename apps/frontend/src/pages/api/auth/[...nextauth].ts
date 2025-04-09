import { createAuthConfig } from '@/features/auth/helpers/createAuthConfig'
import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<typeof NextAuth> {
  return NextAuth(req, res, createAuthConfig())
}
