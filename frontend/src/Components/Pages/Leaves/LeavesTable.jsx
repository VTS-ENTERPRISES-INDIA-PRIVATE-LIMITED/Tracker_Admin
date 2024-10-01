import React from "react";

const LeavesTable = () => {
  return (
    <div>
      <table>
        <th>
          <tr>Employee Id</tr>
          <tr>Employee Name</tr>
          <tr> Role</tr>
          <tr>No.of leave days</tr>
          <tr> From Date</tr>
          <tr> End Date</tr>
          <tr>
            <button>Action</button>
          </tr>
        </th>
        <tbody>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tbody>
      </table>
    </div>
  );
};

export default LeavesTable;
