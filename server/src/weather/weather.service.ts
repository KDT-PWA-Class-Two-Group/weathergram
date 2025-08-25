import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetCurrentWeatherDto } from './dto/current-weather.dto';

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
      const message = e?.response?.data ?? 'OpenWeather current weather error';
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
}
