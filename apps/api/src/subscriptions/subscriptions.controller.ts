import { Service } from '@/service'
import { SubscriptionsService } from '@/subscriptions/subscriptions.service'
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('api/v1/subscriptions')
export class SubscriptionsController extends Service {
  public constructor(private readonly subscriptionsService: SubscriptionsService) {
    super()
  }

  @Post('update')
  public async handleWebhook(@Res() res: Response, @Body() event: any): Promise<Response> {
    return res.status(HttpStatus.OK).json({ message: 'Webhook received', event })
  }
}
