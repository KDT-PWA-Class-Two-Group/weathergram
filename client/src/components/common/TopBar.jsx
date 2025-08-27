import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./TopBar.css";

function TopBar({ notifications }) {
  const [locationName, setLocationName] = useState("위치 확인 중...");
  const location = useLocation();
  const unreadCount = notifications.filter(n => n.unread).length;
  const displayCount = unreadCount > 99 ? "99+" : unreadCount;

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationName("위치 사용 불가");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // 카카오 REST API 호출
        fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
          {
            headers: {
              Authorization: "KakaoAK 5cfece3ea1911aa54632ff4801fab391", // 본인 REST API 키
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const region = data.documents?.[0]?.region_3depth_name;
            setLocationName(region || "위치 확인 실패");
          })
          .catch(() => setLocationName("위치 확인 실패"));
      },
      () => setLocationName("위치 확인 실패")
    );
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-title">
        <img src="/images/icons/map-pin.svg" alt="맵 아이콘 이미지" />
        <span className="topbar-location">{locationName}</span>
      </div>
      <nav className="topbar-actions">
        <Link to="/notifications" className={location.pathname === "/notifications" ? "active" : ""}>
            <img src="/images/icons/bell.svg" alt="알림 이미지" />
            {unreadCount > 0 && <span className="notification-badge">{displayCount}</span>}
        </Link>
        <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
            <img src="/images/icons/settings.svg" alt="설정 이미지" />
        </Link>
      </nav>
    </header>
  );
}

export default TopBar;
