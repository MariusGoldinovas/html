import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="color m-2">
      <div className="container">
        <nav className="custom-nav">
          <ul className="wtf">
            <li>HOME</li>
            <li>LIST</li>
            <li>CREATE LIST</li>
            <li>CART</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;