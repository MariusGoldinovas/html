import { Link } from 'react-router-dom';
import Search from '../search/Search';


const Header = () => {
  return (
    <div className="row d-flex justify-content-between align-items-center mt-4 mx-3">
      <div className="col-2">
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
          <img
            src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2283"
            style={{ height: 50, borderRadius: 50 }}
            alt=""
          />
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
