import React from "react";
import DateTime from "../../../Utils/Datetime";
import "./Dashboard.css";
import attendance from "../../../assets/Images/attendance.jpg";
const Dashboard = ({ setActivePage }) => {
  return (
    <div className="emp-dashboard-container">
      <div className="wish-container">
        <DateTime className="time-date" />
        <h2  className="wish-message">Welcome <span style={{color:'blue'}}s>{localStorage.getItem('empname').toUpperCase()}</span>,</h2>
        <p style={{boxSizing:'border-box'}}>{localStorage.getItem('empid')}, {localStorage.getItem('emprole')}</p>
      </div>
      <div className="attendance-container">
        <div className="attendance-img">
          <img src={attendance} alt="" />
        </div>
        <div className="action-container">
          <p className="info-text">
            At <strong>VTS Enterprises</strong>, we prioritize efficiency and
            transparency in managing employee attendance and leave requests.
            Please ensure that you post your attendance on time and notify the
            HR team in advance when applying for leave. Maintaining accurate
            records helps us support a healthy work-life balance while ensuring
            operational efficiency. Thank you for your cooperation!
          </p>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => setActivePage("2")}>
              Post Your Attendance
            </button>
            <button className="action-btn" onClick={() => setActivePage("3")}>
              Apply For leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
