import React from "react";
import "./WeeklyForecastList.css";

// 예시 데이터: [{day, weather, min, max, pop}]
const sampleData = [
  { day: "월", weather: "clear", min: 21, max: 29, pop: 10 },
  { day: "화", weather: "clouds", min: 22, max: 28, pop: 20 },
  { day: "수", weather: "rain", min: 20, max: 25, pop: 60 },
  { day: "목", weather: "clouds", min: 21, max: 27, pop: 30 },
  { day: "금", weather: "clear", min: 23, max: 30, pop: 0 },
  { day: "토", weather: "rain", min: 19, max: 24, pop: 50 },
  { day: "일", weather: "clear", min: 22, max: 31, pop: 0 },
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

function WeeklyForecastList({ data = sampleData }) {
  return (
    <div className="weekly-forecast-list">
      <div className="weekly-forecast-title">주간 예보</div>
      <div className="weekly-forecast-table">
        {data.map((item, idx) => (
          <div key={idx} className={`weekly-forecast-row${idx !== data.length - 1 ? '' : ' last'}`}>
            <div className="weekly-forecast-day">{item.day}</div>
            <div className="weekly-forecast-info">
              <div className="weekly-forecast-icon">
              <img src={getWeatherIconUrl(item.weather)} alt={item.weather} />
            </div>
              <span className="weekly-forecast-min">{item.min}°C /</span>
              <span className="weekly-forecast-max">{item.max}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyForecastList;