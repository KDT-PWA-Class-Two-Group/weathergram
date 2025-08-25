import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createRaw(body: { userId: string; password: string }) {
    const user = new User();
    user.userId = body.userId;
    user.password = body.password;
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }
}