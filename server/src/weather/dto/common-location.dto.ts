import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CommonLocationDto {
  @IsOptional()
  @IsString()
  city?: string;           

  @IsOptional()
  @IsString()
  country?: string;  

  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber()
  lat?: number;

  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsNumber()
  lon?: number;
}
