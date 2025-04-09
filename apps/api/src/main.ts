import { AppModule } from '@/app.module'
import { NestFactory } from '@nestjs/core'
import { env } from '@typesaas/env'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()

  await app.listen(env.BACKEND_PORT).then(() => {
    console.log(`Listening on  http://localhost:${env.BACKEND_PORT} in ${env.NODE_ENV} mode`)
  })
}

bootstrap()
