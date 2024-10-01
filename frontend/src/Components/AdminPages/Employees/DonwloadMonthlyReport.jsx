import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const AttendanceReport = ({ month, year }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const fetchAttendanceData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/attendance/getAllEmployees`
      );
      console.log("attendance data", res.data);
      setAttendanceData(res.data);
      setIsDataFetched(true); 
    } catch (err) {
      console.error(err);
    }
  };

  const generateExcel = async () => {
    if (!month || !year) {
      message.error("Please select a year and month.");
      return;
    }

    if (!isDataFetched) {
      await fetchAttendanceData();
    }

    const monthNumber = monthMap[month];
    const monthDays = getDaysInMonth(monthNumber, year);

    const filteredData = attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() + 1 === monthNumber &&
        recordDate.getFullYear() === parseInt(year)
      );
    });

    if (filteredData.length === 0) {
      message.warning("No attendance data available for the selected month.");
      return;
    }

    const sheetData = [];
    sheetData.push([
      "Employee Id",
      "Employee Name",
      "Shift",
      ...monthDays,
      "Total Present",
      "Leaves",
    ]);

    const employees = Array.from(
      new Set(filteredData.map((item) => item.EmpId))
    ).sort();

    employees.forEach((empId) => {
      const employeeRecords = filteredData.filter(
        (record) => record.EmpId === empId
      );
      const employeeName = employeeRecords[0]?.Name || "";
      const shift = employeeRecords[0]?.Shift || "";
      let presentDays = 0;
      let row = [empId, employeeName, shift];

      monthDays.forEach((date) => {
        const formattedDate = formatDate(date);
        const attendanceRecord = employeeRecords.find(
          (record) => formatDate(new Date(record.date)) === formattedDate
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
    const date = new Date(year, month, 0);
    const daysInMonth = [];
    for (let i = 1; i <= date.getDate(); i++) {
      const day = new Date(year, month - 1, i);
      if (day.getDay() !== 0 && day.getDay() !== 6) {
        // Exclude Sundays (0) and Saturdays (6)
        daysInMonth.push(day);
      }
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
      <button onClick={generateExcel}>Download Attendance Report</button>
    </div>
  );
};

export default AttendanceReport;
