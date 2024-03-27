import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { AppModule } from './app.module'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const port = process.env.PORT
  app.listen(port)
}
bootstrap()

