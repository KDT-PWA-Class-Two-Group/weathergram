import React, { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ checked: checkedProp = false, onChange }) {
  const [checked, setChecked] = useState(checkedProp);

  const handleToggle = () => {
    setChecked((prev) => {
      const next = !prev;
      if (onChange) onChange(next);
      return next;
    });
  };

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="toggle-switch-input"
      />
      <span className="toggle-switch-slider" />
    </label>
  );
}

export default ToggleSwitch;