import { Link } from 'react-router-dom';
import Search from '../search/Search';
import { useEffect, useState } from 'react';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
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
      <Link to="/login">
        {user?.userThumbnail ? (
          <img
            src={user.userThumbnail}
            style={{ height: 50, borderRadius: '50%' }}
            alt="User Thumbnail"
          />
        ) : (
          <i className="bi bi-person-lock" style={{ fontSize: 30 }}></i> // Display icon if no thumbnail
        )}
      </Link>

      </div>
      <div className="col-2">
        <Link to="/add-user">
          <i className="bi bi-person-plus h2 px-2"></i>
        </Link>
        <Link to="/upload">
          <i className="bi bi-cloud-upload h2 px-2"></i>
        </Link>
        <Link to="/admin">
          <i className="bi bi-person-gear h2 px-2"></i>
        </Link>
      </div>
    </div>
  );
};

export default Header;
