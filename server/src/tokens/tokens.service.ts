import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id };
    const secret = this.config.get<string>('JWT_SECRET') || 'dev-secret';
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN') || '1h',
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = { sub: user.id };
    const secret =
      this.config.get<string>('JWT_REFRESH_SECRET') ||
      this.config.get<string>('JWT_SECRET') ||
      'dev-secret';
    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
    });
    const entity = this.refreshRepo.create({ token, user });
    await this.refreshRepo.save(entity);
    return token;
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);
    return { accessToken, refreshToken };
  }
}
