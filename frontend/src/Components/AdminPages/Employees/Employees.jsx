import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx";

const Employees = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [empData, setEmpData] = useState([]);

  const months = moment.months();
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );
  const filteredEmpData = empData.filter((item) => {
    return item.Name.toUpperCase().includes(searchQuery.toUpperCase());
  });
  const handleSearch = () => {
    if (month && year) {
      const startDate = moment(`${year}-${month}-01`, "YYYY-MMMM-DD")
        .startOf("month")
        .format("DD/MM/YYYY");
      const endDate = moment(`${year}-${month}-01`, "YYYY-MMMM-DD")
        .endOf("month")
        .format("DD/MM/YYYY");

      console.log(`Start Date: ${startDate}`);
      console.log(`End Date: ${endDate}`);
      console.log(`Year: ${year}`);
    } else {
      console.log("Please select both month and year.");
    }
  };
  const exportToExcel = () => {
    const dataToExport = searchQuery ? filteredEmpData : empData;

    const formattedData = dataToExport.map((item) => ({
      EmpId: item.EmpId,
      Name: item.Name,
      Reason: item.Reason,
      fromDate: item.StartDate,
      endDate: item.EndDate,
      NoOfDays: item.NoOfDays,
      status: item.status,
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
    const filename = searchQuery
      ? `Filtered_Receivables_Report_${timestamp}.xlsx` // Filename for filtered data
      : `Receivables_Report_${timestamp}.xlsx`; // Filename for full table

    XLSX.writeFile(workbook, filename);
  };
  const handlefetchData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/attendance/getEmployeeAttendanceData`;
    axios
      .get(url)
      .then((res) => {
        console.log("Emp", res.data);
        setEmpData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    handlefetchData();
  }, []);

  return (
    <div className="Emptable-cont">
      <div className="table-optns">
        <div className="table-optns1">
          <input
            className="searchfilter"
            type="text"
            placeholder="Search by Emp ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-optns2">
          <button onClick={exportToExcel}>
            <IoMdDownload size={20} /> Download Report
          </button>
        </div>
      </div>
      <label>
        Select Month:
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          {months.map((m, index) => (
            <option key={index} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginLeft: "20px" }}>
        Select Year:
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          {years.map((y, index) => (
            <option key={index} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <button style={{ marginLeft: "20px" }} onClick={handleSearch}>
        Search
      </button>

      <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Shift</th>
            <th>No.of Days Present</th>
            <th>No.of Leaves taken</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <div>
              <p>loading....</p>
            </div>
          ) : (
            <>
              {filteredEmpData.length > 0 ? (
                filteredEmpData.map((item) => (
                  <tr key={item.EmpId}>
                    <td>{item.EmpId}</td>
                    <td>{item.Name}</td>
                    <td>{item.Shift}</td>
                    <td>{item.PresentCount}</td>

                    {/* <td>{item.}</td> */}
                  </tr>
                ))
              ) : (
                <p>No Data...</p>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
