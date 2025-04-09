import { GetAccount } from '@/users/dto/get-account.dto'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import type { Account, User } from '@typesaas/schemas'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public onModuleDestroy(): Promise<void> {
    return this.$disconnect()
  }

  public async onModuleInit(): Promise<void> {
    await this.$connect()
  }

  public async deleteAccount(where: GetAccount): Promise<Account> {
    return await this.account.delete({ where: { provider_providerAccountId: where } })
  }

  public async userFindMany(): Promise<User[]> {
    return await this.user.findMany({ include: { accounts: true, sessions: true } })
  }

  public async accountFindUnique(provider_providerAccountId: GetAccount): Promise<Account | null> {
    return await this.account.findUnique({ where: { provider_providerAccountId }, include: { user: true } })
  }
}
