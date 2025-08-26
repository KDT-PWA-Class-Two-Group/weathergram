import React, { useState, useEffect } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ checked: checkedProp = false, onChange, disabled = false, label, description }) {
  const [checked, setChecked] = useState(checkedProp);

  useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const handleToggle = () => {
    if (disabled) return;
    setChecked((prev) => {
      const next = !prev;
      if (onChange) onChange(next);
      return next;
    });
  };

  return (
    <div className="toggle-switch-wrap">
      <label className="toggle-switch">
        <div className="toggle-switch-text">
          {label && <span className="toggle-switch-label">{label}</span>}
          {description && ( <span className="toggle-switch-desc">{description}</span>)}
        </div>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="toggle-switch-input"
          disabled={disabled}
        />
        <span className="toggle-switch-slider" />
      </label>
    </div>
  );
}

export default ToggleSwitch;