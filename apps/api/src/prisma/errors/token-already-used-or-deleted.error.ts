import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class TokenAlreadyUsedOrDeleted extends PrismaClientKnownRequestError {
  public constructor() {
    super('Token already used or deleted', {
      code: 'P2025',
      clientVersion: '3.0.0',
    })
    this.message = 'Token already used or deleted'
  }
}
