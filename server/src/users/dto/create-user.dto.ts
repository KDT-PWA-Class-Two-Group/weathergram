import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userId: string;   

  @IsString()
  @MinLength(0)     
  password: string;
}