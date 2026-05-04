import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Added missing imports
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "../src/App.css";
import RefrshHandler from "./components/RefrshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoutes = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div>


    <RefrshHandler setIsAuthenticated={setIsAuthenticated}/>
      
      <Routes>
        {/* Redirect root (/) to login or home */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Define your actual page routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/home" element={<Home />} /> */}

        <Route path="/home" element={<PrivateRoutes element={ <Home/>} />} />  // Extra things ======

      </Routes>
    </div>
  );
}

export default App;
