import React from "react";
import "../FoodTracker/FoodTracker.css";

const FoodTracker = () => {
  return (
    <div>
      <form>
        <div>
          <label> Employee ID</label>
          <input type="text" placeholder="EmployeeID" />
        </div>
        <div>
          <label> Employee Name</label>
          <input type="text" placeholder="Enter Employee Name" />
        </div>
        <div>
          <select>
            <option></option>
            <option></option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FoodTracker;
