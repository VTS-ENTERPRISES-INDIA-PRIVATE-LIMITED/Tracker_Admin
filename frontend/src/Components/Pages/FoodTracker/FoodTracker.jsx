import React, { useState } from "react";
import "../FoodTracker/FoodTracker.css";

const FoodTracker = () => {
  const [formData, setFormData] = useState("");
  const [selectShift, setSelectShift] = useState("");

  const handleCubicleNo = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormData(formData);
    console.log(formData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleShiftTypeChange = (e) => {
    const selectedShift = e.target.value;
    setSelectShift(selectedShift);
    setFormData((prevFormData) => ({
      ...prevFormData,
      shiftType: { selectShift },
      breakfast: null,
      lunch: null,
      dinner: null,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="Emp-cont">
      <form onSubmit={handleSubmit}>
        <h1>Attendance Form</h1>
        <div className=" row">
          <div className=" column">
            <label> Employee ID</label>
            <input
              type="text"
              name="empId"
              placeholder="EmployeeID"
              onChange={handleChange}
            />
          </div>
          <div className=" column">
            <label> Employee Name</label>
            <input
              type="text"
              name="empName"
              placeholder="Enter Employee Name"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className=" row">
          <div className=" column">
            <label> Role</label>
            <input
              type="text"
              name="empRole"
              placeholder="Emp Role"
              onChange={handleChange}
            />
          </div>
          <div className=" column">
            <label>Shift Type</label>
            <select
              //   onChange={(e) => setSelectShift(e.target.value)}
              onChange={handleShiftTypeChange}
            >
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
                <input type="checkbox" onChange={handleCheckboxChange} />
                Yes
                <input type="checkbox" onChange={handleCheckboxChange} />
                No
              </div>
              <div className="checkbox">
                <label>Willing to have Lunch?</label>
                <input type="checkbox" onChange={handleCheckboxChange} />
                Yes
                <input type="checkbox" onChange={handleCheckboxChange} />
                No
              </div>
            </div>
          )}
          {selectShift && selectShift === "Second" && (
            <div className="checkbox-cont">
              <div className="checkbox">
                <label>Willing to have Dinner?</label>
                Yes
                <input type="checkbox" onChange={handleCheckboxChange} />
                No
                <input type="checkbox" onChange={handleCheckboxChange} />
              </div>
            </div>
          )}
        </div>
        <div className=" row">
          <div className="column">
            <label>Cabin No</label>
            <select name="cabinNo" onChange={handleCubicleNo}>
              <option>Select</option>
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
