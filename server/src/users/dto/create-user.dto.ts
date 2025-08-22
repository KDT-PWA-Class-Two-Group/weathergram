import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 ID(나중에 유효성검사)',
    example: 'user123',
  })
  @IsString()
  userId: string;   

  @ApiProperty({
    description: '사용자 비밀번호(나중에 유효성검사 및 암호화)',
    example: 'password123',
  })
  @IsString()
  @MinLength(0)     
  password: string;
}