import React, { useState, useEffect } from 'react';
import "./SideBar.css";
import { MdDashboard } from "react-icons/md";
import { MdOutlineEditCalendar } from "react-icons/md";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
const SideBar = ({setActivePage}) => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || '1');

  const handleNavlinkClick = (tab) => {
    setActiveTab(tab);
    setActivePage(tab)
    localStorage.setItem('activeTab', tab);
  };
  const handleLogout = ()=>{
    localStorage.removeItem('activeTab');
  }
  useEffect(() => {
    setActiveTab(localStorage.getItem('activeTab') || '1');
  }, []);

  return (
    <div className='sidebar'>
      <div className="vts-logo">
        Logo
      </div>
      <hr />
      <div className="sidebar-navlinks">
        <div onClick={() => handleNavlinkClick("1")} className={activeTab === "1" ? 'active-navlink' : 'navlink'}>
        <MdDashboard /> Dashboard
        </div>
        <div onClick={() => handleNavlinkClick("2")} className={activeTab === "2" ? 'active-navlink' : 'navlink'}>
        <MdOutlineEditCalendar /> Attendance
        </div>
        <div onClick={() => handleNavlinkClick("3")} className={activeTab === "3" ? 'active-navlink' : 'navlink'}>
        <FaRegCalendarXmark /> Leaves
        </div>
        <div onClick={() => handleLogout()} className='navlink logout-navlink'>
        <LuLogOut /> Logout
        </div>
      </div>
    </div>
  );
};

export default SideBar;
