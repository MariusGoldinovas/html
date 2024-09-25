import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="color m-2">
      <div className="container">
        <nav className="custom-nav">
          <ul className="wtf">
            <li>
              <Link to="/home-page">HOME</Link>
            </li>
            <li>
              <Link to="/products">LIST</Link>
            </li>
            <li>
              <Link to="/form-add-product">CREATE LIST</Link>
            </li>
            <li>
              <Link to="/cart">CART</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
