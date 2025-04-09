import { PrismaService } from '@/prisma/prisma.service'
import { UsersController } from '@/users/users.controller'
import { UsersService } from '@/users/users.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class UsersModule {}
