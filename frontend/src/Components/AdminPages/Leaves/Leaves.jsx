import React, { useEffect, useState } from "react";
import "../../AdminPages/Leaves/Leaves.css";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx";
import { BsEyeFill } from "react-icons/bs";
import { Modal } from "antd";
import { Empty } from "antd";

const Leaves = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropDownValue, setDropdownValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [leaveData, setLeaveData] = useState([]);
  const [confirmAction, setConfirmAction] = useState({
    visible: false,
    type: "",
    item: null,
  });

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const filteredLeavesData = leaveData.filter((item) => {
    const searchFilter =
      item.Name.toUpperCase().includes(searchQuery.toUpperCase()) ||
      item.EmpId.toUpperCase().includes(searchQuery.toUpperCase());

    const dropDownFilter = dropDownValue
      ? item.Status.toUpperCase() === dropDownValue.toUpperCase()
      : true;

    return searchFilter && dropDownFilter;
  });

  const exportToExcel = () => {
    const dataToExport =
      searchQuery || dropDownValue ? filteredLeavesData : leaveData;

    const formattedData = dataToExport.map((item) => ({
      EmpId: item.EmpId,
      Name: item.Name,
      Reason: item.Reason,
      fromDate: item.StartDate,
      endDate: item.EndDate,
      NoOfDays: item.NoOfDays,
      status: item.Status,
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

  const handleApprove = (item) => {
    // Process approval
    console.log("Approved:", item);
    setConfirmAction({ visible: false, type: "", item: null });
  };

  const handleDecline = (item) => {
    // Process decline
    console.log("Declined:", item);
    setConfirmAction({ visible: false, type: "", item: null });
  };

  const showConfirm = (type, item) => {
    setConfirmAction({
      visible: true,
      type: type,
      item: item,
    });
  };

  const handleOk = () => {
    const { type, item } = confirmAction;
    if (type === "approve") {
      handleApprove(item);
    } else if (type === "decline") {
      handleDecline(item);
    }
  };

  const handleCancel = () => {
    setConfirmAction({ visible: false, type: "", item: null });
  };

  useEffect(() => {
    handlefetchData();
  }, []);

  return (
    <div className="leavetable-cont">
      <div className="table-optns">
        <div className="table-optns1">
          <input
            className="searchfilter"
            type="text"
            placeholder="Search by Emp ID or Emp Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-optns2">
          <select
            value={dropDownValue}
            className="dropDrownFilter"
            onChange={(e) => setDropdownValue(e.target.value)}
          >
            <option value="">Search By Status</option>
            <option value="Applied">Applied</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
          <button onClick={exportToExcel} className="adminportal-btn">
            <IoMdDownload size={20} /> Download Report
          </button>
        </div>
      </div>
      <div className="leavestable">
        <table>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
              <th>Subject</th>
              <th>From Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={8}>
                  loading...
                </td>
              </tr>
            ) : (
              <>
                {filteredLeavesData.length > 0 ? (
                  filteredLeavesData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.EmpId}</td>
                      <td>{item.Name}</td>
                      <td>{item.Reason}</td>
                      <td>{item.StartDate}</td>
                      <td>{item.EndDate}</td>
                      <td>{item.NoOfDays}</td>
                      <td>{item.Status}</td>
                      <td>
                        {item.Status === "APPLIED" ? (
                          <div className="leavebuttons">
                            <button
                              className="eye"
                              onClick={() => setSelectedEmployee(item)}
                            >
                              <BsEyeFill size={20} />
                            </button>
                            <button
                              className="right"
                              onClick={() => showConfirm("approve", item)}
                            >
                              <TiTick size={20} />
                            </button>
                            <button
                              className="cross"
                              onClick={() => showConfirm("decline", item)}
                            >
                              <RxCross2 size={20} />
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>
                      <Empty className="no-data-msg" />
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        title={`Are you sure you want to ${confirmAction.type}?`}
        visible={confirmAction.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>This action cannot be undone!</p>
      </Modal>

      <Modal
        title="Emp-Details"
        visible={selectedEmployee}
        onCancel={() => setSelectedEmployee(null)}
        footer={null}
      >
        <div className="Emp-details">
          <p>Employee ID: {selectedEmployee?.EmpId}</p>
          <p>Employee Name: {selectedEmployee?.Name}</p>
          <p>Reason For Leave: {selectedEmployee?.Reason}</p>
          <p>From Date: {selectedEmployee?.StartDate}</p>
          <p>End Date: {selectedEmployee?.EndDate}</p>
          <p>Total No. of days: {selectedEmployee?.NoOfDays}</p>
          <p>Status: {selectedEmployee?.Status}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Leaves;
