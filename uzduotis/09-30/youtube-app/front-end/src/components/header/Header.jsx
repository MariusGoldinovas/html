import { Link } from 'react-router-dom';
import Search from '../search/Search';
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { BASE_URL } from '../../utils/config';  

const Header = () => {
  const [user, setUser] = useState(null);  // Store user info here

  useEffect(() => {
    // Function to check if the user is authenticated
    const checkAuthentication = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/user/me`, { withCredentials: true });
        console.log('User is authenticated:', response.data);
        setUser(response.data.user);  // Set the user data if authenticated
      } catch (error) {
        console.log('User is not authenticated', error);
        setUser(null);  // Reset user if not authenticated
      } 
    };

    checkAuthentication();
  }, []);

  return (
    <div className="row d-flex justify-content-between align-items-center mt-4 mx-3">
      <div className="col-2 d-flex justify-content-center">
        <Link to="/home">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
            style={{ height: 50 }}
            alt="YouTube Logo"
          />
        </Link>
      </div>
      <div className="col-5">
        <Search />
      </div>
      <div className="col-1">
            <Link to="/add-user">
              <i className="bi bi-person-add h2 px-2" aria-label="Add User"></i>
            </Link>
            <Link to="/login">
              {user?.userThumbnail ? (
                <img
                  src={`${BASE_URL}/photos/${user.userThumbnail}`}
                  style={{ height: 50, width: 50, borderRadius: '50%' }}
                  alt="User Thumbnail"
                />
              ) : (
                <i className="bi bi-person-lock" style={{ fontSize: 30 }} aria-label="Login"></i>
              )}
            </Link>
      </div>

      {/* Show upload, admin, and logout options if the user is logged in */}
      {user && (
        <div className="col-2">
          <Link to="/upload">
            <i className="bi bi-cloud-upload h2 px-2" aria-label="Upload"></i>
          </Link>
          <Link to="/admin">
            <i className="bi bi-person-gear h2 px-2" aria-label="Admin Panel"></i>
          </Link>
          <Link to="/logout">
            <i className="bi bi-person-walking h2 px-2" aria-label="Logout"></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
