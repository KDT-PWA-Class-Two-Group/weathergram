import axios from "axios";

export const fetchCurrentWeather = async ({ lat, lon }) => {
  const res = await axios.get("http://localhost:8080/weather/current", {
    params: { lat, lon },
  });
  return res.data;
};