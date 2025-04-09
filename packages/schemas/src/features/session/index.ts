import type { Session as PSession } from '@typesaas/prisma'
import { z } from 'zod'

export const sessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<PSession>

export const sessionAdapterSessionSchema = sessionSchema.pick({
  sessionToken: true,
  userId: true,
  expires: true,
})

export type Session = z.infer<typeof sessionSchema>

export type AdapterSession = z.infer<typeof sessionAdapterSessionSchema>
