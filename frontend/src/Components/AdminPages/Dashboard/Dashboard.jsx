import React, { useState } from "react";
import "../../AdminPages/Dashboard/Dashboard.css";
import DateTime from "../../../Utils/Datetime";

const Dashboard = () => {
  const [shiftType, setShiftType] = useState("");
  const handleShiftType = (e) => {
    setShiftType(e.target.value);
  };
  return (
    <div className="AdminDash-cont">
      <div className="wish-container">
        <DateTime className="time-date" />
        <h2 className="wish-message">
          Welcome{" "}
          <span style={{ color: "blue" }} s>
            {localStorage.getItem("empname")}
          </span>
          ,
        </h2>
        <p style={{ boxSizing: "border-box" }}>
          {localStorage.getItem("empid")}, {localStorage.getItem("emprole")}
        </p>
      </div>
      <div className="select-cont">
        Select Shift :{" "}
        <select value={shiftType} onChange={handleShiftType}>
          <label>select Shift Type</label>
          <option value="">Select</option>
          <option value="First"> First</option>
          <option value="Second"> Second</option>
        </select>
      </div>
      {shiftType && shiftType === "First" && (
        <div className="Cards-cont">
          <div className="cont">
            <label>No.of Present:</label>
            <p> 7</p>
          </div>
          <div className="cont">
            <label>Breakfast Count</label>
            <p> 7</p>
          </div>
          <div className="cont">
            <label>Lunch Count</label>
            <p> 7</p>
          </div>
        </div>
      )}
      {shiftType && shiftType === "Second" && (
        <div className="Cards-cont">
          <div className="cont">
            <label>No.of Present</label>
            <p> 7</p>
          </div>

          <div className="cont">
            <label>Dinner Count</label>
            <p> 7</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
