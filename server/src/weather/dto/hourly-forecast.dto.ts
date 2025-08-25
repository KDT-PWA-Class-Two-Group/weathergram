import { CommonLocationDto } from './common-location.dto';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetHourlyForecastDto extends CommonLocationDto {
  // 가져올 시간 개수(기본 24시간, 최대 48시간: OWM OneCall hourly 한계)
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 24))
  @IsInt()
  @Min(1)
  @Max(48)
  hours?: number = 24;

  // 간격(시간). 2로 주면 2시간 단위로 down-sample
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 2))
  @IsInt()
  @Min(1)
  @Max(12)
  step?: number = 2;
}
