import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetCurrentWeatherDto } from './dto/current-weather.dto';
import { GetHourlyForecastDto } from './dto/hourly-forecast.dto';
import { GetWeeklyForecastDto } from './dto/weekly-forecast.dto';

type Coords = { lat: number; lon: number };

@Injectable()
export class WeatherService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('OPENWEATHER_BASE_URL', 'https://api.openweathermap.org');
    this.apiKey = this.config.get<string>('OPENWEATHER_API_KEY')!;
  }

  /** 좌표 결정: (lat,lon) 제공 시 사용, 아니면 Geocoding(q=city,country) */
  private async resolveCoords(input: { city?: string; country?: string; lat?: number; lon?: number }): Promise<Coords> {
    if (typeof input.lat === 'number' && typeof input.lon === 'number') {
      return { lat: input.lat, lon: input.lon };
    }
    if (!input.city) {
      throw new HttpException('Provide either (lat,lon) or city(,country).', HttpStatus.BAD_REQUEST);
    }
    const q = input.country ? `${input.city},${input.country}` : input.city;
    const url = `${this.baseUrl}/geo/1.0/direct`;
    const params = { q, limit: 1, appid: this.apiKey };

    const { data } = await firstValueFrom(this.http.get(url, { params }));
    if (!Array.isArray(data) || data.length === 0) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }
    const { lat, lon } = data[0];
    return { lat, lon };
  }

  /** 현재 날씨 */
  async getCurrentWeather(query: GetCurrentWeatherDto) {
    const { lat, lon } = await this.resolveCoords(query);
    const url = `${this.baseUrl}/data/2.5/weather`;
    const params = {
      lat,
      lon,
      units: 'metric',
      lang: 'kr',
      appid: this.apiKey,
    };

    try {
      const { data } = await firstValueFrom(this.http.get(url, { params }));
      const nameKo = await this.getKoreanCityName(lat, lon);
      const mapped = this.mapCurrentWeather(data);
      if (nameKo) {
        mapped.name = nameKo; // 한글 도시명으로 교체
      }
      return mapped;
    } catch (e: any) {
      const status = e?.response?.status ?? 500;
<<<<<<< HEAD
      const message = e?.response?.data ?? 'API 현재 날씨 오류';
=======
      const message = e?.response?.data ?? 'OpenWeather current weather error';
>>>>>>> myjin0806/issue25
      throw new HttpException(message, status);
    }
  }

  /** 3시간 단위 예보 */
  async getHourlyForecast(query: GetHourlyForecastDto) {
    const { lat, lon } = await this.resolveCoords(query);
    const url = `${this.baseUrl}/data/2.5/forecast`;
    const params = {
      lat,
      lon,
      units: 'metric',
      lang: 'kr',
      cnt: query.cnt ?? 8,
      appid: this.apiKey,
    };

    try {
      const { data } = await firstValueFrom(this.http.get(url, { params }));
      return this.mapHourlyForecast(data);
    } catch (e: any) {
      const status = e?.response?.status ?? 500;
<<<<<<< HEAD
      const message = e?.response?.data ?? 'API 시간별 예보 오류';
      throw new HttpException(message, status);
    }
  }

  /** 5일(3시간 간격) 데이터를 일별 요약으로 변환하여 반환 */
  async getWeeklyForecast(query: GetWeeklyForecastDto) {
    const { lat, lon } = await this.resolveCoords(query);
    const url = `${this.baseUrl}/data/2.5/forecast`;
    const params = {
      lat,
      lon,
      units: 'metric',
      lang: 'kr',
      // 최대치(5일 * 8개 = 40개). cnt를 명시하면 일부 지역에서 예외적으로 더 적게 오는 경우가 줄어듭니다.
      cnt: 40,
      appid: this.apiKey,
    } as const;

    console.log('[weekly] 요청 URL:', url);
  console.log('[weekly] 요청 파라미터:', params);
  console.log('[weekly] API KEY prefix:', (this.apiKey || '').slice(0, 6) + '****');

    try {
      const { data } = await firstValueFrom(this.http.get(url, { params }));
          console.log('[weekly] OpenWeather 응답 keys:', Object.keys(data));
      const list = Array.isArray(data?.list) ? data.list : [];
      const tzOffsetSec = data?.city?.timezone ?? 0;
      const days = Math.min(Math.max(query.cnt ?? 5, 1), 5);

      // 일별로 집계(정오 기준 대표 날씨, 최저/최고, pop은 일중 최대). 
      // 반환 형태는 클라이언트가 기존 daily 매퍼를 재사용할 수 있도록 OpenWeather daily 유사 형태로 맞춘다.
      const daily = this.aggregate3hToDailyForClient(list, tzOffsetSec, days);

      // 클라이언트의 유연한 처리(`res.list || res.daily || res`)를 고려해 list 키로 감싼다.
      return { list: daily, city: { timezone: tzOffsetSec } };
    } catch (e: any) {
      const status = e?.response?.status ?? 500;
      const message = e?.response?.data ?? 'API 주간 예보 오류';
=======
      const message = e?.response?.data ?? 'OpenWeather hourly forecast error';
>>>>>>> myjin0806/issue25
      throw new HttpException(message, status);
    }
  }

  // --- mappers ---
  private mapCurrentWeather(data: any) {
    return {
      coord: data?.coord ?? null,
      name: data?.name ?? null,
      country: data?.sys?.country ?? null,
      timezone: data?.timezone ?? null,
      dt: data?.dt ?? null,
      main: {
        temp: data?.main?.temp ?? null,
        feels_like: data?.main?.feels_like ?? null,
        temp_min: data?.main?.temp_min ?? null,
        temp_max: data?.main?.temp_max ?? null,
        pressure: data?.main?.pressure ?? null,
        humidity: data?.main?.humidity ?? null,
      },
      wind: data?.wind ?? null,
      weather: Array.isArray(data?.weather) ? data.weather.map((w: any) => ({
        id: w.id, main: w.main, description: w.description, icon: w.icon,
      })) : [],
      clouds: data?.clouds ?? null,
      visibility: data?.visibility ?? null,
    };
  }

  private mapHourlyForecast(data: any) {
    return {
      city: data?.city?.name ?? null,
      timezone: data?.city?.timezone ?? null,
      list: Array.isArray(data?.list)
        ? data.list.map((item: any) => ({
            dt: item?.dt ?? null,
            main: {
              temp: item?.main?.temp ?? null,
              feels_like: item?.main?.feels_like ?? null,
              humidity: item?.main?.humidity ?? null,
            },
            weather: Array.isArray(item?.weather)
              ? item.weather.map((w: any) => ({
                  id: w.id,
                  main: w.main,
                  description: w.description,
                  icon: w.icon,
                }))
              : [],
            pop: item?.pop ?? 0,
          }))
        : [],
    };
  }

