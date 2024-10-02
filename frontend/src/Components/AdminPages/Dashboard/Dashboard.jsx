import React, { useEffect, useState } from "react";
import "../../AdminPages/Dashboard/Dashboard.css";
import DateTime from "../../../Utils/Datetime";
import axios from "axios";
import * as XLSX from "xlsx";
import { IoMdDownload } from "react-icons/io";
import { Empty } from "antd";

const Dashboard = () => {
  const [shiftType, setShiftType] = useState("");
  const [fullTimeCount, setFulltimeCount] = useState();
  const [firstShiftCount, setFirstShiftCount] = useState();
  const [secondShiftCount, setSecondShiftCount] = useState();
  const [presntCount, setPresentCount] = useState();
  const [presentEmpData, setPresentEmpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCountFetch = () => {
    setIsLoading(true);
    const fullTimeShiftURl = `${process.env.REACT_APP_BACKEND_URL}/attendance/fulltime/foodcount`;
    const firstShiftUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/firstshift/foodcount`;
    const seconsShiftUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/secondshift/foodcount`;
    const presentCountUrl = `${process.env.REACT_APP_BACKEND_URL}/attendance/shiftWiseEmployees/${shiftType}`;

    axios
      .get(fullTimeShiftURl)
      .then((res) => setFulltimeCount(res.data))
      .catch((err) => {
        setFulltimeCount([
          {
            BreakfastCount: "0",
            LunchCount: "0",
            DinnerCount: "0",
          },
        ]);
        console.log(err);
      });
    axios
      .get(firstShiftUrl)
      .then((res) => {
        console.log(res.data[0]);
        setFirstShiftCount(res.data);
      })

      .catch((err) => {
        setFirstShiftCount([
          {
            BreakfastCount: "0",
            LunchCount: "0",
          },
        ]);
        console.log(err);
      });
    axios
      .get(seconsShiftUrl)
      .then((res) => setSecondShiftCount(res.data))
      .catch((err) => {
        setSecondShiftCount([
          {
            DinnerCount: "0",
          },
        ]);
        console.log(err);
      });
    axios
      .get(presentCountUrl)
      .then((res) => {
        console.log("empdata", res.data);
        setPresentEmpData(res.data);
        setPresentCount(res.data.length);
        setIsLoading(false);
      })
      .catch((err) => {
        setPresentCount(0);
        console.log(err);
        setIsLoading(false);
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
        <h2 className="wish-message" style={{ display: "flex", gap: "0.5rem" }}>
          Welcome
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
          <button onClick={exportToExcel} className="adminportal-btn">
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
            <p> {fullTimeCount[0].BreakfastCount}</p>
          </div>
          <div className="cont">
            <label>Lunch Count</label>
            <p> {fullTimeCount[0].LunchCount}</p>
          </div>
          <div className="cont">
            <label>Dinner Count</label>
            <p> {fullTimeCount[0].DinnerCount}</p>
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
            <p> {firstShiftCount[0].BreakfastCount}</p>
          </div>
          <div className="cont">
            <label>Lunch Count</label>
            <p> {firstShiftCount[0].LunchCount}</p>
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
            <p> {secondShiftCount[0].DinnerCount}</p>
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
              {shiftType ? (
                <>
                  {isLoading ? (
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan={4}>
                        loading...
                      </td>
                    </tr>
                  ) : (
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
                          <td colSpan={5}>
                            <Empty className="no-data-msg" />
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </>
              ) : (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={4}>
                    Select Shift Type
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
