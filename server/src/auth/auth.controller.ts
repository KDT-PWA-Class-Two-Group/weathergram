import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  // 공통 쿠키 옵션 (개발/운영 분기)
  private get cookieOpts() {
    const isProd = process.env.NODE_ENV === 'production';
    const base = {
      httpOnly: true,
      sameSite: isProd ? 'none' : 'lax',
      secure: !!isProd,
      domain: process.env.COOKIE_DOMAIN || undefined,
      path: '/',
    };
    return {
      access: { ...base, maxAge: 1000 * 60 * 15 },         // 15분
      refresh: { ...base, maxAge: 1000 * 60 * 60 * 24 * 7 } // 7일
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // 비워둬도 passport가 구글로 리다이렉트
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const user = await this.auth.validateOrCreateUser(req.user);
    const { accessToken, refreshToken } = this.auth.issueTokens(user);

    res.cookie('access_token', accessToken, this.cookieOpts.access);
    res.cookie('refresh_token', refreshToken, this.cookieOpts.refresh);

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
    const user = await this.auth.validateOrCreateUser(req.user);
    const { accessToken, refreshToken } = this.auth.issueTokens(user);

    res.cookie('access_token', accessToken, this.cookieOpts.access);
    res.cookie('refresh_token', refreshToken, this.cookieOpts.refresh);

    return res.redirect(`${process.env.FRONTEND_URL}/main`);
  }

  // 현재 로그인한 사용자 정보
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Req() req) {
    return this.auth.getProfile(req.user.sub);
  }

  // 액세스 토큰 재발급
  @Post('refresh')
  async refresh(@Req() req, @Res() res) {
    const refreshToken = req.cookies?.refresh_token ?? req.body?.refreshToken;
    const { accessToken, refreshToken: newRefresh } = await this.auth.rotateTokens(refreshToken);

    res.cookie('access_token', accessToken, this.cookieOpts.access);
    res.cookie('refresh_token', newRefresh, this.cookieOpts.refresh);

    return res.status(200).json({ ok: true });
  }

  // 로그아웃
  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('access_token', this.cookieOpts.access);
    res.clearCookie('refresh_token', this.cookieOpts.refresh);
    return res.status(204).send();
  }
}