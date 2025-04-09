import { VerificationTokenController } from '@/verification-token/verification-token.controller'
import { VerificationTokenService } from '@/verification-token/verification-token.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [VerificationTokenController],
  providers: [VerificationTokenService],
})
export class VerificationTokenModule {}
