import { Service } from '@/service'
import { GetAccount } from '@/users/dto/get-account.dto'
import { GetUserByAccountOrEmailDto } from '@/users/dto/get-user-by-account.dto'
import { UsersService } from '@/users/users.service'
import { catchErrorTyped } from '@/utils/error.util'
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common'
import { AdapterAccount, AdapterUser } from '@typesaas/schemas'
import type { Response } from 'express'

@Controller('api/v1/users')
export class UsersController extends Service {
  public constructor(private readonly usersService: UsersService) {
    super()
  }

  @Post('create')
  public async create(@Res() res: Response, @Body() createUserDto: AdapterUser): Promise<Response> {
    const [error, user] = await catchErrorTyped(this.usersService.create(createUserDto))

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message })
    }

    return res.status(HttpStatus.CREATED).json(user)
  }

  @Get('filter')
  public async getByAccountOrEmail(
    @Res() res: Response,
    @Query('provider') provider?: string,
    @Query('providerAccountId') providerAccountId?: string,
    @Query('email') email?: string,
  ): Promise<Response> {
    const [error, data] = await catchErrorTyped(
      this.usersService.getByAccountOrEmail(new GetUserByAccountOrEmailDto(provider, providerAccountId, email)),
    )

    if (error) {
      console.error(`${this.loggerPrefix}::getByAccountOrEmail: `, error.message)
      return res.status(HttpStatus.BAD_REQUEST).send()
    }
    console.log(`${this.loggerPrefix}::getByAccountOrEmail`, data)
    return res.status(HttpStatus.OK).json(data)
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: AdapterUser): Promise<AdapterUser> {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  public async remove(@Res() res: Response, @Param('id') id: string): Promise<Response> {
    const [error, isDeleted] = await catchErrorTyped(this.usersService.remove(id))

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).send()
    }

    if (!isDeleted) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' })
    }

    return res.status(HttpStatus.OK).json({ message: 'User deleted successfully' })
  }

  @Post('link')
  public async linkAccount(@Res() res: Response, @Body() data: AdapterAccount): Promise<Response> {
    const [error, user] = await catchErrorTyped(this.usersService.linkAccount(data))

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).send()
    }

    console.log(`${this.loggerPrefix}::linkAccount`, user)

    return res.status(HttpStatus.OK).json(user)
  }

  @Patch('unlink')
  public async unlinkAccount(@Res() res: Response, @Body() data: GetAccount): Promise<Response> {
    const [error, user] = await catchErrorTyped(this.usersService.unlinkAccount(data))

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).send()
    }

    return res.status(HttpStatus.OK).json(user)
  }
}
