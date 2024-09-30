import React, { useState } from "react";
import "../FoodTracker/FoodTracker.css";

const FoodTracker = () => {
  const [formData, setFormData] = useState("");
  const [shiftValue, setShiftvalue] = useState("First");
  const [selectShift, setSelectShift] = useState();
  const [checkBoxVisible, setCheckBoxVisible] = useState(false);
  const [cubicleNo, setCubicleNo] = useState("1");
  const handleShiftValue = (e) => {
    setShiftvalue(e.target.value);
  };
  const handleShiftCheckBox = () => {
    setCheckBoxVisible(true);
  };
  const handleCubicleNo = (e) => {
    setCubicleNo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(formData);
  };
  return (
    <div className="emp-foodtracker">
      <form onSubmit={handleSubmit}>
        <h1>Attendance Form</h1>
        <div className=" row">
          <div className=" column">
            <label> Employee ID</label>
            <input type="text" placeholder="EmployeeID" />
          </div>
          <div className=" column">
            <label> Employee Name</label>
            <input type="text" placeholder="Enter Employee Name" />
          </div>
        </div>

        <div className=" row">
          <div className=" column">
            <label> Role</label>
            <input type="text" placeholder="Enter Role" />
          </div>
          <div className=" column">
            <label>Shift Type</label>
            <select value={shiftValue} onChange={handleShiftValue}>
              <option value="First" onClick={handleShiftCheckBox}>
                First
              </option>
              <option value="second" onClick={handleShiftCheckBox}>
                Second
              </option>
            </select>
          </div>
        </div>

        <div>
          {checkBoxVisible ? (
            <>
              <div>
                <label>Had Breakfast ?</label>
                <input type="checkbox" value="Yes" />
                <input type="checkbox" value="No" />
              </div>
              <div>
                <label>Willing to have Dinner?</label>
                <input type="checkbox" value="Yes" />
                <input type="checkbox" value="No" />
              </div>
            </>
          ) : (
            ""
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
