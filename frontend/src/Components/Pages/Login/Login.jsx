import React, { useEffect, useState } from "react";
import "./Login.css";
import { UserOutlined } from "@ant-design/icons";
import { Button,message} from "antd";
import logginimg from './images/image.png'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import axios from "axios";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
const Login = ({setIsLoggedIn}) => {
  const [accountId, setAccountId] = useState();
  const [password, setPassword] = useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ id: "", password: "" });
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [errormsg, setErrormsg] = useState();
  const [isInvalid,setIsinvalid] = useState(false)

  
 
  
  const handleAccountid = (e) => {
    setAccountId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  <Button
    style={{
      width: 100,
    }}
    onClick={() => setPasswordVisible((prevState) => !prevState)}
  >
    {passwordVisible ? "Hide" : "Show"}
  </Button>;



//handling functions for login
const validateField = (name, value) => {
  let error = "";
  if (name === "id") {
    if (!value) {
      error = "ID is required";
    } else if (!/^VTS202\d{4}$/.test(value)) {
      error = "Invalid Employee ID";
    }
  }

  if (name === "password") {
    if (!value) {
      error = "Password is required";
    } else if (!/^.{6,}$/.test(value)) {
      error = "Minimum 6 characters";
    }
  }

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: error,
  }));
  return error === "";
};

const validateAllFields = () => {
  const isIdValid = validateField("id", accountId);
  const isPasswordValid = validateField("password", password);
  return isIdValid && isPasswordValid;
};



const handleLogin = (e) => {
  e.preventDefault();
  if (validateAllFields()) {
    setIsLoading(true)
    const url = `${process.env.REACT_APP_BACKEND_URL}/attendance/loginEmployee`;
    const creds = {
      EmployeeID: accountId,
      Password: password,
    };
    axios
      .post(url, creds)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token',getCurrentTime())
        message.success('Login Successful')
        setTimeout(() => {
          
          setIsLoggedIn(true)
        }, 1000);
        // navigate("/dashboard", { state: res.data.userdata[0] });
      })
      .catch((err) =>{
          console.log(err);
          setIsLoading(false)
          setIsinvalid(true)
      });
  }
};

const getCurrentTime =()=> {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutesFormatted} ${ampm}`;
}
  return (
    <div className="login">
      <div className="login-container">
        <div className="left-section">
          <img
            src={logginimg}
            alt=""
          />
        </div>
        <div className="login-page-vl"></div>
        <div className="right-section">
          <div className="login-box">
            <center>
              <div
                style={{
                  width: "30vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="banner-image-for-login"
              >
                <img
                  style={{ width: "80px", height: "80px", marginRight: "15px" }}
                  src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1720529524/logo_uvnz1f.png"
                  alt="banner"
                />
                <div>
                  <h3 className="VTS-Title">VTS</h3>
                  {/* <h5>ENTERPRISES</h5> */}
                </div>
              </div>
            </center>
            <form>
              <div className="input-group">
                <label htmlFor="accountNumber">Employee ID: </label>
                <Input
                  onChange={handleAccountid}
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  required
                  placeholder="Enter Employee ID"
                  prefix={<UserOutlined />}
                />
                {errors.id && (
                  <p style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                    {errors.id}
                  </p>
                )}
                <br />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password:</label>
                <Input.Password
                  onChange={handlePassword}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                  type="password"
                  name="password"
                  required
                  placeholder="Enter Password"
                />{errors.password && (
                  <p style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="button-group">
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="submit-button"
                >
                  {isLoading ? (<><Spin indicator={<LoadingOutlined spin />} size="small" color="white" /> {" "}Logging In..</>):(<>{isInvalid?"Try Again " : "Login"}</>)}
                </button>
              </div>
            </form>
            {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}
            <div className="additional-links">
              <a href="/reset-password">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
