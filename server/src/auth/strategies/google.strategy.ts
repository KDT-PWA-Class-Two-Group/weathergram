import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const cb = process.env.GOOGLE_CALLBACK_URL!;
    console.log('[GoogleStrategy] callbackURL =', cb);
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: cb,
      scope: ['profile', 'email'],
    });
  }

  // 구글 검증 성공 시 호출: return 값이 req.user가 됨
  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value ?? null;
    return {
      provider: 'google',
      providerId: profile.id,
      email,
      name: profile.displayName,
      avatar: profile.photos?.[0]?.value ?? null,
    };
  }
}