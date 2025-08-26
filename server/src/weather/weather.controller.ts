import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetCurrentWeatherDto } from './dto/current-weather.dto';
import { GetHourlyForecastDto } from './dto/hourly-forecast.dto';
import { GetWeeklyForecastDto } from './dto/weekly-forecast.dto';


@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  /**
<<<<<<< HEAD
   * GET api/weather/current?city=Daejeon&country=KR
   * or GET api/weather/current?lat=36.35&lon=127.38
=======
   * GET /weather/current?city=Daejeon&country=KR
   * or GET /weather/current?lat=36.35&lon=127.38
>>>>>>> myjin0806/issue25
   */
  @Get('current')
  async current(@Query() query: GetCurrentWeatherDto) {
    return this.weatherService.getCurrentWeather(query);
  }

  /**
<<<<<<< HEAD
   * GET api/weather/hourly?lat=36.35&lon=127.38&cnt=8
=======
   * GET /weather/hourly?lat=36.35&lon=127.38&cnt=8
>>>>>>> myjin0806/issue25
   */
  @Get('hourly')
  async hourly(@Query() query: GetHourlyForecastDto) {
    return this.weatherService.getHourlyForecast(query);
  }
<<<<<<< HEAD

  /**
   * GET api/weather/weekly?lat=36.35&lon=127.38&cnt=5
   */
  @Get('weekly')
  async weekly(@Query() query: GetWeeklyForecastDto) {
    return this.weatherService.getWeeklyForecast(query);
  }
}
=======
}
>>>>>>> myjin0806/issue25
