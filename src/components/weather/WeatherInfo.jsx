import { useEffect, useState } from "react";
import "./WeatherInfo.css";
import { getBrowserLocation } from "../../utils/location";
import { fetchCurrentWeather } from "../../api/weather";
import { WeatherInfoView } from "./WeatherInfoView";

export function WeatherInfo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { lat, lon } = await getBrowserLocation();
        console.log("좌표:", lat, lon);
        const res = await fetchCurrentWeather({ lat, lon });
        setData(res);
      } catch (e) {
        console.error("현재 날씨 불러오기 실패:", e);
        setError(e);
      }
    })();
  }, []);

  if (error)
    return <div className="weather-info-box">데이터를 불러오지 못했어요.</div>;
  if (!data) return <div className="weather-info-box">로딩 중...</div>;

  const props = {
    location: data?.name ?? "-",
    temp: data?.main?.temp ?? 0,
    tempMin: data?.main?.temp_min ?? 0,
    tempMax: data?.main?.temp_max ?? 0,
    weather: data?.weather?.[0]?.main ?? "없음",
    feelsLike: data?.main?.feels_like ?? 0,
    humidity: data?.main?.humidity ?? 0,
    wind: data?.wind?.speed ?? 0,
  };

  return <WeatherInfoView {...props} />;
}

export default WeatherInfo;
