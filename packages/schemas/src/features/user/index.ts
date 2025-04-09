import type { User as PUser } from '@prisma/client'
import { z } from 'zod'
import { accountSchema } from '../account'
import { sessionSchema } from '../session'

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  accounts: z.array(accountSchema),
  sessions: z.array(sessionSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<PUser>

export const clientUserSchemaAdapter = userSchema.pick({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
})

export type AdapterUser = z.infer<typeof clientUserSchemaAdapter>

export type User = z.infer<typeof userSchema>
