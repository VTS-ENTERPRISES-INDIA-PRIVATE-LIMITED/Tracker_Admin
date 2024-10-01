import React, { useEffect, useState } from "react";
import "../../AdminPages/Dashboard/Dashboard.css";
import DateTime from "../../../Utils/Datetime";
import axios from "axios";
const Dashboard = () => {
  const [shiftType, setShiftType] = useState("");
  const [breakfastCount, setBreakfastCount] = useState();
  const [lunchCount, setLunchCount] = useState();
  const [dinnerCount, setDinnerCount] = useState();
  const [presntCount, setPresentCount] = useState();

  useEffect(() => {
    const breakfastCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/breakfastcount`;
    const lunchCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/lunchcount`;
    const dinnerCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/dinnercount`;
    const presentCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/getPresentEmployeeCount`;

    axios
      .get(breakfastCount)
      .then((res) => setBreakfastCount(res.data[0]))
      .catch((err) => {
        setBreakfastCount(0);
        console.log(err);
      });
  });
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
            {localStorage.getItem("empname").toUpperCase()}
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
          <option value={"Full Time"} key={"Full Time"}>
            Full Time
          </option>
          <option value={"First"} key={"First"}>
            First
          </option>
          <option value={"Second"} key={"Second"}>
            Second
          </option>
          <option value={"Work From Home"} key={"Work From Home"}>
            Work From Home
          </option>
        </select>
      </div>
      {shiftType && shiftType === "Full Time" && (
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
          <div className="cont">
            <label>Dinner Count</label>
            <p> 7</p>
          </div>
        </div>
      )}
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
