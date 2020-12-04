import React, { useState } from "react";
import { saveUser, sendOTP } from "../controller";
import { set } from "mongoose";

const Login = () => {
  const [num, setNum] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("false");
  const [uotp, setUotp] = useState("");

  const handleChange = (name) => (e) => {
    if (name === "num") {
      setNum(e.target.value);
    } else if (name === "uotp") {
      setUotp(e.target.value);
    } else {
      setCode(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!num || !code) {
      setError("Please Enter the required details");
    } else {
      if (!otp) {
        const response = sendOTP(num, code);
        if (response.err) {
          setError(response.err);
        } else {
          setOtp(true);
        }
      } else {
        if (!uotp) {
          setError("Please Enter the otp");
        } else {
          saveUser(num, code, uotp);
        }
      }
    }
  };

  return (
    <div className='container'>
      {error && <p>{error}</p>}
      <h2>Login</h2>
      <div>
        <input
          type='text'
          placeholder='Enter your country code'
          name='countrycode'
          value={code}
          onChange={handleChange("code")}
        />
        <input
          type='text'
          placeholder='Enter mobile number'
          value={num}
          name='phonenum'
          onChange={handleChange("num")}
        />
        {otp && (
          <input
            type='text'
            placeholder='Enter the OTP'
            value={uotp}
            name='uotp'
            onChange={handleChange("uotp")}
          />
        )}
        <button onClick={handleSubmit}>
          {otp ? "Verify OTP" : "Send OTP "}
        </button>
        <br></br>
      </div>
      <a href='http://localhost:5000/auth/google'>Login using Google</a>
      <br></br>
      <a href='http://localhost:5000/auth/facebook'>Login using Facebook</a>
    </div>
  );
};

export default Login;
