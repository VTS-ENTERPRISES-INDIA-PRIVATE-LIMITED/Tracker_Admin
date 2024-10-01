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
  const [presentEmpData,setPresentEmpData] = useState([])
  const handleCountFetch = ()=>{
    const breakfastCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/breakfastcount`;
    const lunchCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/lunchcount`;
    const dinnerCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/dinnercount`;
    const presentCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/shiftWiseEmployees/${shiftType}`;

    axios
      .get(breakfastCountUrl)
      .then((res) => setBreakfastCount(res.data[0].BreakfastCount))
      .catch((err) => {
        setBreakfastCount(0);
        console.log(err);
      });
      axios
      .get(lunchCountUrl)
      .then((res) => {
        console.log(res.data[0])
        setLunchCount(res.data[0].LunchCount)})

      .catch((err) => {
        setLunchCount(0);
        console.log(err);
      });
      axios
      .get(dinnerCountUrl)
      .then((res) => setDinnerCount(res.data[0].DinnerCount))
      .catch((err) => {
        setDinnerCount(0);
        console.log(err);
      });
      axios
      .get(presentCountUrl)
      .then((res) => {
        setPresentEmpData(res.data)
        setPresentCount(res.data.length)})
      .catch((err) => {
        setPresentCount(0);
        console.log(err);
      });
  }
  useEffect(() => {
   handleCountFetch()
  },[shiftType]);
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
            <p> {presntCount}</p>
          </div>
          <div className="cont">
            <label>Breakfast Count</label>
            <p> {breakfastCount}</p>
          </div>
          <div className="cont">
            <label>Lunch Count</label>
            <p> {lunchCount}</p>
          </div>
          <div className="cont">
            <label>Dinner Count</label>
            <p> {dinnerCount}</p>
          </div>
        </div>
      )}
      {shiftType && shiftType === "First" && (
        <div className="Cards-cont">
          <div className="cont">
            <label>No.of Present:</label>
            <p> {presntCount}</p>
          </div>
          <div className="cont">
            <label>Breakfast Count</label>
            <p> {breakfastCount}</p>
          </div>
          <div className="cont">
            <label>Lunch Count</label>
            <p> {lunchCount}</p>
          </div>
        </div>
      )}
      {shiftType && shiftType === "Second" && (
        <div className="Cards-cont">
          <div className="cont">
            <label>No.of Present</label>
            <p> {presntCount}</p>
          </div>

          <div className="cont">
            <label>Dinner Count</label>
            <p> {dinnerCount}</p>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;
