import type { Account as PAccount } from '@typesaas/prisma'

import { z } from 'zod'

export const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<PAccount>

export const accountAdapterAccountSchema = accountSchema.pick({
  provider: true,
  providerAccountId: true,
  access_token: true,
  expires_at: true,
  scope: true,
  token_type: true,
  id_token: true,
  userId: true,
})

export type AdapterAccount = z.infer<typeof accountAdapterAccountSchema>

export type Account = z.infer<typeof accountSchema>
