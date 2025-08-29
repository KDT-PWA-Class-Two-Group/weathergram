import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validateOrCreateUser(googleUser: any) {
    const user = await this.users.upsertByProvider({
      provider: 'google',
      providerId: googleUser.providerId,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.avatar,
    });

    await this.users.touchLastLogin(user.id);
    return user;
  }

  issueTokens(user: any) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwt.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwt.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  // 현재 사용자 프로필 조회
  async getProfile(userId: number) {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return { id: user.id, email: user.email, name: user.name, avatar: user.avatar };
  }

  // 리프레시 토큰으로 액세스 토큰 재발급
  async rotateTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('No refresh token provided');
    }
    let payload: any;
    try {
      payload = await this.jwt.verifyAsync(refreshToken);
    } catch {
      throw new Error('Invalid refresh token');
    }
    const user = await this.users.findById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    const { accessToken, refreshToken: newRefresh } = this.issueTokens(user);
    return { accessToken, refreshToken: newRefresh };
  }
}