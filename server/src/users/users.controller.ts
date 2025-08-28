import { Controller, Get, Req } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('me') // 나중에 @UseGuards(JwtAuthGuard) 추가
  getMe(@Req() req) {
    // JwtAuthGuard 적용 시 req.user = { sub, email, ... }
    return req.user ?? { message: 'JWT 가드 적용 후 사용하세요' };
  }
}