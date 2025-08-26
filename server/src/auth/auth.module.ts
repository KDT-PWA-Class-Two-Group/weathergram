import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SocialAccountsModule } from '../social-accounts/social-accounts.module';
import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { NaverStrategy } from './strategies/naver.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, UsersModule, SocialAccountsModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, KakaoStrategy, NaverStrategy, JwtStrategy],
})
export class AuthModule {}
