import React from "react";

function SettingsNotices({ notices, openNotice, setOpenNotice }) {
  return (
    <section className="settings-section">
      <h3>공지사항</h3>
      {notices.length === 0 ? (
        <div className="settings-notice">아직 등록된 공지사항이 없습니다.</div>
      ) : (
        notices.map((notice) => (
          <div
            key={notice.id}
            className={`settings-notice notice-accordion${openNotice === notice.id ? " open" : ""}`}
            onClick={() => setOpenNotice(openNotice === notice.id ? null : notice.id)}
          >
            <h4 className="notice-title">
              <span>{notice.title}</span>
              <span className="notice-date">{notice.date}</span>
              <span className="notice-arrow">{openNotice === notice.id ? "▲" : "▼"}</span>
            </h4>
            <div className="notice-content">{notice.content}</div>
          </div>
        ))
      )}
    </section>
  );
}

export default SettingsNotices;
