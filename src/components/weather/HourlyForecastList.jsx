import React, { useEffect, useState } from "react";
import "./HourlyForecastList.css";
import { getBrowserLocation } from "../../utils/location";
import { fetchHourlyForecast } from "../../api/weather";

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

function HourlyForecastList() {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { lat, lon } = await getBrowserLocation();
        const res = await fetchHourlyForecast({ lat, lon });
        setForecast(res);
      } catch (e) {
        console.error("시간별 예보 불러오기 실패:", e);
        setError(e);
      }
    })();
  }, []);

  if (error)
    return <div className="hourly-forecast-list">데이터를 불러오지 못했어요.</div>;
  if (!forecast)
    return <div className="hourly-forecast-list">로딩 중...</div>;

  const data = (forecast.list ?? []).map((item) => {
    const date = new Date((item.dt + (forecast.timezone || 0)) * 1000);
    const hour = date.getUTCHours().toString().padStart(2, "0");
    return {
      hour: `${hour}시`,
      weather: item.weather?.[0]?.main?.toLowerCase() || "clouds",
      temp: Math.round(item.main?.temp ?? 0),
      pop: Math.round((item.pop ?? 0) * 100),
    };
  });

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
