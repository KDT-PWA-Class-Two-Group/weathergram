import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const rawOrigins = configService.get<string>('CLIENT_URLS') || configService.get<string>('CLIENT_URL') || '';
  const allowedOrigins = rawOrigins
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  // 개발 편의상 기본 허용 (Vite/CRA): 없으면  http://localhost:5173, http://localhost:3000
  if (allowedOrigins.length === 0) {
    allowedOrigins.push('http://localhost:5173', 'http://localhost:3000');
  }

  // 보안 헤더
  app.use(helmet())

  // CORS: .env에서 CLIENT_URL 가져오기
  app.enableCors({
    origin: (origin, callback) => {
      // allow non-browser tools (Postman) with no origin
      if (!origin) return callback(null, true);
      callback(null, allowedOrigins.includes(origin));
    },
    credentials: true,
  });

  // 모든 API 경로는 /api/* 로 노출
  app.setGlobalPrefix('api');

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
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 인증 정보 유지
    },
  })

  // 포트도 .env에서 불러오기
  const PORT = configService.get<number>('PORT') || 8080
  await app.listen(PORT)
  console.log(`Nest server on http://localhost:${PORT}`);
  console.log(`Docs: http://localhost:${PORT}/api/docs`);
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
}
bootstrap()