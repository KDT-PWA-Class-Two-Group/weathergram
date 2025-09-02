import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BottomNav.css";
import SunIcon from "../icon/SunIcon";
import ImageListIcon from "../icon/ImageListIcon";
import PlusCircleIcon from "../icon/PlusCircleIcon";
import ProfileIcon from "../icon/ProfileIcon";

const iconCommpoent =
  {
  sun: SunIcon,
  "image-list": ImageListIcon,
  "plus-circle": PlusCircleIcon,
  profile: ProfileIcon,
};

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
      {navs.map((nav) => {
        const IconCommpoent = iconCommpoent[nav.icon];

        return(
        <Link
          key={nav.to}
          to={nav.to}
          className={location.pathname === nav.to ? "active" : ""}
        >
          <span className="bottomnav-icon">
            {IconCommpoent && <IconCommpoent className="app-icon app-width-hegth"/>}
          </span>
          <span className="bottomnav-label">{nav.label}</span>
        </Link>
        )
      })}
    </nav>
  );
}

export default BottomNav;
