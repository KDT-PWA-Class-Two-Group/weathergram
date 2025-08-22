
import './WeatherInfo.css';

// props: location, temp, tempMin, tempMax, icon, feelsLike, humidity, rain, wind
function WeatherInfo({ location = "둔산동", temp = 27, tempMin = 22, tempMax = 29, icon = "☀️", feelsLike = 28, humidity = 60, rain = 0, wind = 2.5}) {
  return (
    <div className="weather-info-box">
      {/* 상단: 위치, 온도, 최저/최고, 아이콘 */}
      <div className="weather-main">
        <div className='weather-main-info'>
          <div className="weather-location">{location}</div>
            <div className="weather-temp">{temp}°C</div>
            <span className="weather-minmax">
              {tempMin}°C / {tempMax}°C
            </span>
        </div>
        <div className="weather-icon">{icon}</div>
      </div>
      {/* 하단: 체감온도, 습도, 강수량, 풍속 */}
      <div className="weather-detail-row">
        <div className="weather-detail-item">
          <div>체감온도</div>
          <div>{feelsLike}°C</div>
        </div>
        <div className="weather-detail-item">
          <div>습도</div>
          <div>{humidity}%</div>
        </div>
        <div className="weather-detail-item">
          <div>강수량</div>
          <div>{rain}mm</div>
        </div>
        <div className="weather-detail-item">
          <div>풍속</div>
          <div>{wind}m/s</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;