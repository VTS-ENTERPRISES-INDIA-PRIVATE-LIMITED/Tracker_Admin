import React, { useState } from "react";
import "../FoodTracker/FoodTracker.css";
import { message } from "antd";
import axios from "axios";
const FoodTracker = () => {
  const [formData, setFormData] = useState("");
  const [cabinNo, setCabinNo] = useState("");
  const [selectShift, setSelectShift] = useState("");
  const [hadBreakfast, setHadBreakfast] = useState(null);
  const [willingLunch, setWillingLunch] = useState(null);
  const [willingDinner, setWillingDinner] = useState(null);
  const [submitText, setSubmitText] = useState("Submit");
  const handleBreakfastChange = (value) => {
    setHadBreakfast(value);
  };

  const handleLunchChange = (value) => {
    setWillingLunch(value);
  };

  const handleDinnerChange = (value) => {
    setWillingDinner(value);
  };
  const handleCubicleNo = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     Name: localStorage.getItem("empname"),
  //     EmpId: localStorage.getItem("empid"),
  //     Shift: selectShift,
  //     Breakfast: hadBreakfast,
  //     Lunch: willingLunch,
  //     Dinner: willingDinner,
  //     CabinNo: cabinNo,
  //   };

  //   console.log(data);
  //   const url = `${process.env.REACT_APP_BACKEND_URL}/attendance/postAttendance`;
  //   setSubmitText("Posting...");
  //   axios
  //     .post(url, data)
  //     .then((res) => {
  //       message.success("Attendance posted successfully");
  //       setSubmitText("Done");
  //     })
  //     .catch((err) => {
  //       message.error("Error posting attendance");
  //       setSubmitText("Failed! Try again");
  //     });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    if (selectShift === "Full Time" || selectShift === "First") {
      if (currentHour > 9 || (currentHour === 9 && currentMinutes >= 30)) {
        message.error(
          "Login time has already passed for full time or first shift."
        );
        return;
      }
    } else if (selectShift === "Second") {
      if (
        currentHour < 14 ||
        (currentHour === 14 && currentMinutes < 45) ||
        currentHour > 15||
        (currentHour === 15 && currentMinutes > 30)
      ) {
        message.error(
          "Responses for second shift are only allowed between 2:45 PM and 3:30 PM."
        );
        return;
      }
    }
    if (selectShift === "") {
      message.error("Please fill out all the details ");
      return;
    }
    const data = {
      Name: localStorage.getItem("empname"),
      EmpId: localStorage.getItem("empid"),
      Shift: selectShift,
      Breakfast: hadBreakfast,
      Lunch: willingLunch,
      Dinner: willingDinner,
      CabinNo: cabinNo,
    };

    console.log(data);
    const url = `${process.env.REACT_APP_BACKEND_URL}/attendance/postAttendance`;
    setSubmitText("Posting...");
    axios
      .post(url, data)
      .then((res) => {
        message.success("Attendance posted successfully");
        setSubmitText("Done");
      })
      .catch((err) => {
        message.error("Error posting attendance");
        setSubmitText("Failed! Try again");
      });
  };

  const handleShiftTypeChange = (e) => {
    const selectedShift = e.target.value;
    setSelectShift(selectedShift);
    setFormData((prevFormData) => ({
      ...prevFormData,
      shiftType: { selectShift },
    }));
  };

  return (
    <div className="Emp-cont">
      <form onSubmit={handleSubmit}>
        <h1>Attendance Form</h1>
        <div className=" row">
          <div className="column">
            <label> Employee ID</label>
            <input
              type="text"
              name="empId"
              placeholder="EmployeeID"
              readOnly
              value={localStorage.getItem("empid")}
            />
          </div>
          <div className="column">
            <label> Employee Name</label>
            <input
              type="text"
              name="empName"
              placeholder="Enter Employee Name"
              value={localStorage.getItem("empname")}
              required
              readOnly
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
              value={localStorage.getItem("emprole")}
            />
          </div>
          <div className=" column">
            <label>Shift Type</label>
            <select onChange={handleShiftTypeChange}>
              <option value="">Select Shift</option>
              <option value={"Full Time"} key={"Full Time"}>
                Full Time
              </option>
              <option value={"First"} key={"First"}>
                First
              </option>
              <option value={"Second"} key={"Second"}>
                Second
              </option>
              <option value={"Work From Home"} key={"Work From Home"}>
                Work From Home
              </option>
            </select>
          </div>
        </div>

        <div>
          {selectShift && selectShift === "Full Time" && (
            <div className="checkbox-cont">
              <div className="checkbox">
                <label>Had Breakfast?</label>
                <input
                  type="checkbox"
                  checked={hadBreakfast === "Yes"}
                  onChange={() => handleBreakfastChange("Yes")}
                />
                Yes
                <input
                  type="checkbox"
                  checked={hadBreakfast === "No"}
                  onChange={() => handleBreakfastChange("No")}
                />
                No
              </div>

              <div className="checkbox">
                <label>Willing to have Lunch?</label>
                <input
                  type="checkbox"
                  checked={willingLunch === "Yes"}
                  onChange={() => handleLunchChange("Yes")}
                />
                Yes
                <input
                  type="checkbox"
                  checked={willingLunch === "No"}
                  onChange={() => handleLunchChange("No")}
                />
                No
              </div>
              <div className="checkbox">
                <label>Willing to have Dinner?</label>
                <input
                  type="checkbox"
                  checked={willingDinner === "Yes"}
                  onChange={() => handleDinnerChange("Yes")}
                />
                Yes
                <input
                  type="checkbox"
                  checked={willingDinner === "No"}
                  onChange={() => handleDinnerChange("No")}
                />
                No
              </div>
            </div>
          )}
          {selectShift && selectShift === "First" && (
            <div className="checkbox-cont">
              <div className="checkbox">
                <label>Had Breakfast?</label>
                <input
                  type="checkbox"
                  checked={hadBreakfast === "Yes"}
                  onChange={() => handleBreakfastChange("Yes")}
                />
                Yes
                <input
                  type="checkbox"
                  checked={hadBreakfast === "No"}
                  onChange={() => handleBreakfastChange("No")}
                />
                No
              </div>

              <div className="checkbox">
                <label>Willing to have Lunch?</label>
                <input
                  type="checkbox"
                  checked={willingLunch === "Yes"}
                  onChange={() => handleLunchChange("Yes")}
                />
                Yes
                <input
                  type="checkbox"
                  checked={willingLunch === "No"}
                  onChange={() => handleLunchChange("No")}
                />
                No
              </div>
            </div>
          )}
          {selectShift && selectShift === "Second" && (
            <div className="checkbox-cont">
              <div className="checkbox">
                <label>Willing to have Dinner?</label>
                <input
                  type="checkbox"
                  checked={willingDinner === "Yes"}
                  onChange={() => handleDinnerChange("Yes")}
                />
                Yes
                <input
                  type="checkbox"
                  checked={willingDinner === "No"}
                  onChange={() => handleDinnerChange("No")}
                />
                No
              </div>
            </div>
          )}
        </div>
        <div className=" row">
          <div className="column">
            <label>Cabin No</label>
            <select name="cabinNo" onChange={(e) => setCabinNo(e.target.value)}>
              <option>Select</option>
              <option value="CABIN- 02">CABIN- 02</option>
              <option value="CABIN- 04">CABIN- 04 </option>
              <option value="CABIN- 12">CABIN- 12 </option>
              <option value="CABIN- 25">CABIN- 25 </option>
              <option value="CABIN- 27">CABIN- 27</option>
            </select>
          </div>
        </div>
        <div>
          <button
            disabled={submitText === "Posting..." || submitText === "Done"}
            type="submit"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodTracker;
