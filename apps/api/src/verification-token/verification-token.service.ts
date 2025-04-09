import { TokenAlreadyUsedOrDeleted } from '@/prisma/errors/token-already-used-or-deleted.error'
import { PrismaService } from '@/prisma/prisma.service'
import { IdentificationTokenDto } from '@/verification-token/dto/identifier-token.dto'
import { VericationTokenDto } from '@/verification-token/dto/verification-token.dto'
import { Injectable } from '@nestjs/common'
import { type VerificationToken } from '@typesaas/prisma'
import { verificationTokenSchema } from '@typesaas/schemas'

@Injectable()
export class VerificationTokenService {
  public constructor(private readonly prisma: PrismaService) {}

  public async createVerificationToken(data: VerificationToken): Promise<VerificationToken> {
    const res = await this.createToken(data)

    const verificationTokenCopy = {
      ...res,
      expires: new Date(res.expires),
    }
    return verificationTokenSchema.parse(verificationTokenCopy)
  }

  public async useVerificationToken({
    identifier_token: { identifier, token },
  }: IdentificationTokenDto): Promise<VericationTokenDto> {
    try {
      const verificationToken = await this.useToken({ identifier, token })
      return verificationTokenSchema.parse(verificationToken)
    } catch (error) {
      if (error instanceof TokenAlreadyUsedOrDeleted && error.code === 'P2025') {
        throw new TokenAlreadyUsedOrDeleted()
      }
      return {
        identifier: null,
        token: null,
        expires: null,
      }
    }
  }

  private createToken(data: VerificationToken): Promise<VerificationToken> {
    return this.prisma.verificationToken.create({ data })
  }

  private async useToken({ identifier, token }: Omit<VerificationToken, 'expires'>): Promise<VerificationToken> {
    return this.prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    })
  }
}
