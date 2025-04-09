import { type Account, PrismaClient, type Session, type User, type VerificationToken } from '@prisma/client'

declare const global: { prisma: PrismaClient }

if (!global.prisma) {
  global.prisma = new PrismaClient()
}

export default global.prisma

export type { Account, PrismaClient, Session, User, VerificationToken }
