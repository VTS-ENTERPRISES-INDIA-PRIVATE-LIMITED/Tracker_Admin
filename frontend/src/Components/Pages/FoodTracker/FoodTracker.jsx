import React, { useState } from "react";
import "../FoodTracker/FoodTracker.css";

const FoodTracker = () => {
  const [formData, setFormData] = useState("");
  const [selectShift, setSelectShift] = useState("");
  const [cubicleNo, setCubicleNo] = useState("1");

  const handleCubicleNo = (e) => {
    setCubicleNo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(formData);
  };
  return (
    <div className="Emp-cont">
      <form onSubmit={handleSubmit}>
        <h1>Attendance Form</h1>
        <div className=" row">
          <div className=" column">
            <label> Employee ID</label>
            <input type="text" placeholder="EmployeeID" />
          </div>
          <div className=" column">
            <label> Employee Name</label>
            <input type="text" placeholder="Enter Employee Name" re />
          </div>
        </div>

        <div className=" row">
          <div className=" column">
            <label> Role</label>
            <input type="text" placeholder="Emp Role" />
          </div>
          <div className=" column">
            <label>Shift Type</label>
            <select onChange={(e) => setSelectShift(e.target.value)}>
              <option value="">Select Shift</option>
              <option value={"First"} key={"First"}>
                First
              </option>
              <option value={"Second"} key={"Second"}>
                Second
              </option>
            </select>
          </div>
        </div>

        <div>
          {selectShift && selectShift === "First" && (
            <div className="checkbox-cont">
              <div className="checkbox ">
                <label>Had Breakfast ?</label>
                <input type="checkbox" value="Yes" />
                Yes
                <input type="checkbox" value="No" />
                No
              </div>
              <div className="checkbox">
                <label>Willing to have Lunch?</label>
                <input type="checkbox" value="Yes" />
                Yes
                <input type="checkbox" value="No" />
                No
              </div>
            </div>
          )}
          {selectShift && selectShift === "Second" && (
            <div className="checkbox-cont">
              <div className="checkbox">
                <label>Willing to have Dinner?</label>
                yes
                <input type="checkbox" value="Yes" />
                No
                <input type="checkbox" value="No" />
              </div>
            </div>
          )}
        </div>
        <div className=" row">
          <div className="column">
            <label>Cubicle No</label>
            <select value={cubicleNo} onChange={handleCubicleNo}>
              <option value="HR">HR</option>
              <option value="1">1 </option>
              <option value="2">2 </option>
              <option value="3"> 3</option>
            </select>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FoodTracker;
