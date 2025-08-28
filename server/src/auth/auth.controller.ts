import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // 비워둬도 passport가 구글로 리다이렉트
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    // req.user는 google.strategy.ts의 validate() 반환값
    const user = await this.auth.validateOrCreateUser(req.user);

    // 서버에서 JWT 발급
    const { accessToken, refreshToken } = this.auth.issueTokens(user);

    // 쿠키로 전달(개발 기본값: httpOnly + sameSite=lax)
    res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'lax' });
    res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'lax' });

    // 프론트로 이동
    return res.redirect(`${process.env.FRONTEND_URL}/main`);
  }
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverLogin() {
    // passport가 네이버로 리다이렉트
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverCallback(@Req() req, @Res() res) {
    // req.user는 naver.strategy.ts의 validate() 반환값
    const user = await this.auth.validateOrCreateUser(req.user);

    // 서버에서 JWT 발급
    const { accessToken, refreshToken } = this.auth.issueTokens(user);

    // 쿠키로 전달(개발 기본값: httpOnly + sameSite=lax)
    res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'lax' });
    res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'lax' });

    // 프론트로 이동 (구글과 동일 경로 사용)
    return res.redirect(`${process.env.FRONTEND_URL}/main`);
  }
}