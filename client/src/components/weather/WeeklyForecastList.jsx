// React 훅과 스타일링을 위한 CSS 임포트
import { useEffect, useMemo, useState } from "react";
import "./WeeklyForecastList.css";
// 주간 예보 데이터를 가져오는 API 함수 임포트
import { fetchWeeklyForecast } from "../../api/weather";
// 브라우저 현재 위치를 얻는 유틸리티 임포트
import { getBrowserLocation } from "../../utils/location";

//아이콘
import Clear from "../icon/wed-ico/Clear";
import Clouds from "../icon/wed-ico/Clouds";
import Night from "../icon/wed-ico/night";
import Rain from "../icon/wed-ico/Rain";
import Snow from "../icon/wed-ico/Snow";
import Thunderstoem from "../icon/wed-ico/Thunderstoem";

// 서버에서 받은 날짜/시간 정보를 한국어 요일 문자열로 변환
function getKoreanWeekday({ dt, dateStr, timezone = 0 }) {
  let d;
  if (typeof dt === "number") {
    d = new Date((dt + timezone) * 1000);
  } else if (dateStr) {
    d = new Date(dateStr + "T12:00:00");
  } else {
    d = new Date();
  }
  const w = d.getDay();
  return ["일", "월", "화", "수", "목", "금", "토"][w];
}

// 서버 형식의 주간 예보 데이터를 클라이언트 친화적으로 정규화
function normalizeWeeklyList(list, timezone) {
  if (!Array.isArray(list)) return [];
  return list.map((it) => {
    const main = (it?.weather?.[0]?.main || "").toString().trim().toLowerCase();
    const min = it?.temp?.min ?? it?.min ?? null;
    const max = it?.temp?.max ?? it?.max ?? null;
    const pop = typeof it?.pop === "number" ? Math.round(it.pop * 100) : null;
    const day = getKoreanWeekday({
      dt: it?.dt,
      dateStr: it?._key,
      timezone: typeof timezone === "number" ? timezone : 0,
    });

    return {
      day,
      weather: main,
      min: typeof min === "number" ? Math.round(min * 10) / 10 : min,
      max: typeof max === "number" ? Math.round(max * 10) / 10 : max,
      pop,
    };
  });
}

// 날씨 상태 문자열에 따른 아이콘
const iconComponents = {
  'clear' : Clear,
  'clouds' : Clouds,
  'night' : Night,
  'rain' : Rain,
  'snow' : Snow,
  'thunderstorm' : Thunderstoem,
  'default' : Clear
}

// 샘플 데이터 (실제 데이터가 없을 때 사용)
const sampleData = [];

// 주간 날씨 예보 리스트를 보여주는 메인 컴포넌트
function WeeklyForecastList({ data, lat, lon, city, country, days = 5 }) {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const normalizedFromProp = useMemo(() => {
    if (!data) return null;
    const list = Array.isArray(data) ? data : data.list;
    const tz = (Array.isArray(data) ? 0 : data?.city?.timezone) ?? 0;
    return normalizeWeeklyList(list, tz);
  }, [data]);

  useEffect(() => {
    if (normalizedFromProp) {
      setRows(normalizedFromProp);
      setError(null);
      return;
    }

    const hasLatLon = typeof lat === "number" && typeof lon === "number";
    const hasCity = typeof city === "string" && typeof country === "string";

    async function run() {
      try {
        setLoading(true);
        setError(null);

        let params;
        if (hasLatLon) {
          params = { lat, lon, cnt: days };
        } else if (hasCity) {
          params = { city, country, cnt: days };
        } else {
          const pos = await getBrowserLocation();
          params = { lat: pos.lat, lon: pos.lon, cnt: days };
        }

        console.debug("주간예보 params 확인", params);
        const res = await fetchWeeklyForecast(params);

        const list = Array.isArray(res) ? res : res?.list;
        const tz = (Array.isArray(res) ? 0 : res?.city?.timezone) ?? 0;
        const normalized = normalizeWeeklyList(list, tz);

        setRows(normalized && normalized.length ? normalized : sampleData);
      } catch (err) {
        console.error("[WeeklyForecast] fetch error:", err);
        setError("주간 예보를 불러오지 못했습니다.");
        setRows(sampleData);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [normalizedFromProp, lat, lon, city, country, days]);

  const items = rows || normalizedFromProp || sampleData;

  if (!items || !items.length) {
    return (
      <div className="weekly-forecast-list">
        <div className="weekly-forecast-title">주간 예보</div>
        <div className="weekly-forecast-error">
          데이터가 비어 있습니다. (네트워크/권한/응답 형식 확인)
        </div>
      </div>
    );
  }

  return (
    <div className="weekly-forecast-list">
      <div className="weekly-forecast-title">주간 예보</div>
      {loading && <div className="weekly-forecast-loading">불러오는 중…</div>}
      {error && <div className="weekly-forecast-error">{error}</div>}
      <div className="weekly-forecast-table">
        {items.map((item, idx) => {
          const IconComponent = iconComponents[item.weather]
          return(
            <div
            key={idx}
            className={`weekly-forecast-row${
              idx !== items.length - 1 ? "" : " last"
            }`}
          >
            <div className="weekly-forecast-day">{item.day}</div>
            <div className="weekly-forecast-info">
              <div className="weekly-forecast-icon">
                {IconComponent && <IconComponent className='weather-icon' />}
              </div>
              <span className="weekly-forecast-min">{item.min ?? "-"}°C /</span>
              <span className="weekly-forecast-max">{item.max ?? "-"}°C</span>
              {typeof item.pop === "number" && (
                <span className="weekly-forecast-pop">{item.pop}%</span>
              )}
            </div>
          </div>
            )
          })}
      </div>
    </div>
  );
}

export default WeeklyForecastList;
