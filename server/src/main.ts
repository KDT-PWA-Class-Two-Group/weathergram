import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 필드 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 필드가 있으면 에러 발생
      transform: true, // 요청 데이터를 DTO로 변환
    }),
  )

  // Swagger 설정
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Weathergram API')
    .setDescription('Weathergram API 문서')
    .setVersion('1.0.0')
    .addBearerAuth() // JWT 인증 추가
    .build()
  
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 인증 정보 유지
    },
  })

  // 포트도 .env에서 불러오기
  const PORT = configService.get<number>('PORT') || 8080
  await app.listen(PORT)
  console.log(`Nest server on http://localhost:${PORT}`)
}
bootstrap()