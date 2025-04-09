import { PrismaService } from '@/prisma/prisma.service'
import { SessionController } from '@/session/session.controller'
import { SessionService } from '@/session/session.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [SessionController],
  providers: [PrismaService, SessionService],
})
export class SessionModule {}
