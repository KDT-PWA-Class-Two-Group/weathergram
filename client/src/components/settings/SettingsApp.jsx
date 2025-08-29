import React from "react";
import ToggleSwitch from "../common/ToggleSwitch";

function SettingsApp({ darkMode, handleDarkMode }) {
  return (
    <section className="settings-section">
      <h3>앱 설정</h3>
      <ToggleSwitch
        label="다크모드"
        checked={darkMode}
        onChange={handleDarkMode}
        description="다크모드로 변경합니다."
      />
    </section>
  );
}

export default SettingsApp;