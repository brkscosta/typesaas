import { PrismaService } from '@/prisma/prisma.service'
import { Service } from '@/service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SubscriptionsService extends Service {
  public constructor(private readonly prisma: PrismaService) {
    super()
  }

  public getActiveSubscription(userId: string): string {
    return ''
  }
}
