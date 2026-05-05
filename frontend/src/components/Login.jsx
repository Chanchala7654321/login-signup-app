import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Fixed spelling
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { handleSuccess, handleError } from "./utils";

function Login() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Fixed line 15
    console.log(name, value);

    // Update your state so the data is saved
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    const { name, email, password } = loginInfo;

    // 1. Basic Validation
    if (!email || !password) {
      return handleError("All fields are required!"); // Fixed spelling
    }

    try {
      const url = "https://login-signup-app-api-sigma.vercel.app/auth/login";
      const response = await fetch(url, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message,jwtToken, name, error } = result;
      if(success) {
          handleSuccess(message);
          localStorage.setItem("jwtToken", jwtToken);
          localStorage.setItem("loggedInUser", name);

          setTimeout(() => {
              navigate("/home");
          }, 2000);
      }
      else if(error) {
          const details = error.details[0].message;
          handleError(details);
      }
      else if(!success) {
          handleError(message);
      }

      console.log(result);
  } catch (err) {
      // This catches network failures (Server is down)
      handleError("Cannot connect to server. Is your backend running?");
  }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={loginInfo.email}
            placeholder="Enter your email..."
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={loginInfo.password}
            placeholder="Enter your password..."
          />
        </div>

        <button type="submit">Login</button>
        <span>
          {" "}
          Does't have an account? <Link to="/signup">Login</Link>
        </span>
      </form>

      {/* Fixed spelling */}
      <ToastContainer />
    </div>
  );
}

export default Login;
