import { AppService } from '@/app.service'
import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('/health')
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Get()
  public async getHello(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).json(this.appService.getServerInfo())
  }
}
