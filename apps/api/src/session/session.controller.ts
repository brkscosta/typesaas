import { Service } from '@/service'
import { FindSessionAndUserDto } from '@/session/dto/find-session-and-user.dto'
import { SessionService } from '@/session/session.service'
import { catchErrorTyped } from '@/utils/error.util'
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { AdapterSession } from '@typesaas/schemas'
import { Response } from 'express'

@Controller('api/v1/sessions')
export class SessionController extends Service {
  constructor(private readonly sessionService: SessionService) {
    super()
  }

  @Get('/:sessionToken')
  public async getSessionAndUser(
    @Res() res: Response,
    @Param('sessionToken') sessionToken: string,
  ): Promise<Response<FindSessionAndUserDto>> {
    const [error, sessionAndUser] = await catchErrorTyped(this.sessionService.findSessionAndUser(sessionToken))

    if (error) {
      console.error(`${this.loggerPrefix}getSessionAndUser:`, error.message)
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }

    if (!sessionAndUser) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'Session and User not found' })
    }

    const { adapterSession, adapterUser } = sessionAndUser
    return res.status(HttpStatus.OK).json({
      session: adapterSession,
      user: adapterUser,
    })
  }

  @Post()
  public async createSession(@Res() res: Response, @Body() data: AdapterSession): Promise<Response<AdapterSession>> {
    const [error, session] = await catchErrorTyped(this.sessionService.createSession(data))

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }
    console.log(`${this.loggerPrefix}createSession`, session)
    return res.status(HttpStatus.CREATED).json(session)
  }
}
