import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

/**
 * Naver OAuth Strategy
 * Guard 이름: 'naver'  → @UseGuards(AuthGuard('naver')) 와 매칭
 */
@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      callbackURL: process.env.NAVER_CALLBACK_URL!,
      // 네이버는 state 필수 권장
      state: true,
      // 프로필 필드(기본값으로 충분하지만 명시적으로 둠)
      // scope는 네이버 콘솔에서 동의항목으로 관리되므로 여기선 생략 가능
      passReqToCallback: false,
    });
  }

  /**
   * validate()
   * - 네이버에서 받은 프로필을 우리 서비스에서 사용할 표준 형태로 변환
   * - 반환 값은 req.user로 전달되어 controller의 callback 핸들러에서 사용됨
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    // passport-naver-v2 프로필 구조 참고
    // profile: { id, provider: 'naver', displayName, emails, photos, _json: { email, nickname, profile_image, ... } }

    const email = profile?.emails?.[0]?.value ?? profile?._json?.email ?? null;
    const nickname = profile?.displayName ?? profile?._json?.nickname ?? null;
    const avatarUrl = profile?.photos?.[0]?.value ?? profile?._json?.profile_image ?? null;

    return {
      provider: 'naver',
      providerId: String(profile?.id ?? ''),
      email,
      nickname,
      avatarUrl,

      // 필요시 서비스 로직에서 활용
      oauth: {
        accessToken,
        refreshToken,
      },
      rawProfile: profile,
    };
  }
}