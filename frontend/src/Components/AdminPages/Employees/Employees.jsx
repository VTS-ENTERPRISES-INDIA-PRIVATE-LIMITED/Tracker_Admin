import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Empty } from "antd";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx";
import "./Employees.css";
import { message } from "antd";
import AttendanceReport from "./DonwloadMonthlyReport";

const Employees = () => {
  const [workingDays, setWorkingDays] = useState(25);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [empData, setEmpData] = useState([]);
  const [shiftFilter, setShiftFilter] = useState(""); // State for shift filter
  const [attendanceData, setAttendanceData] = useState([]);
  const months = moment.months();
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  const filteredEmpData = empData.filter((item) => {
    const matchesShift = shiftFilter ? item.Shift === shiftFilter : true;
    const matchesSearch =
      item.Name.toUpperCase().includes(searchQuery.toUpperCase()) ||
      item.EmpId.toUpperCase().includes(searchQuery.toUpperCase());
    return matchesShift && matchesSearch;
  });

  useEffect(() => {
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);

    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const formattedStartOfMonth = formatDate(startOfMonth);
    handleFetchData(formattedStartOfMonth, formattedCurrentDate);
  }, []);

  const handleFetchData = (startDate, endDate) => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/attendance/getEmployeeAttendanceData`;
    axios
      .post(url, {
        startDate: startDate,
        endDate: endDate,
      })
      .then((res) => {
        console.log(res.data);
        setEmpData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const handleSearch = () => {
    console.log(month, year);
    if (month && year) {
      const start = moment(`${year}-${month}-01`, "YYYY-MMMM-DD")
        .startOf("month")
        .format("DD/MM/YYYY");
      const end = moment(`${year}-${month}-01`, "YYYY-MMMM-DD")
        .endOf("month")
        .format("DD/MM/YYYY");

      handleFetchData(start, end);
    } else {
      message.error("Please select both month and year.");
    }
  };

  const exportToExcel = () => {
    const dataToExport = searchQuery ? filteredEmpData : empData;

    const formattedData = dataToExport.map((item) => {
      const noOfLeaves = workingDays
        ? workingDays - item.PresentCount
        : 25 - item.PresentCount;

      return {
        EmpId: item.EmpId,
        Name: item.Name,
        Shift: item.Shift,
        NoofDaysPresent: item.PresentCount,
        NoOfLeavesCount: noOfLeaves, // Add calculated leaves count
      };
    });

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
    const filename = searchQuery
      ? `Filtered_Receivables_Report_${timestamp}.xlsx`
      : `Receivables_Report_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, filename);
  };

  return (
    <div className="Emptable-cont">
      <div className="table-optns0">
        <div className="table-optns1">
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            Select Month :
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Select Month</option>
              {months.map((m, index) => (
                <option key={index} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            Select Year :
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              {years.map((y, index) => (
                <option key={index} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button style={{ marginLeft: "20px" ,fontSize:"13px"}} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <button className="adminportal-btn" onClick={exportToExcel}>
            <IoMdDownload size={20} /> Download Report
          </button>
          <AttendanceReport month={month} year={year} />
        </div>
      </div>

      <div className="table-optns2">
        <div>
          <input
            className="searchfilter"
            type="text"
            placeholder="Search by Emp ID or Emp Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          Select Shift :
          <select onChange={(e) => setShiftFilter(e.target.value)}>
            <option value={"--select--"}>Select</option>
            <option value={"Full Time"}>Full Time</option>
            <option value={"First"}>First</option>
            <option value={"Second"}>Second</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          Working Days :
          <input
            placeholder="25 By Default"
            onChange={(e) => setWorkingDays(e.target.value)}
          />
        </div>
      </div>

      <div className="Emptable">
        <table>
          <thead>
            <tr>
              <th>Emp Id</th>
              <th>Employee Name</th>
              <th>Shift</th>
              <th>No.of Days Present</th>
              <th>No.of Leaves taken</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={5}>
                  loading...
                </td>
              </tr>
            ) : (
              <>
                {filteredEmpData.length > 0 ? (
                  filteredEmpData.map((item) => (
                    <tr key={item.EmpId}>
                      <td>{item.EmpId}</td>
                      <td>{item.Name}</td>
                      <td>{item.Shift}</td>
                      <td>{item.PresentCount}</td>

                      <td>
                        {workingDays
                          ? workingDays - item.PresentCount
                          : 25 - item.PresentCount}
                      </td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
