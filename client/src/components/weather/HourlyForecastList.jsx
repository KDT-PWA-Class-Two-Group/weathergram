import React from "react";
import "./HourlyForecastList.css";

// 예시 데이터: [{hour, icon, temp, pop}]
const sampleData = [
  { hour: "00시", icon: "🌙", temp: 22, pop: 0 },
  { hour: "03시", icon: "🌙", temp: 21, pop: 0 },
  { hour: "06시", icon: "🌤️", temp: 23, pop: 10 },
  { hour: "09시", icon: "☀️", temp: 27, pop: 0 },
  { hour: "12시", icon: "🌤️", temp: 29, pop: 10 },
  { hour: "15시", icon: "⛅", temp: 30, pop: 20 },
  { hour: "18시", icon: "🌧️", temp: 26, pop: 60 },
  { hour: "21시", icon: "🌙", temp: 24, pop: 0 },
  { hour: "24시", icon: "🌙", temp: 22, pop: 0 },
  { hour: "03시", icon: "🌧️", temp: 21, pop: 30 },
  { hour: "06시", icon: "🌦️", temp: 23, pop: 20 },
  { hour: "09시", icon: "☀️", temp: 27, pop: 0 },
];

function HourlyForecastList({ data = sampleData }) {
  return (
    <div className="hourly-forecast-list">
      <div className="hourly-forecast-title">시간별 예보</div>
      <div className="hourly-forecast-row">
        {data.map((item, idx) => (
          <div key={idx} className="hourly-forecast-item">
            <div className="hourly-forecast-hour">{item.hour}</div>
            <div className="hourly-forecast-icon">{item.icon}</div>
            <div className="hourly-forecast-temp">{item.temp}°</div>
            <div className="hourly-forecast-pop">{`💧${item.pop}%`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecastList;