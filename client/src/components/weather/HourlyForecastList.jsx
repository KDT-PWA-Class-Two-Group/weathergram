import React from "react";
import "./HourlyForecastList.css";

// 예시 데이터: [{hour, weather, temp, pop}]
const sampleData = [
  { hour: "00시", weather: "clouds", temp: 22, pop: 0 },
  { hour: "01시", weather: "clouds", temp: 21, pop: 0 },
  { hour: "02시", weather: "clear", temp: 23, pop: 10 },
  { hour: "03시", weather: "clear", temp: 27, pop: 0 },
  { hour: "04시", weather: "clear", temp: 29, pop: 10 },
  { hour: "05시", weather: "clouds", temp: 30, pop: 20 },
  { hour: "06시", weather: "rain", temp: 26, pop: 60 },
  { hour: "07시", weather: "clouds", temp: 24, pop: 0 },
  { hour: "08시", weather: "clouds", temp: 22, pop: 0 },
  { hour: "09시", weather: "rain", temp: 21, pop: 30 },
  { hour: "10시", weather: "rain", temp: 23, pop: 20 },
  { hour: "11시", weather: "clear", temp: 27, pop: 0 },
];


function getWeatherIconUrl(weather) {
  switch (weather) {
    case 'clear':
      return '/images/wea-ico/clear.svg';
    case 'clouds':
      return '/images/wea-ico/clouds.svg';
    case 'rain':
      return '/images/wea-ico/rain.svg';
    case 'snow':
      return '/images/wea-ico/snow.svg';
    case 'thunderstorm':
      return '/images/wea-ico/thunderstorm.svg';
    default:
      return '/images/wea-ico/cloudy.svg';
  }
}

function HourlyForecastList({ data = sampleData }) {
  return (
    <div className="hourly-forecast-list">
      <div className="hourly-forecast-title">시간별 예보</div>
      <div className="hourly-forecast-row">
        {data.map((item, idx) => (
          <div key={idx} className="hourly-forecast-item">
            <div className="hourly-forecast-hour">{item.hour}</div>
            <div className="hourly-forecast-icon">
              <img src={getWeatherIconUrl(item.weather)} alt={item.weather} />
            </div>
            <div className="hourly-forecast-temp">{item.temp}°</div>
            <div className="hourly-forecast-pop">{`${item.pop}%`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecastList;