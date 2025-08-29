import React from "react";
import ToggleSwitch from "../common/ToggleSwitch";

function SettingsNotifications({ notifications, handleAllNotification, handleNotification }) {
  return (
    <section className="settings-section">
      <h3>알림 설정</h3>
      <div className="settings-toggle-list">
        <ToggleSwitch
          label="전체 알림"
          checked={notifications.all}
          onChange={handleAllNotification}
          description="전체 알림을 관리합니다."
        />
        <ToggleSwitch
          label="날씨 알림"
          checked={notifications.weather}
          onChange={handleNotification("weather")}
          disabled={!notifications.all}
          description="날씨 변동 및 예보 알림입니다."
        />
        <ToggleSwitch
          label="야간 푸시 알림"
          checked={notifications.night}
          onChange={handleNotification("night")}
          disabled={!notifications.all}
          description="야간 시간대(21시~8시)에는 푸시 알림이 오지 않습니다."
        />
        <ToggleSwitch
          label="좋아요 알림"
          checked={notifications.like}
          onChange={handleNotification("like")}
          disabled={!notifications.all}
          description="좋아요 알림을 받습니다."
        />
      </div>
    </section>
  );
}

export default SettingsNotifications;
