import { CommonLocationDto } from './common-location.dto';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetWeeklyForecastDto extends CommonLocationDto {
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 7))
  @IsInt()
  @Min(1)
  @Max(7)
  cnt?: number = 7;
}
