import { CommonLocationDto } from './common-location.dto';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetWeeklyForecastDto extends CommonLocationDto {
<<<<<<< HEAD
  // NOTE: /data/2.5/forecast supports up to 5 days (3-hourly data) via cnt (default 5)
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 5))
  @IsInt()
  @Min(1)
  @Max(5)
  cnt?: number = 5;
}
=======
  // NOTE: /data/2.5/forecast/daily supports up to 16 days via cnt (default 7)
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 7))
  @IsInt()
  @Min(1)
  @Max(16)
  cnt?: number = 7;
}
>>>>>>> myjin0806/issue25
