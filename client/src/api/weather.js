import axios from "axios";

export const fetchCurrentWeather = async ({ lat, lon }) => {
  const res = await axios.get("http://localhost:8080/weather/current", {
    params: { lat, lon },
  });
  return res.data;
};

export const fetchHourlyForecast = async ({ lat, lon, cnt = 8 }) => {
  const res = await axios.get("http://localhost:8080/weather/hourly", {
    params: { lat, lon, cnt },
  });
  return res.data;
};

export const fetchWeeklyForecast = async ({ lat, lon, cnt = 7 }) => {
  const res = await axios.get("http://localhost:8080/weather/weekly", {
    params: { lat, lon, cnt },
  });
  return res.data;
};