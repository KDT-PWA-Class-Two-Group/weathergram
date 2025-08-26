import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BottomNav.css";

const navs = [
  { to: "/", label: "날씨", icon: "sun" },
  { to: "/feed", label: "피드", icon: "image-list" },
  { to: "/upload", label: "업로드", icon: "plus-circle" },
  { to: "/mypage", label: "마이페이지", icon: "profile" },
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
          <span className="bottomnav-icon">
            <img src={`/images/icons/${nav.icon}.svg`} alt={nav.label} />
          </span>
          <span className="bottomnav-label">{nav.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default BottomNav;
