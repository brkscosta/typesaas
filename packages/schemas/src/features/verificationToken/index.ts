import type { VerificationToken as PVerificationToken } from '@typesaas/prisma'
import { z } from 'zod'

export const verificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
}) satisfies z.ZodType<PVerificationToken>

export type VerificationToken = z.infer<typeof verificationTokenSchema>
