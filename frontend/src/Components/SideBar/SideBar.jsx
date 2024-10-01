import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { MdDashboard, MdOutlineEditCalendar } from "react-icons/md";
import { FaRegCalendarXmark, FaBars } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";
import logo from "../../assets/Images/logo.png"
const SideBar = ({ setActivePage, setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuBar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavlinkClick = (tab) => {
    setActiveTab(tab);
    setActivePage(tab);
    setIsMenuOpen(!isMenuOpen);
    localStorage.setItem("activeTab", tab);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setActiveTab(localStorage.getItem("activeTab") || "1");
  }, []);

  return (
    <>
      <div className="res-sidebar">
        <FaBars onClick={handleMenuBar} id="menu-bar" />
        <h3>Welcome {localStorage.getItem("empname")}</h3>
      </div>

      <div
        id="sidebar-res"
        className={`sidebar ${isMenuOpen ? "open" : "closed"}`}
      >
        <div className="vts-logo">
          <div>
          <img src={logo} alt="logo" /> 
          </div>
          <div className="vts-text">
            VTS
          </div>
        </div>
        <hr />
        <div className="sidebar-navlinks">
          {localStorage.getItem("access") === "employee" ? (
            <>
              <div
                onClick={() => handleNavlinkClick("1")}
                className={activeTab === "1" ? "active-navlink" : "navlink"}
              >
                <MdDashboard /> Dashboard
              </div>

              <div
                onClick={() => handleNavlinkClick("2")}
                className={activeTab === "2" ? "active-navlink" : "navlink"}
              >
                <MdOutlineEditCalendar /> Attendance
              </div>
              <div
                onClick={() => handleNavlinkClick("3")}
                className={activeTab === "3" ? "active-navlink" : "navlink"}
              >
                <FaRegCalendarXmark /> Leaves
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => handleNavlinkClick("4")}
                className={activeTab === "4" ? "active-navlink" : "navlink"}
              >
                <MdDashboard /> Dashboard
              </div>
              <div
                onClick={() => handleNavlinkClick("6")}
                className={activeTab === "6" ? "active-navlink" : "navlink"}
              >
                <HiMiniUserGroup /> Employees
              </div>
              <div
                onClick={() => handleNavlinkClick("5")}
                className={activeTab === "5" ? "active-navlink" : "navlink"}
              >
                <MdOutlineEditCalendar /> Leaves
              </div>
            </>
          )}
          <div onClick={handleLogout} className="navlink logout-navlink">
            <span
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <LuLogOut /> Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
