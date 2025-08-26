import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('KAKAO_CLIENT_ID') || '',
      clientSecret: config.get<string>('KAKAO_CLIENT_SECRET') || '',
      callbackURL: config.get<string>('KAKAO_CALLBACK_URL') || '',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const user = { provider: 'kakao', providerId: profile.id };
    done(null, user);
  }
}
