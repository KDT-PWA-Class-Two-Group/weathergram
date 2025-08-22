import { Body, Controller, Post, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

// 사용자 관련 API를 처리하는 컨트롤러
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '사용자 저장 API', description: '사용자를 DB에 저장합니다.' })
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

  // 유저 목록 조회이며 목록 조회할지 안할지 몰라서 만들어둠.
  @Get()
  @ApiOperation({ summary: '유저 목록 조회', description: 'DB에 저장된 모든 유저를 조회합니다.' })
  findAll() {
    return []; 
  }    
}