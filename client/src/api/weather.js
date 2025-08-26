import axios from "axios";

export const fetchCurrentWeather = async ({ lat, lon }) =>
  (await axios.get('/api/weather/current', { params: { lat, lon } })).data;

export const fetchHourlyForecast = async ({ lat, lon, cnt = 8 }) =>
  (await axios.get('/api/weather/hourly', { params: { lat, lon, cnt } })).data;

export const fetchWeeklyForecast = async ({ lat, lon, city, country, cnt = 5 }) =>
  (await axios.get("/api/weather/weekly", { params: { lat, lon, city, country, cnt } })).data;