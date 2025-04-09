import { Service } from '@/service'
import { catchErrorTyped } from '@/utils/error.util'
import { IdentificationTokenDto } from '@/verification-token/dto/identifier-token.dto'
import { VerificationTokenService } from '@/verification-token/verification-token.service'
import { Body, Controller, Delete, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { VerificationToken } from '@typesaas/prisma'
import { Response } from 'express'

@Controller('api/v1/verificationTokens')
export class VerificationTokenController extends Service {
  public constructor(private readonly verificationTokenService: VerificationTokenService) {
    super()
  }

  @Post()
  public async createVerificationToken(@Res() res: Response, @Body() data: VerificationToken): Promise<Response> {
    const [error, token] = await catchErrorTyped(this.verificationTokenService.createVerificationToken(data))

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }

    console.log(`${this.loggerPrefix}::useVerificationToken`, token)
    return res.status(HttpStatus.CREATED).json(token)
  }

  @Delete(':identificationToken')
  public async useVerificationToken(
    @Res() res: Response,
    @Param('identifier_token') identificationToken: IdentificationTokenDto,
  ): Promise<Response> {
    const [error, token] = await catchErrorTyped(
      this.verificationTokenService.useVerificationToken(identificationToken),
    )

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }

    return res.status(HttpStatus.OK).json(token)
  }
}
