
import React from "react"
import { useTheme } from "../../context/UseTheme.jsx";
import ToggleSwitch from "./ToggleSwitch.jsx";

export function DarkModeToggle ({description}){
      // 다크모드 상태
      const {isDarkMode, toggleDarkMode} = useTheme();

      return(
        <ToggleSwitch
          label="다크모드"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          description={description}
        />
      )
}
