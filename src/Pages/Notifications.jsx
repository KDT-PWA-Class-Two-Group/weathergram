import React, { useState } from "react";
import "./Notifications.css";

// 예시 알림 데이터
const initialNotifications = [
  {
    id: 4,
    type: "like",
    content: "회원님의 사진에 새로운 좋아요가 추가되었습니다.",
    time: "2분 전",
    unread: true,
    thumbnail: "/images/wea-ico/clear.svg",
  },
  {
    id: 3,
    type: "weather",
    content: "오후에 비 소식이 있어요. 우산을 챙기세요!",
    time: "1시간 전",
    unread: true,
  },
  {
    id: 2,
    type: "weather",
    content: "오늘은 미세먼지가 나쁨입니다. 마스크를 착용하세요.",
    time: "어제",
    unread: false,
  },
  {
    id: 1,
    type: "like",
    content: "회원님의 사진에 새로운 좋아요가 추가되었습니다.",
    time: "2일전",
    unread: false,
    thumbnail: "/images/wea-ico/clouds.svg",
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  // 전체 알림 읽음 처리
  const handleMarkAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // 알림별 아이콘
  const getIcon = (type) => {
    if (type === "like")
      return <img src="/images/icons/heart.svg" alt="좋아요" className="icon-filter-red" />;
    if (type === "weather")
      return <img src="/images/icons/cloud.svg" alt="날씨" className="icon-filter-blue" />;
    return <span style={{ fontSize: '1.5rem' }}>🔔</span>;
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <button className="notifications-markall-btn" onClick={handleMarkAll}>
          모두 확인
        </button>
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', padding: '32px 0' }}>알림이 없습니다.</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={`notification-item${n.unread ? ' unread' : ''}`}>
              <div className="notification-icon">{getIcon(n.type)}</div>
              <div className="notification-content">
                <span>{n.content}</span>
                <span className="notification-time">{n.time}</span>
              </div>
              {n.type === 'like' && n.thumbnail && (
                <img src={n.thumbnail} alt="썸네일" className="notification-thumb" />
              )}
            </div>
          ))
        )}
      </div>  
    </div>
  );
}

export default Notifications;