
import React, { useState } from "react";
import ToggleSwitch from "../components/common/ToggleSwitch";
import Modal from "./Modal";
import "./Settings.css";

import { DarkModeToggle } from "../components/common/DarkMode";


// 예시 공지사항 데이터
const notices = [
  {
    id: 1,
    title: "업데이트 일정 안내",
    date: "2025.08.25",
    content: "8월 25일 업데이트가 진행됩니다. 서비스 이용에 참고 부탁드립니다.",
  },
  {
    id: 2,
    title: "신규 기능 출시",
    date: "2025.08.20",
    content: "날씨 기반 추천 기능이 추가되었습니다! 많은 이용 부탁드립니다.",
  },
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

  // 모달 상태
  const [modal, setModal] = useState({
    open: false,
    type: null, // 'logout' | 'delete'
  });

  // 전체 알림 토글 핸들러
  const handleAllNotification = (checked) => {
    setNotifications({
      all: checked,
      weather: checked,
      night: checked,
      like: checked,
    });
  };

  // 개별 알림 토글 핸들러
  const handleNotification = (type) => (checked) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: checked,
    }));
  };

  // 로그아웃/계정탈퇴 모달 오픈
  const openLogoutModal = () => setModal({ open: true, type: 'logout' });
  const openDeleteModal = () => setModal({ open: true, type: 'delete' });
  const closeModal = () => setModal({ open: false, type: null });

  // 모달 내 확인 버튼
  const handleModalConfirm = () => {
    if (modal.type === 'logout') {
      // 실제 로그아웃 로직 
      closeModal();
      setTimeout(() => {
        alert('로그아웃 되었습니다.');
      }, 100);
    } else if (modal.type === 'delete') {
      // 실제 계정탈퇴 로직 
      closeModal();
      setTimeout(() => {
        alert('계정이 탈퇴되었습니다.');
      }, 100);
    }
  };

  return (
    <div className="settings-container">
      {/* 공지사항 */}
      <section className="settings-section">
        <h3>공지사항</h3>
        {notices.length === 0 ? (
          <div className="settings-notice">아직 등록된 공지사항이 없습니다.</div>
        ) : (
          notices.map((notice) => (
            <div
              key={notice.id}
              className={`settings-notice notice-accordion${openNotice === notice.id ? ' open' : ''}`}
              onClick={() => setOpenNotice(openNotice === notice.id ? null : notice.id)}
            >
              <h4 className="notice-title">
                <span>{notice.title}</span>
                <span className="notice-date">{notice.date}</span>
                <span className="notice-arrow">{openNotice === notice.id ? "▲" : "▼"}</span>
              </h4>
              <div className="notice-content">
                {notice.content}
              </div>
            </div>
          ))
        )}
      </section>
      {/* 알림 설정 */}
      <section className="settings-section">
        <h3>알림 설정</h3>
        <div className="settings-toggle-list">
          <ToggleSwitch
            label="전체 알림"
            checked={notifications.all}
            onChange={handleAllNotification}
            description={"전체 알림을 관리합니다."}
          />
          <ToggleSwitch
            label="날씨 알림"
            checked={notifications.weather}
            onChange={handleNotification("weather")}
            disabled={!notifications.all}
            description={"날씨 변동 및 예보 알림입니다."}
          />
          <ToggleSwitch
            label="야간 푸시 알림"
            checked={notifications.night}
            onChange={handleNotification("night")}
            disabled={!notifications.all}
            description={"야간 시간대(21시~8시)에는 푸시 알림이 오지 않습니다."}
          />
          <ToggleSwitch
            label="좋아요 알림"
            checked={notifications.like}
            onChange={handleNotification("like")}
            disabled={!notifications.all}
            description={"좋아요 알림을 받습니다."}
          />
        </div>
      </section>
      {/* 앱 설정 */}
      <section className="settings-section">
        <h3>앱 설정</h3>
        <DarkModeToggle
          description={"다크모드로 변경합니다"}/>
      </section>
      {/* 계정 관리 */}
      <section className="settings-section"> 
        <h3>계정 관리</h3>
        <button onClick={openLogoutModal} className="settings-alert-btn">로그아웃</button>
        <button onClick={openDeleteModal} className="settings-delete-btn">계정 탈퇴</button>
        <Modal
          open={modal.open}
          title={modal.type === 'logout' ? '로그아웃' : '계정 탈퇴'}
          onCancel={closeModal}
          onConfirm={handleModalConfirm}
          confirmText={modal.type === 'logout' ? '로그아웃' : '탈퇴'}
          cancelText="취소"
        >
          {modal.type === 'logout'
            ? '정말로 로그아웃 하시겠습니까?'
            : '정말로 계정을 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제됩니다.'}
        </Modal>
      </section>
    </div>
  );
}

export default Settings;