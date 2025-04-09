import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { PrismaService } from '@/prisma/prisma.service'
import { SessionModule } from '@/session/session.module'
import { SubscriptionsModule } from '@/subscriptions/subscriptions.module'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [UsersModule, SubscriptionsModule, SessionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
