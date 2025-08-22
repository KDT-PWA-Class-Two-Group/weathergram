import WeatherInfo from "../components/weather/WeatherInfo";
import TodaysTopPhoto from "../components/weather/TodaysTopPhoto";
import HourlyForecastList from "../components/weather/HourlyForecastList";


function Weather() {
  return (
    <div className="weather-page-root">
      <WeatherInfo />
      <TodaysTopPhoto />
      <HourlyForecastList />
    </div>
  );
}

export default Weather;