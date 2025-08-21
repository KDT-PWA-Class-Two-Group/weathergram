// 유효성 검사 및 DTO 정의
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSaveDto {
  @IsString()
  id: string;

  @IsInt()
  @Min(0)
  password: string;

}