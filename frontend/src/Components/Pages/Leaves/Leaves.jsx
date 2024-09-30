import React, { useState } from "react";
import "../FoodTracker/FoodTracker.css";

const Leaves = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [leaveType, setLeaveType] = useState("");
  const handleLeaveType = (e) => {
    setLeaveType(e.target.value);
  };
  return (
    <div className="Emp-cont">
      <form onSubmit={handleSubmit}>
        <h1>Leave Form</h1>
        <div className=" row">
          <div className=" column">
            <label> Employee ID</label>
            <input type="text" placeholder="EmployeeID" />
          </div>
          <div className=" column">
            <label> Employee Name</label>
            <input type="text" placeholder="Enter Employee Name" required />
          </div>
        </div>

        <div className=" row">
          <div className=" column">
            <label> Subject</label>
            <select value={leaveType} onChange={handleLeaveType}>
              <option value=""> Select</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Paternity Leave ">Paternity Leave </option>
              <option value="Maternity Leave"> Maternity Leave</option>
            </select>
          </div>
          <div className=" column">
            <label>Reason</label>
            <textarea type="text" required />
          </div>
        </div>

        <div className=" row">
          <div className=" column">
            <label> From Date</label>
            <input type="date" />
          </div>
          <div className=" column">
            <label>End Date</label>
            <input type="date" />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Leaves;
