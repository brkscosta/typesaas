import { PrismaService } from '@/prisma/prisma.service'
import { Service } from '@/service'
import { FindSessionAndUserDto } from '@/session/dto/find-session-and-user.dto'
import { FindTokenError } from '@/session/errors/find-token.error'
import { stripUndefined } from '@/utils/objects'
import { Injectable } from '@nestjs/common'
import {
  type AdapterSession,
  Session,
  User,
  clientUserSchemaAdapter,
  sessionAdapterSessionSchema,
} from '@typesaas/schemas'

@Injectable()
export class SessionService extends Service {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  public async createSession(adapterSession: AdapterSession): Promise<AdapterSession> {
    const { data } = stripUndefined<AdapterSession>(adapterSession)
    const session = await this.makeSesssion(data)
    return sessionAdapterSessionSchema.parse(session)
  }

  public async findSessionAndUser(sessionToken: string): Promise<FindSessionAndUserDto | null> {
    try {
      const result = await this.getSessionAndUserByToken(sessionToken)

      if (!result) {
        return null
      }

      const { session, user } = result
      return new FindSessionAndUserDto(sessionAdapterSessionSchema.parse(session), clientUserSchemaAdapter.parse(user))
    } catch (error) {
      console.error(`${this.constructor.name}::findSessionAndUser:`, error.message)
      throw new FindTokenError()
    }
  }

  private async makeSesssion(data: AdapterSession): Promise<Session> {
    return this.prisma.session.create({
      data: {
        sessionToken: data.sessionToken,
        expires: data.expires,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    })
  }

  private async getSessionAndUserByToken(where: string): Promise<{
    session: Pick<Session, 'sessionToken' | 'expires' | 'userId'>
    user: Pick<User, 'email' | 'image' | 'name' | 'emailVerified' | 'id'>
  } | null> {
    const sessionAndUser = await this.prisma.session.findUnique({
      where: { sessionToken: where },
      include: { user: true },
    })

    if (!sessionAndUser || !sessionAndUser.user) {
      return null
    }

    const { user, userId, expires, sessionToken } = sessionAndUser

    return {
      user,
      session: {
        userId,
        sessionToken,
        expires,
      },
    }
  }
}
