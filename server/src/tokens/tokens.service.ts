import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  create(data: Partial<RefreshToken>) {
    return this.refreshRepo.create(data);
  }

  async save(token: RefreshToken) {
    return this.refreshRepo.save(token);
  }

  async find(where: FindOptionsWhere<RefreshToken>) {
    return this.refreshRepo.find({ where });
  }

  async revokeById(id: string) {
    await this.refreshRepo.update(id, { revokedAt: new Date() });
  }
}