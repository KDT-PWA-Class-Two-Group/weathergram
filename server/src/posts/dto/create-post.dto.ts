import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiPropertyOptional({ description: '게시글 내용', maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  content?: string;
}