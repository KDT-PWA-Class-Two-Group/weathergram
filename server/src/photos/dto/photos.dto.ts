import { IsString,  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotosDto {
  @ApiProperty({
    description: '사용자 ID(나중에 유효성검사)',
    example: 'user123',
  })
  @IsString()
  userId: string;
} 