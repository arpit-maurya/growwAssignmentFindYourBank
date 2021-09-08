import React from "react";
import "./TopNavbar.css";

let TopNavbar = () => {
  return (
    <div className="topNavbar">
      <div className="topNavbar-innerContainer">
        <span className="material-icons-round navbar-innerBox-span">home</span>
        <span className="material-icons navbar-innerBox-dashboardText">
          Dashboard
        </span>
      </div>
    </div>
  );
};

export default TopNavbar;
