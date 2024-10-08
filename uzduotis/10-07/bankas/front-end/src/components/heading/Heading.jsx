import { Link } from "react-router-dom";
import logo from "../../assets/logo_trans.png";
import "./Heading.css";

const Heading = () => {
  return (
    <div className=" m-4 d-flex justify-content-between align-items-center ">
      <Link to="/">
        <img src={logo} style={{ height: 75 }} alt="" />
      </Link>
      <div className="d-flex justify-content-center gap-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    My profile
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
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="login d-flex gap-3">
        <Link to="/login">
          <button className="btn btn-light">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Heading;
