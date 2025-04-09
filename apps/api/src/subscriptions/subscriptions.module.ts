import { PrismaService } from '@/prisma/prisma.service'
import { SubscriptionsController } from '@/subscriptions/subscriptions.controller'
import { SubscriptionsService } from '@/subscriptions/subscriptions.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [SubscriptionsController],
  providers: [PrismaService, SubscriptionsService],
})
export class SubscriptionsModule {}
