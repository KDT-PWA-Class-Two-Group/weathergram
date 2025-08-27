import React from "react";
import "./Notifications.css";

function Notifications({ notifications, markAsRead, markAllAsRead }) {


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
      {/* 모두 확인 버튼 */}
      <div className="notifications-header">
        <button className="notifications-markall-btn" onClick={markAllAsRead}>
          모두 확인
        </button>
      </div>

      {/* 알림 리스트 */}
      <div className="notification-list">
        {notifications.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', padding: '32px 0' }}>알림이 없습니다.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-item${n.unread ? ' unread' : ''}`}
              onClick={() => markAsRead(n.id)} // 클릭 시 읽음 처리
            >
              {/* 알림 아이콘 */}
              <div className="notification-icon">{getIcon(n.type)}</div>

              {/* 내용 + 시간 */}
              <div className="notification-content">
                <span>{n.content}</span>
                <span className="notification-time">{n.time}</span>
              </div>

              {/* 좋아요 타입이면 썸네일 표시 */}
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