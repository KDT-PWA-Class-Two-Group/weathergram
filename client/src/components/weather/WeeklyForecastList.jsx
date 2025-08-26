// React 훅과 스타일링을 위한 CSS 임포트
import { useEffect, useMemo, useState } from "react";
import "./WeeklyForecastList.css";
// 주간 예보 데이터를 가져오는 API 함수 임포트
import { fetchWeeklyForecast } from "../../api/weather";
// 브라우저 현재 위치를 얻는 유틸리티 임포트
import { getBrowserLocation } from "../../utils/location";

// 서버에서 받은 날짜/시간 정보를 한국어 요일 문자열로 변환하는 함수
// dt (타임스탬프), dateStr (YYYY-MM-DD), timezone 오프셋(초)을 포함한 객체를 받음
// 요일 인덱스에 따라 한글 요일 문자(일, 월, 화, 수, 목, 금, 토) 반환
function getKoreanWeekday({ dt, dateStr, timezone = 0 }) {
  let d;
  if (typeof dt === "number") {
    // dt가 숫자(유닉스 타임스탬프 초)인 경우 timezone 오프셋을 더해 Date 객체 생성
    d = new Date((dt + timezone) * 1000);
  } else if (dateStr) {
    // dateStr이 있으면 정오 시간 기준으로 파싱하여 timezone 문제 회피
    d = new Date(dateStr + "T12:00:00");
  } else {
    // 유효한 입력이 없으면 현재 날짜/시간 사용
    d = new Date();
  }
  const w = d.getDay(); // 요일 인덱스(0=일요일 ~ 6=토요일) 얻기
  // 요일 인덱스에 대응하는 한글 요일 문자 반환
  return ["일", "월", "화", "수", "목", "금", "토"][w];
}

// 서버 형식의 주간 예보 리스트 데이터를 클라이언트 친화적 형식으로 정규화하는 함수
// 일별 예보 객체 리스트와 timezone 오프셋(초)을 받아서 처리
// day(한글 요일), weather(소문자 문자열), min, max 온도, pop(강수 확률 %) 키를 가진 배열 반환
function normalizeWeeklyList(list, timezone) {
  if (!Array.isArray(list)) return [];
  return list.map((it) => {
    // 주 날씨 상태 문자열 소문자로 추출
    const main = (it?.weather?.[0]?.main || "").toString().trim().toLowerCase();
    // 최소/최대 온도 추출 (temp 또는 직접 키에서)
    const min = it?.temp?.min ?? it?.min ?? null;
    const max = it?.temp?.max ?? it?.max ?? null;
    // 강수 확률을 백분율 정수로 변환 (있으면)
    const pop = typeof it?.pop === "number" ? Math.round(it.pop * 100) : null;
    // dt 또는 _key 필드와 timezone 오프셋을 이용해 한글 요일 얻기
    const day = getKoreanWeekday({
      dt: it?.dt,
      dateStr: it?._key,
      timezone: typeof timezone === "number" ? timezone : 0,
    });

    return {
      day, // 한글 요일 문자열 예: "월"
      weather: main, // 날씨 상태 문자열 예: "clear"
      // 온도가 숫자면 소수점 첫째 자리까지 반올림
      min: typeof min === "number" ? Math.round(min * 10) / 10 : min,
      max: typeof max === "number" ? Math.round(max * 10) / 10 : max,
      pop, // 강수 확률 백분율
    };
  });
}

