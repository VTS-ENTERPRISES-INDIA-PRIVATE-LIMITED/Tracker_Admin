import React, { useEffect, useState } from "react";
import "../../AdminPages/Dashboard/Dashboard.css";
import DateTime from "../../../Utils/Datetime";
import axios from "axios";
import * as XLSX from "xlsx";
import { IoMdDownload } from "react-icons/io";

const Dashboard = () => {
  const [shiftType, setShiftType] = useState("");
  const [breakfastCount, setBreakfastCount] = useState();
  const [lunchCount, setLunchCount] = useState();
  const [dinnerCount, setDinnerCount] = useState();
  const [presntCount, setPresentCount] = useState();
  const [presentEmpData, setPresentEmpData] = useState([]);

  const handleCountFetch = () => {
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
        console.log(res.data[0]);
        setLunchCount(res.data[0].LunchCount);
      })

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
        console.log("empdata", res.data);
        setPresentEmpData(res.data);
        setPresentCount(res.data.length);
      })
      .catch((err) => {
        setPresentCount(0);
        console.log(err);
      });
  };
  const exportToExcel = () => {
    const formattedData = presentEmpData.map((item) => ({
      EmpId: item.EmpId,
      Name: item.Name,
      Shift: item.Shift,
      CabinNo: item.CabinNo,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    const wscols = [
      { wch: 10 },
      { wch: 25 },
      { wch: 18 },
      { wch: 12 },
      { wch: 12 },
    ];
    worksheet["!cols"] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Emp Leaves Details");

    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
    const time = `${String(now.getHours()).padStart(2, "0")}-${String(
      now.getMinutes()
    ).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
    const timestamp = `${date}_${time}`;
    const filename = `Emplopyees_Report_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, filename);
  };

  useEffect(() => {
    handleCountFetch();
  }, [shiftType]);
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
      </div>
      <div className="table-optns">
        <div className="table-optns1">
          Select Shift :
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
        <div className="table-optns2">
          <button onClick={exportToExcel} className="downloadBtn">
            <IoMdDownload size={20} /> Download Report
          </button>
        </div>
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
      <div className="Dashtable">
        <table>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
              <th>Shift</th>
              <th>Cabin</th>
            </tr>
          </thead>

          <tbody>
            <>
              {presentEmpData.length > 0 ? (
                presentEmpData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.EmpId}</td>
                    <td>{item.Name}</td>
                    <td>{item.Shift}</td>
                    <td>{item.CabinNo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    Select Shift Type...
                  </td>
                </tr>
              )}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
