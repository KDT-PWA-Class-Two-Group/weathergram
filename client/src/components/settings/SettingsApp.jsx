import React from "react";
import ToggleSwitch from "../common/ToggleSwitch";
import { DarkModeToggle } from "../common/DarkMode";

function SettingsApp() {
  return (
    <section className="settings-section">
      <h3>앱 설정</h3>
      <DarkModeToggle
          description={"다크모드로 변경합니다"}/>
    </section>
  );
}

export default SettingsApp;