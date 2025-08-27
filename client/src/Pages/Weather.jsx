import WeatherInfo from "../components/weather/WeatherInfo";
import TodaysTopPhoto from "../components/weather/TodaysTopPhoto";
import HourlyForecastList from "../components/weather/HourlyForecastList";
import WeeklyForecastList from "../components/weather/WeeklyForecastList";

function Weather() {
  return (
    <div className="weather-page-root">
      <WeatherInfo />
      <TodaysTopPhoto />
      <HourlyForecastList />
      <WeeklyForecastList />
    </div>
  );
}

export default Weather;
