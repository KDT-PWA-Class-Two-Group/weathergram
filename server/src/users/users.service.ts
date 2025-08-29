import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

type CreateFromProviderInput = {
  provider: 'google';
  providerId: string;
  email?: string | null;
  name?: string | null;
  avatar?: string | null;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>) { }

  async findPostsByUserId(userId: number) {
    return this.repo.findOne({ where: { id: userId }, relations: ['posts'] });
  }

  async findByIdWithPosts(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['posts'] });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findByProvider(provider: string, providerId: string) {
    return this.repo.findOne({ where: { provider, providerId } });
  }

  async createFromProvider(input: CreateFromProviderInput) {
    const user = this.repo.create({
      provider: input.provider,
      providerId: input.providerId,
      email: input.email ?? null,
      name: input.name ?? null,
      avatar: input.avatar ?? null,
    });
    return this.repo.save(user);
  }

  async upsertByProvider(input: CreateFromProviderInput) {
    const existed = await this.findByProvider(input.provider, input.providerId);
    if (existed) return existed;
    return this.createFromProvider(input);
  }

  async touchLastLogin(id: number) {
    await this.repo.update({ id }, { lastLoginAt: new Date() });
    return this.findById(id);
  }
}