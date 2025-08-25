import React, { useEffect, useState } from "react";
import "./WeeklyForecastList.css";
import { getBrowserLocation } from "../../utils/location";
import { fetchWeeklyForecast } from "../../api/weather";

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

function WeeklyForecastList() {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { lat, lon } = await getBrowserLocation();
        const res = await fetchWeeklyForecast({ lat, lon });
        setForecast(res);
      } catch (e) {
        console.error("주간 예보 불러오기 실패:", e);
        setError(e);
      }
    })();
  }, []);

  if (error)
    return <div className="weekly-forecast-list">데이터를 불러오지 못했어요.</div>;
  if (!forecast)
    return <div className="weekly-forecast-list">로딩 중...</div>;

  const data = (forecast.list ?? []).map((item) => {
    const date = new Date((item.dt + (forecast.timezone || 0)) * 1000);
    const day = ["일", "월", "화", "수", "목", "금", "토"][date.getUTCDay()];
    return {
      day,
      weather: item.weather?.[0]?.main?.toLowerCase() || "clouds",
      min: Math.round(item.temp?.min ?? 0),
      max: Math.round(item.temp?.max ?? 0),
      pop: Math.round((item.pop ?? 0) * 100),
    };
  });

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
              <div className="weekly-forecast-pop">{`${item.pop}%`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyForecastList;