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
    fetchProducts(); 
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1000);
  }

  const fetchProducts = async () => {
    try {
      const url = 'https://login-signup-app-api-sigma.vercel.app/products'; 
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(url, {
        headers: {
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