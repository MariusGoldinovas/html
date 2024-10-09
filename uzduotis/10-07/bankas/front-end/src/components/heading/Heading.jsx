import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo_trans.png";
import "./Heading.css";

const Heading = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [loading, setLoading] = useState(true); // Track the loading state for session check
  const navigate = useNavigate();

  // Check session status from the server
  const checkSession = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/session-status",
        { withCredentials: true }
      );
      if (response.data.isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setIsLoggedIn(false); // Default to not logged in if there's an error
    } finally {
      setLoading(false); // Stop loading after checking session
    }
  };

  // Handle logout by calling the backend logout route
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/user/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Run the checkSession function on component mount
  useEffect(() => {
    checkSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading state while checking session
  }

  return (
    <div className=" m-4 d-flex justify-content-between align-items-center">
      <Link to="/">
        <img src={logo} style={{ height: 75 }} alt="" />
      </Link>
      <div className="d-flex justify-content-center gap-5">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/users" className="nav-link">
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/account" className="nav-link">
                      Accounts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className="nav-link">
                      Create Account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>

      <div className="login d-flex gap-3">
        {isLoggedIn ? (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn btn-light">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Heading;