// 날씨 상태 문자열에 따른 아이콘 이미지 URL을 반환하는 함수
// 상대 경로로 SVG 아이콘 경로 반환
function getWeatherIconUrl(weather) {
<<<<<<< HEAD
  const key = (weather || "").toString().trim().toLowerCase();
  switch (key) {
=======
  switch (weather) {
>>>>>>> myjin0806/issue25
    case "clear":
      return "/images/wea-ico/clear.svg";
    case "clouds":
      return "/images/wea-ico/clouds.svg";
    case "rain":
      return "/images/wea-ico/rain.svg";
    case "snow":
      return "/images/wea-ico/snow.svg";
    case "thunderstorm":
      return "/images/wea-ico/thunderstorm.svg";
    default:
<<<<<<< HEAD
      // 알 수 없거나 기타 날씨 상태에 대한 기본 아이콘
=======
>>>>>>> myjin0806/issue25
      return "/images/wea-ico/cloudy.svg";
  }
}

// 실제 데이터가 없을 때 대체용 또는 예시로 사용하는 샘플 데이터 배열
const sampleData = [
  // 참고용 예시 항목 주석 처리됨
  // { day: "화", weather: "rain", min: 27.1, max: 30.6, pop: 100 }, // 2025-08-26
  // { day: "수", weather: "clouds", min: 21.5, max: 30.5, pop: 0 }, // 2025-08-27
  // { day: "목", weather: "clouds", min: 21.5, max: 31.9, pop: 0 }, // 2025-08-28
  // { day: "금", weather: "clouds", min: 22.2, max: 32.0, pop: 21 }, // 2025-08-29
  // { day: "토", weather: "clear", min: 23.2, max: 33.1, pop: 0 }, // 2025-08-30
];

// 주간 날씨 예보 리스트를 보여주는 메인 React 컴포넌트
// props:
// - data: 서버에서 받은 주간 예보 JSON 데이터 (선택적)
// - lat, lon: 위도와 경도 (선택적)
// - city, country: 도시와 국가 문자열 (선택적)
// - days: 가져올/표시할 일수 (기본 5일)
function WeeklyForecastList({ data, lat, lon, city, country, days = 5 }) {
  // 렌더링할 정규화된 예보 데이터 행 상태
  const [rows, setRows] = useState(null);
  // 데이터 가져오기 실패 시 에러 메시지 상태
  const [error, setError] = useState(null);
  // 데이터 로딩 중 상태 표시
  const [loading, setLoading] = useState(false);

  // data prop이 있으면 정규화된 데이터를 메모이제이션하여 저장
  // data prop이 변경될 때만 실행
  const normalizedFromProp = useMemo(() => {
    if (!data) return null;
    // data가 배열인지 객체인지에 따라 list 배열과 timezone 오프셋 추출
    const list = Array.isArray(data) ? data : data.list;
    const tz = (Array.isArray(data) ? 0 : data?.city?.timezone) ?? 0;
    // 리스트를 정규화하여 반환
    return normalizeWeeklyList(list, tz);
  }, [data]);

  // data prop이 없거나 유효하지 않을 때 주간 예보 데이터를 API에서 가져오는 useEffect
  // normalizedFromProp, lat, lon, city, country, days가 변경될 때마다 실행
  useEffect(() => {
    // data prop에서 정규화된 데이터가 있으면 바로 사용하고 에러 초기화
    if (normalizedFromProp) {
      setRows(normalizedFromProp);
      setError(null);
      return;
    }

    // lat, lon이 숫자인지 확인
    const hasLatLon = typeof lat === "number" && typeof lon === "number";
    // city, country가 문자열인지 확인
    const hasCity = typeof city === "string" && typeof country === "string";

    // 비동기 함수로 API에서 주간 예보 데이터를 가져옴
    async function run() {
      try {
        setLoading(true); // 로딩 상태 true 설정
        setError(null); // 이전 에러 초기화

        let params;
        if (hasLatLon) {
          // 위도/경도 좌표가 있으면 해당 파라미터 사용
          params = { lat, lon, cnt: days };
        } else if (hasCity) {
          // 도시/국가 정보가 있으면 해당 파라미터 사용
          params = { city, country, cnt: days };
        } else {
          // 없으면 브라우저 위치 자동 탐색 시도
          const pos = await getBrowserLocation();
          params = { lat: pos.lat, lon: pos.lon, cnt: days };
        }

        // 디버그용으로 요청 파라미터 출력
        console.debug("주간예보 params 확인", params);
        // API 호출하여 주간 예보 데이터 가져오기
        const res = await fetchWeeklyForecast(params);

        // 응답에서 리스트 배열과 timezone 오프셋 추출
        const list = Array.isArray(res) ? res : res?.list;
        const tz = (Array.isArray(res) ? 0 : res?.city?.timezone) ?? 0;

        // 받은 리스트 데이터 정규화
        const normalized = normalizeWeeklyList(list, tz);
        // 정규화된 데이터가 유효하고 비어있지 않으면 상태 업데이트
        if (normalized && normalized.length) {
          setRows(normalized);
        } else {
          // 그렇지 않으면 샘플 데이터 사용
          setRows(sampleData);
        }
      } catch (err) {
        // 에러 발생 시 콘솔에 출력하고 에러 메시지와 샘플 데이터로 상태 설정
        console.error("[WeeklyForecast] fetch error:", err);
        setError("주간 예보를 불러오지 못했습니다.");
        setRows(sampleData);
      } finally {
        // 항상 로딩 상태 false 처리
        setLoading(false);
      }
    }

    // 비동기 함수 실행
    run();
  }, [normalizedFromProp, lat, lon, city, country, days]);

  // 렌더링할 데이터 결정: API에서 가져온 rows, prop에서 정규화된 데이터, 샘플 데이터 순서로 선택
  const items = rows || normalizedFromProp || sampleData;

  // 데이터가 없거나 빈 배열이면 에러 메시지 UI 렌더링
  if (!items || !items.length) {
    return (
      <div className="weekly-forecast-list">
        {/* 타이틀 영역 */}
        <div className="weekly-forecast-title">주간 예보</div>
        {/* 데이터가 비어있다는 에러 메시지 */}
        <div className="weekly-forecast-error">
          데이터가 비어 있습니다. (네트워크/권한/응답 형식 확인)
        </div>
      </div>
    );
  }

  // 주간 예보 리스트 UI 렌더링
  return (
    <div className="weekly-forecast-list">
      {/* 타이틀 */}
      <div className="weekly-forecast-title">주간 예보</div>
      {/* 로딩 중일 때 표시되는 인디케이터 */}
      {loading && <div className="weekly-forecast-loading">불러오는 중…</div>}
      {/* 에러 메시지 표시 */}
      {error && <div className="weekly-forecast-error">{error}</div>}
      {/* 예보 행들을 감싸는 컨테이너 */}
      <div className="weekly-forecast-table">
<<<<<<< HEAD
        {/* 각 아이템을 행으로 매핑하여 렌더링 */}
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`weekly-forecast-row${
              idx !== items.length - 1 ? "" : " last"
            }`}
          >
            {/* 요일 표시 */}
=======
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`weekly-forecast-row${
              idx !== data.length - 1 ? "" : " last"
            }`}
          >
>>>>>>> myjin0806/issue25
            <div className="weekly-forecast-day">{item.day}</div>
            {/* 날씨 정보: 아이콘, 최저/최고 온도, 강수 확률 */}
            <div className="weekly-forecast-info">
              <div className="weekly-forecast-icon">
<<<<<<< HEAD
                {/* 날씨 아이콘 이미지 및 alt 텍스트 */}
                <img
                  src={getWeatherIconUrl(item.weather)}
                  alt={item.weather || "weather"}
                />
              </div>
              {/* 최저 온도 (섭씨) */}
              <span className="weekly-forecast-min">{item.min ?? "-"}°C /</span>
              {/* 최고 온도 (섭씨) */}
              <span className="weekly-forecast-max">{item.max ?? "-"}°C</span>
              {/* 강수 확률이 있으면 표시 */}
              {typeof item.pop === "number" && (
                <span className="weekly-forecast-pop">{item.pop}%</span>
              )}
=======
                <img src={getWeatherIconUrl(item.weather)} alt={item.weather} />
              </div>
              <span className="weekly-forecast-min">{item.min}°C /</span>
              <span className="weekly-forecast-max">{item.max}°C</span>
>>>>>>> myjin0806/issue25
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

<<<<<<< HEAD
// 컴포넌트를 기본 내보내기
export default WeeklyForecastList;
=======
export default WeeklyForecastList;
>>>>>>> myjin0806/issue25
