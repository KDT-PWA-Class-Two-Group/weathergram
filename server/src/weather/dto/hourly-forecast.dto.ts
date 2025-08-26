import { CommonLocationDto } from './common-location.dto';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetHourlyForecastDto extends CommonLocationDto {
  // 가져올 3시간 단위 데이터 개수 (기본 8개 = 24시간, 최대 40개 = 5일치)
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 8))
  @IsInt()
  @Min(1)
  @Max(40)
  cnt?: number = 8;
}
