import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./TopBar.css";

function TopBar() {
  const location = useLocation();
  return (
    <header className="topbar">
      <div className="topbar-title">
        <Link to="/" className="topbar-logo">Weathergram</Link>
      </div>
      <nav className="topbar-actions">
        <Link to="/notifications" className={location.pathname === "/notifications" ? "active" : ""}>
          <span role="img" aria-label="알림">🔔</span>
        </Link>
        <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
          <span role="img" aria-label="설정">⚙️</span>
        </Link>
      </nav>
    </header>
  );
}

export default TopBar;
