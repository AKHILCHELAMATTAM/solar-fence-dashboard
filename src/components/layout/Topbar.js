import React from "react";
import "./Topbar.css";

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="topbar">
      <button className="topbar__menu-btn" onClick={onMenuClick}>
        ☰
      </button>
      <div className="topbar__title">Solar & Fence Monitoring</div>
      <div className="topbar__right">
        <span className="topbar__user">Admin</span>
      </div>
    </header>
  );
};

export default Topbar;