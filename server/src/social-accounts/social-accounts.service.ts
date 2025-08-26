import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialAccount } from './entities/social-account.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SocialAccountsService {
  constructor(
    @InjectRepository(SocialAccount)
    private readonly socialRepo: Repository<SocialAccount>,
    private readonly usersService: UsersService,
  ) {}

  async findOrCreate(provider: string, providerId: string): Promise<User> {
    let account = await this.socialRepo.findOne({
      where: { provider, providerId },
      relations: ['user'],
    });
    if (account) {
      return account.user;
    }

    const user = await this.usersService.createRaw({
      userId: `${provider}_${providerId}`,
      password: '',
    });
    account = this.socialRepo.create({ provider, providerId, user });
    await this.socialRepo.save(account);
    return user;
  }
}
