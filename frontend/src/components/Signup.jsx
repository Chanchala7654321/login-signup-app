import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Fixed spelling
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { handleSuccess, handleError } from "./utils";

function Signup() {
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Fixed line 15
    console.log(name, value);

    // Update your state so the data is saved
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    const { name, email, password } = signupInfo;

    // 1. Basic Validation
    if (!name || !email || !password) {
      return handleError("All fields are required!"); // Fixed spelling
    }

    try {
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;
      if(success) {
          handleSuccess(message);
          setTimeout(() => {
              navigate("/login");
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={signupInfo.name}
            autoFocus // Keep only this one
            placeholder="Enter your name..."
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={signupInfo.email}
            placeholder="Enter your email..."
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={signupInfo.password}
            placeholder="Enter your password..."
          />
        </div>

        <button type="submit">Signup</button>
        <span>
          {" "}
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>

      {/* Fixed spelling */}
      <ToastContainer />
    </div>
  );
}

export default Signup;
