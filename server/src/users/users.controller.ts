import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      console.log('dto:', dto);
      const result = await this.usersService.createRaw({ userId: dto.userId, password: dto.password });
      console.log('User 데이터 저장 내용:', result);
      return { message: '저장 완료', ...result };
    } catch (err: any) {
      const msg = err?.message ?? 'Unknown error';
      console.error('User 데이터 저장 실패', msg);
      // 클라이언트가 어디에 쓰려다 실패했는지 확인할 수 있도록 에러를 그대로 노출
      throw new HttpException({ message: '저장 실패', detail: msg }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}