import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  // 보안 헤더
  app.use(helmet())

  // CORS: .env에서 CLIENT_URL 가져오기
  app.enableCors({
    origin: [configService.get<string>('CLIENT_URL')],
    credentials: true,
  })

  // 공통 prefix -> /api/...
  app.setGlobalPrefix('api')

  // 포트도 .env에서 불러오기
  const PORT = configService.get<number>('PORT') || 8080
  await app.listen(PORT)
  console.log(`Nest server on http://localhost:${PORT}`)
}
bootstrap()