import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetCurrentWeatherDto } from './dto/current-weather.dto';
import { GetForecast3hDto } from './dto/hourly-forecast.dto';

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
      return this.mapCurrentWeather(data);
    } catch (e: any) {
      const status = e?.response?.status ?? 500;
      const message = e?.response?.data ?? 'OpenWeather current weather error';
      throw new HttpException(message, status);
    }
  }

  /** 3시간 간격 예보 (OpenWeather v2.5 /forecast) - 무료 플랜 */
  async getForecast3h(query: GetForecast3hDto) {
    const { cnt = 8 } = query; // 3시간 단위 개수 (기본 8개 = 24시간)
    const { lat, lon } = await this.resolveCoords(query);
  
    const url = `${this.baseUrl}/data/2.5/forecast`;
    const params = {
      lat,
      lon,
      units: 'metric',
      lang: 'kr',
      cnt, // 최대 40개 (5일치)
      appid: this.apiKey,
    };
  
    try {
      const { data } = await firstValueFrom(this.http.get(url, { params }));
      const list: any[] = Array.isArray(data?.list) ? data.list : [];
      const items = list.map(this.mapForecast3hItem);
      return {
        location: { lat, lon },
        intervalHours: 3,
        count: items.length,
        items,
      };
    } catch (e: any) {
      const status = e?.response?.status ?? 500;
      const message = e?.response?.data ?? 'OpenWeather 3-hour forecast error';
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

  private mapForecast3hItem = (f: any) => ({
    dt: f?.dt ?? null, // unix seconds
    temp: f?.main?.temp ?? null,
    feels_like: f?.main?.feels_like ?? null,
    humidity: f?.main?.humidity ?? null,
    pressure: f?.main?.pressure ?? null,
    wind_speed: f?.wind?.speed ?? null,
    wind_deg: f?.wind?.deg ?? null,
    pop: f?.pop ?? 0, // 강수확률
    rain_3h: f?.rain?.['3h'] ?? 0, // 최근 3시간 강수량(mm)
    snow_3h: f?.snow?.['3h'] ?? 0,
    weather: Array.isArray(f?.weather) ? f.weather.map((w: any) => ({
      id: w.id, main: w.main, description: w.description, icon: w.icon,
    })) : [],
  });
}
