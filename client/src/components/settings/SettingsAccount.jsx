import React from "react";
import Modal from "../common/Modal";

function SettingsAccount({ modal, openLogoutModal, openDeleteModal, closeModal, handleModalConfirm }) {
  return (
    <section className="settings-section">
      <h3>계정 관리</h3>
      <button onClick={openLogoutModal} className="settings-alert-btn">로그아웃</button>
      <button onClick={openDeleteModal} className="settings-delete-btn">계정 탈퇴</button>
      <Modal
        open={modal.open}
        title={modal.type === "logout" ? "로그아웃" : "계정 탈퇴"}
        onCancel={closeModal}
        onConfirm={handleModalConfirm}
        confirmText={modal.type === "logout" ? "로그아웃" : "탈퇴"}
        cancelText="취소"
      >
        {modal.type === "logout"
          ? "정말로 로그아웃 하시겠습니까?"
          : "정말로 계정을 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제됩니다."}
      </Modal>
    </section>
  );
}

export default SettingsAccount;
