import React, { useState } from "react";
import moment from "moment";

const Employees = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const months = moment.months();
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

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
  

  return (
    <div style={{ padding: "20px" }}>
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

        {/* <tbody>
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

                    <td>{item.}</td>
                  </tr>
                ))
              ) : (
                <p>No Data...</p>
              )}
            </>
          )}
        </tbody> */}
      </table>
    </div>
  );
};

export default Employees;
