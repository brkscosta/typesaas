import { PrismaService } from '@/prisma/prisma.service'
import { Service } from '@/service'
import { GetAccount } from '@/users/dto/get-account.dto'
import { GetUserByAccountOrEmailDto } from '@/users/dto/get-user-by-account.dto'
import { UpdateUserDto } from '@/users/dto/update-user.dto'
import { ProviderAccountIdOrEmailMissingError } from '@/users/errors/provider-accountId-or-email-missing.error'
import { UnspecifiedError } from '@/users/errors/unspecified.error'
import { UserAlreadExistsError } from '@/users/errors/user-alredy-exists.error'
import { UserNotFoundError } from '@/users/errors/user-not-fount.error'
import { stripUndefined } from '@/utils/objects'
import { Injectable } from '@nestjs/common'
import {
  Account,
  AdapterAccount,
  AdapterUser,
  User,
  accountAdapterAccountSchema,
  clientUserSchemaAdapter,
  userSchema,
} from '@typesaas/schemas'

@Injectable()
export class UsersService extends Service {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  public async create(data: AdapterUser): Promise<AdapterUser> {
    try {
      const user = await this.userCreate(data)

      return clientUserSchemaAdapter.parse(user)
    } catch (error) {
      if (error.code === 'P2002') {
        throw new UserAlreadExistsError()
      }
      throw new UnspecifiedError()
    }
  }

  public async linkAccount(adapterAccount: AdapterAccount): Promise<AdapterAccount> {
    const { data } = stripUndefined<AdapterAccount>(adapterAccount)
    const account = await this.createAccount(data)
    return accountAdapterAccountSchema.parse(account)
  }

  public async unlinkAccount(where: GetAccount): Promise<AdapterAccount> {
    const account = this.prisma.deleteAccount(where)
    return accountAdapterAccountSchema.parse(account)
  }

  public async getByAccountOrEmail({
    provider_providerAccountId,
    email,
  }: GetUserByAccountOrEmailDto): Promise<AdapterAccount | AdapterUser> {
    const { provider, providerAccountId } = provider_providerAccountId

    if (provider && providerAccountId) {
      const account = await this.prisma.accountFindUnique({
        providerAccountId,
        provider,
      })

      if (account) {
        return this.findOne(account.userId)
      }
    }

    if (!providerAccountId && !email) {
      throw new ProviderAccountIdOrEmailMissingError()
    }

    if (email) {
      return this.getByEmail(email)
    }

    throw new UnspecifiedError('Unable to perform search. Ensure valid input.')
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<AdapterUser> {
    const { data } = stripUndefined<UpdateUserDto>(updateUserDto)
    const user = await this.userUpdate(id, data)
    return clientUserSchemaAdapter.parse(user)
  }

  public async remove(id?: string): Promise<boolean> {
    if (!id) return false

    const res = await this.userDelete(id)

    return !!res
  }

  private async userDelete(where: string): Promise<boolean> {
    const user = await this.prisma.user.delete({ where: { id: where } })
    return !!user
  }

  private async userCreate(data: AdapterUser): Promise<User> {
    return await this.prisma.user.create({ data, include: { accounts: true, sessions: true } })
  }

  private async createAccount(data: AdapterAccount): Promise<Account> {
    const account = await this.prisma.account.create({
      data: {
        ...data,
        type: `oauth`,
      },
      include: {
        user: {
          include: { sessions: true },
        },
      },
    })

    return account
  }

  private async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    return userSchema.parse(user)
  }

  private async userFindUniqueByEmail(where: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email: where }, include: { accounts: true, sessions: true } })
  }

  private async getByEmail(email: string): Promise<AdapterUser> {
    const user = await this.userFindUniqueByEmail(email)

    if (!user) throw new UserNotFoundError()

    return clientUserSchemaAdapter.parse(user)
  }

  private async userUpdate(id: string, data: AdapterUser): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: { accounts: true, sessions: true },
    })
  }
}
