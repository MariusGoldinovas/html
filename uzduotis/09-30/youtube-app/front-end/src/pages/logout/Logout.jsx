import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout route on the backend
      await axios.get('http://localhost:3000/api/user/logout', {
        withCredentials: true  // Ensures cookies are sent with the request
      });
      
      // Redirect to login or home page after logout
      navigate('/login'); // Redirect to login or any other page
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Are you sure you want to log out?</h1>
      <button onClick={handleLogout} className="btn btn-danger mt-4">
        Logout
      </button>
    </div>
  );
};

export default Logout;
