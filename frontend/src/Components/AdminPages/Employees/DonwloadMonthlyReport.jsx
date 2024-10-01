import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx";

const AttendanceReport = ({ month, year }) => {
  console.log(month, year);
  const [attendanceData, setAttendanceData] = useState([]);

  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const fetchAttendanceData = async (selectedMonth, selectedYear) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/attendance/getAllEmployees/${selectedMonth}/${selectedYear}`
      );
      console.log("attendance data", res.data);
      setAttendanceData(res.data);
    } catch (err) {
      console.error(err);
      message.error("Error fetching attendance data");
    }
  };

  const generateExcel = async () => {
    if (!month || !year) {
      message.error("Please select a year and month.");
      return;
    }

    const selectedMonth = monthMap[month]; // Convert month name to number
    if (!selectedMonth) {
      message.error("Invalid month selected.");
      return;
    }

    await fetchAttendanceData(selectedMonth, year); // Fetch data before generating Excel

    if (attendanceData.length === 0) {
      message.warning("No attendance data available for the selected month.");
      return;
    }

    const monthDays = getDaysInMonth(selectedMonth, year);

    const sheetData = [];
    sheetData.push([
      "Employee Id",
      "Employee Name",
      "Shift",
      ...monthDays.map((day) => formatDate(day)),
      "Total Present",
      "Leaves",
    ]);

    const employees = Array.from(
      new Set(attendanceData.map((item) => item.EmpId))
    ).sort();

    employees.forEach((empId) => {
      const employeeRecords = attendanceData.filter(
        (record) => record.EmpId === empId
      );
      const employeeName = employeeRecords[0]?.Name || "";
      const shift = employeeRecords[0]?.Shift || "";
      let presentDays = 0;
      let row = [empId, employeeName, shift];

      monthDays.forEach((date) => {
        const formattedDate = formatDate(date);
        const attendanceRecord = employeeRecords.find(
          (record) => record.date === formattedDate // String comparison
        );
        if (attendanceRecord && attendanceRecord.IsPresent === 1) {
          row.push("P");
          presentDays++;
        } else {
          row.push("A");
        }
      });

      row.push(presentDays, monthDays.length - presentDays); // Total Present and Leaves
      sheetData.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, `Attendance_${month}_${year}.xlsx`);
  };

  // Helper function to get the days of the month, excluding weekends
  const getDaysInMonth = (month, year) => {
    const daysInMonth = [];
    const lastDay = new Date(year, month, 0).getDate(); // Get last day of the month
    for (let i = 1; i <= lastDay; i++) {
      const day = new Date(year, month - 1, i); // month - 1 because month is 0-based
      daysInMonth.push(day); // Include all days, including weekends
    }
    return daysInMonth;
  };

  // Helper function to format the date to 'dd/mm/yyyy'
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <button className="adminportal-btn" onClick={generateExcel}>
        <IoMdDownload size={15} />
        Download Attendance Report
      </button>
    </div>
  );
};

export default AttendanceReport;
