import React, { useState } from "react";
import SettingsNotices from "../components/settings/SettingsNotices";
import SettingsNotifications from "../components/settings/SettingsNotifications";
import SettingsApp from "../components/settings/SettingsApp";
import SettingsAccount from "../components/settings/SettingsAccount";
import "./Settings.css";

import { DarkModeToggle } from "../components/common/DarkMode";


// 예시 공지사항 데이터
const notices = [
  { id: 1, title: "업데이트 일정 안내", date: "2025.08.25", content: "8월 25일 업데이트가 진행됩니다. 서비스 이용에 참고 부탁드립니다." },
  { id: 2, title: "신규 기능 출시", date: "2025.08.20", content: "날씨 기반 추천 기능이 추가되었습니다! 많은 이용 부탁드립니다." },
];

function Settings() {
  // 알림 설정 상태
  const [notifications, setNotifications] = useState({
    all: true,
    weather: true,
    night: true,
    like: true,
  });
  
  // 공지사항 아코디언 상태
  const [openNotice, setOpenNotice] = useState(null);
  const [modal, setModal] = useState({ open: false, type: null });

  const handleAllNotification = (checked) => {
    setNotifications({ all: checked, weather: checked, night: checked, like: checked });
  };

  const handleNotification = (type) => (checked) => {
    setNotifications((prev) => ({ ...prev, [type]: checked }));
  };

  const openLogoutModal = () => setModal({ open: true, type: "logout" });
  const openDeleteModal = () => setModal({ open: true, type: "delete" });
  const closeModal = () => setModal({ open: false, type: null });

  const handleModalConfirm = () => {
    if (modal.type === "logout") {
      closeModal();
      setTimeout(() => alert("로그아웃 되었습니다."), 100);
    } else if (modal.type === "delete") {
      closeModal();
      setTimeout(() => alert("계정이 탈퇴되었습니다."), 100);
    }
  };

  return (
    <div className="settings-container">
      <SettingsNotices
        notices={notices}
        openNotice={openNotice}
        setOpenNotice={setOpenNotice}
      />
      <SettingsNotifications
        notifications={notifications}
        handleAllNotification={handleAllNotification}
        handleNotification={handleNotification}
      />

      <DarkModeToggle
          description={"다크모드로 변경합니다"}/>

      <SettingsAccount
        modal={modal}
        openLogoutModal={openLogoutModal}
        openDeleteModal={openDeleteModal}
        closeModal={closeModal}
        handleModalConfirm={handleModalConfirm}
      />
    </div>
  );
}

export default Settings;
