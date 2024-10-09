import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo_trans.png";
import "./Header.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/logout");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="m-4 d-flex justify-content-between align-items-center">
      <Link to="/">
        <img src={logo} style={{ height: 75 }} alt="Logo" />
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

export default Header;
