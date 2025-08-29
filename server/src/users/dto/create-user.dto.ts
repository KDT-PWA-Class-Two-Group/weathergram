import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '소셜 로그인 제공자', example: 'google' })
  @IsString()
  provider: string;

  @ApiProperty({ description: '제공자 내 고유 사용자 ID', example: '111510976031926621821' })
  @IsString()
  providerId: string;

  @ApiProperty({ description: '사용자 이메일', example: 'choijjunii1@gmail.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: '사용자 이름', example: '최현준', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: '프로필 이미지 URL', example: 'https://lh3.googleusercontent.com/a/...', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;
}