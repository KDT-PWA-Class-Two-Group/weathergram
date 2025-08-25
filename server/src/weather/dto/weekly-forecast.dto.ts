import { CommonLocationDto } from './common-location.dto';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetWeeklyForecastDto extends CommonLocationDto {
  // NOTE: /data/2.5/forecast/daily supports up to 16 days via cnt (default 7)
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 7))
  @IsInt()
  @Min(1)
  @Max(16)
  cnt?: number = 7;
}
