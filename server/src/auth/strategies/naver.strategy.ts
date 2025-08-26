import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('NAVER_CLIENT_ID') || '',
      clientSecret: config.get<string>('NAVER_CLIENT_SECRET') || '',
      callbackURL: config.get<string>('NAVER_CALLBACK_URL') || '',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const user = { provider: 'naver', providerId: profile.id };
    done(null, user);
  }
}
