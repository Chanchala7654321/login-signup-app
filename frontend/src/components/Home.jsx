import React, { useState, useEffect } from 'react'
import { handleError, handleSuccess } from './utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [loggInData, setLoggInData] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggInData(localStorage.getItem("loggedInUser"));
    fetchProducts(); // Fixed name
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1000);
  }

  const fetchProducts = async () => {
    try {
      const url = 'https://login-signup-app-api-sigma.vercel.app/products'; // Use Port 5000 from your index.js
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(url, {
        headers: {
          // If your middleware expects "Bearer ", use: `Bearer ${token}`
          'Authorization': token 
        }
      });

      const result = await response.json();
      setProducts(result); 
    } catch (error) {
      handleError("Failed to fetch products!");
    }
  }




  return (
    <div>
      <h1>Welcome, {loggInData}</h1>
      <button onClick={handleLogout}>Logout</button>

      <div className="product-list">
        {/* Added a check to ensure products is an array before mapping */}
        {Array.isArray(products) && products.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home