<<<<<<< HEAD
  private normalizeWeather(main: string) {
    const m = (main || 'Clouds').toLowerCase();
    if (m.includes('clear')) return 'Clear';
    if (m.includes('thunder')) return 'Thunderstorm';
    if (m.includes('snow')) return 'Snow';
    if (m.includes('rain') || m.includes('drizzle')) return 'Rain';
    if (m.includes('cloud')) return 'Clouds';
    return 'Clouds';
  }

  /**
   * 3시간 간격 예보(list) -> OpenWeather daily 유사 구조로 집계
   * - 날짜 그룹핑: 응답의 city.timezone(초)을 적용한 로컬 날짜 기준
   * - 대표 날씨: 정오(12:00) 항목, 없다면 12:00에 가장 가까운 항목
   * - 최저/최고: 그날의 모든 항목 중 temp_min/ temp_max (없으면 temp) 극값
   * - pop: 그날의 최대값 (0..1)
   */
  private aggregate3hToDailyForClient(list: any[] = [], tzOffsetSec = 0, limitDays = 5) {
    // 날짜별 그룹핑
    const byDate = new Map<string, any[]>();
    for (const item of list) {
      const localMs = (item.dt + tzOffsetSec) * 1000; // 로컬 기준 ms
      const d = new Date(localMs);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      if (!byDate.has(key)) byDate.set(key, []);
      byDate.get(key)!.push({ ...item, __local: d });
    }

    const daily: any[] = [];
    for (const [key, items] of byDate.entries()) {
      if (!items.length) continue;

      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;
      let popMax = 0; // 0..1

      // 정오(12:00)과의 분 차이가 최소인 항목 선택
      let noonCandidate = items[0];
      let bestDelta = Number.POSITIVE_INFINITY;

      for (const it of items) {
        const tMin = it.main?.temp_min ?? it.main?.temp ?? 0;
        const tMax = it.main?.temp_max ?? it.main?.temp ?? 0;
        if (tMin < min) min = tMin;
        if (tMax > max) max = tMax;

        const pop = it.pop ?? 0; // 0..1
        if (pop > popMax) popMax = pop;

        const hour = it.__local.getUTCHours();
        const minute = it.__local.getUTCMinutes();
        const delta = Math.abs((hour * 60 + minute) - (12 * 60));
        if (delta < bestDelta) {
          bestDelta = delta;
          noonCandidate = it;
        }
      }

      const main = this.normalizeWeather(noonCandidate?.weather?.[0]?.main ?? 'Clouds');

      // 대표 시각의 원본 UTC dt를 그대로 사용 (클라이언트에서 요일 라벨링 시 활용 가능)
      const representativeDt = noonCandidate?.dt ?? Math.floor((items[0].__local.getTime() - tzOffsetSec * 1000) / 1000);

      daily.push({
        dt: representativeDt,
        temp: { min: Math.round(min * 10) / 10, max: Math.round(max * 10) / 10 },
        weather: [{ main }],
        pop: popMax, // 0..1 유지 (클라이언트에서 *100 처리)
        _key: key,   // 디버그용(옵션)
      });
    }

    daily.sort((a, b) => (a._key as string).localeCompare(b._key as string));
    return daily.slice(0, Math.min(Math.max(limitDays ?? 5, 1), 5));
  }

=======
>>>>>>> myjin0806/issue25
  /** Reverse Geocoding으로 한글 도시명 조회 (없으면 null) */
  private async getKoreanCityName(lat: number, lon: number): Promise<string | null> {
    const url = `${this.baseUrl}/geo/1.0/reverse`;
    const params = { lat, lon, limit: 1, lang: 'kr', appid: this.apiKey };
    try {
      const { data } = await firstValueFrom(this.http.get(url, { params }));
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const localKo = item?.local_names?.ko;
        if (typeof localKo === 'string' && localKo.length > 0) {
          return localKo;
        }
        return item?.name ?? null;
      }
      return null;
    } catch (_e) {
      return null; // 실패해도 영문명으로 fallback
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> myjin0806/issue25
