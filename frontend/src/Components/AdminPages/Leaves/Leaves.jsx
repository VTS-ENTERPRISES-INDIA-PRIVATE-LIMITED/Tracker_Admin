import React, { useEffect, useState } from "react";
import "../../AdminPages/Leaves/Leaves.css";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
const Leaves = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropDownValue, setDropdownValue] = useState("");

  const [leaveData, setLeaveData] = useState([]);
  const handlefetchData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/leaves/getleaverequests`;
    axios
      .get(url)
      .then((res) => {
        console.log("leavedata", res.data);
        setLeaveData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredLeavesData = leaveData.filter((item) => {
    const searchFilter = item.EmpId.toUpperCase().includes(
      searchQuery.toUpperCase()
    );

    const dropDownFilter = dropDownValue
      ? item.Status.toUpperCase() === dropDownValue.toUpperCase()
      : true;

    return searchFilter && dropDownFilter;
  });
  useEffect(() => {
    handlefetchData();
  }, []);

  return (
    <div className="leavetable-cont">
      <div className="table-optns">
        <div>
          <input
            className="searchfilter"
            type="text"
            placeholder="Search by Emp ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <select
            value={dropDownValue}
            className="dropDrownFilter"
            onChange={(e) => setDropdownValue(e.target.value)}
          >
            <option value="">Search By Status</option>
            <option value="Applied"> Applied</option>
            <option value="Approve">Approve</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th> From Date</th>
            <th> End Date</th>
            <th>No.of leave days</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeavesData.map((item) => (
            <tr key={item.EmpId}>
              <td>{item.EmpId}</td>
              <td>{item.Name}</td>
              <td>{item.StartDate}</td>
              <td>{item.EndDate}</td>
              <td>{item.NoOfDays}</td>
              <td>{item.Status}</td>
              <td>
                {item.Status === "APPLIED" ? (
                  <div className="leavebuttons">
                    <button className="right">
                      <TiTick size={20} />
                    </button>
                    <button className="cross">
                      <RxCross2 size={20} />
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaves;
