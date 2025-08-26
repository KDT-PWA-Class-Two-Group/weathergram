import { Injectable } from '@nestjs/common';
import { SocialAccountsService } from '../social-accounts/social-accounts.service';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly socialAccountsService: SocialAccountsService,
    private readonly tokensService: TokensService,
  ) {}

  async socialLogin(profile: { provider: string; providerId: string }) {
    const user = await this.socialAccountsService.findOrCreate(
      profile.provider,
      profile.providerId,
    );
    return this.tokensService.generateTokens(user);
  }
}
