import React from "react";
import "./Modal.css";

function Modal({ open, title, children, onConfirm, onCancel, confirmText = "확인", cancelText = "취소" }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-title">{title}</div>
        <div>{children}</div>
        <div className="modal-btns">
          <button className="modal-btn cancel" onClick={onCancel}>{cancelText}</button>
          <button className="modal-btn confirm" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
