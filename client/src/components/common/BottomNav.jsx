import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BottomNav.css";

const navs = [
  { to: "/", label: "피드", icon: "🏠" },
  { to: "/weather", label: "날씨", icon: "🌦️" },
  { to: "/upload", label: "업로드", icon: "➕" },
  { to: "/notifications", label: "알림", icon: "🔔" },
  { to: "/settings", label: "설정", icon: "⚙️" },
];

function BottomNav() {
  const location = useLocation();
  return (
    <nav className="bottomnav">
      {navs.map((nav) => (
        <Link
          key={nav.to}
          to={nav.to}
          className={location.pathname === nav.to ? "active" : ""}
        >
          <span className="bottomnav-icon">{nav.icon}</span>
          <span className="bottomnav-label">{nav.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default BottomNav;
