import React, { useState, useEffect } from 'react';
import "./SideBar.css";
import { MdDashboard, MdOutlineEditCalendar } from "react-icons/md";
import { FaRegCalendarXmark, FaBars } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

const SideBar = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || '1');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuBar = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const handleNavlinkClick = (tab) => {
    setActiveTab(tab);
    setActivePage(tab);
    setIsMenuOpen(!isMenuOpen); 
    localStorage.setItem('activeTab', tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('activeTab');
  };

  useEffect(() => {
    setActiveTab(localStorage.getItem('activeTab') || '1');
  }, []);

  return (
    <>
      <div className="res-sidebar">
        <FaBars onClick={handleMenuBar} id='menu-bar' />
        <h3>Welcome Kotesh</h3>
      </div>

      <div
        id='sidebar-res'
        className={`sidebar ${isMenuOpen ? 'open' : 'closed'}`} // Use dynamic class assignment
      >
        <div className="vts-logo">Logo</div>
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
          <div className='navlink logout-navlink'>
            <span style={{display:"flex",gap:"10px",alignItems:"center"}}><LuLogOut /> Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
