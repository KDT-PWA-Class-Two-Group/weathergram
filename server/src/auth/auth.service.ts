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
}