import { IsString, MinLength } from 'class-validator';

export class CreateSaveDto {
  @IsString()
  userId: string;   

  @IsString()
  @MinLength(0)     
  password: string;
}