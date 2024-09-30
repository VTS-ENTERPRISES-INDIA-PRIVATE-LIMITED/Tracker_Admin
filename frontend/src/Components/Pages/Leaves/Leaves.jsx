import React, { useState } from "react";
import {message} from "antd"
import "../FoodTracker/FoodTracker.css";
import axios from "axios"
const Leaves = () => {
  const empName = localStorage.getItem("empname");
  const empId = localStorage.getItem("empid");
  const empRole = localStorage.getItem("emprole");
  const [submitText,setSubmitText] = useState('Apply Leave')
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    return `${day}/${month}/${year}`;
  };
  const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const differenceInTime = end - start;
    
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
    return differenceInDays;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    
    const data = {
      Name : empName,
      EmpId : empId,
      Subject : leaveType,
      Reason : reason,
      StartDate : formatDate(fromDate),
      EndDate : formatDate(endDate),
      NoOfDays : calculateDaysBetween(fromDate,endDate)
    }
    console.log(data)

    const url = `${process.env.REACT_APP_BACKEND_URL}/leaves/postLeaveRequest`
    setSubmitText("Applying Leave ....")
    axios.post(url,data)
    .then(res=>{
      setSubmitText("Done")
      message.success("Leave Application Sent !!")
    })
    .catch(err=>{
      message.error("Error Applying for Leave")
    })
  };

  return (
    <div className="Emp-cont">
      <form onSubmit={handleSubmit}>
        <h1>Leave Form</h1>

        <div className="row">
          <div className="column">
            <label>Employee ID</label>
            <input type="text" value={empId} readOnly required />
          </div>
          <div className="column">
            <label>Employee Name</label>
            <input type="text" value={empName} readOnly required />
          </div>
          <div className="column">
            <label>Employee Role</label>
            <input type="text" value={empRole} readOnly required />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label>Subject</label>
            <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required>
              <option value="">Select</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
            </select>
          </div>
          <div className="column">
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label>From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div className="column">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <button disabled={submitText==="Applying Leave ...." || submitText==="Done"} type="submit">{submitText}</button>
        </div>
      </form>
    </div>
  );
};

export default Leaves;
