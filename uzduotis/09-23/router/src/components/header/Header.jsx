import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <div className="container-header d-flex justify-content-center mt-3">
                <nav className="navbar navbar-expand-lg ">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/BC_%C5%BDalgiris_2023.png" style={{width:75}} alt="" /></Link>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/Calculator">Calculator</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/generator">Password generator</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/list">Product list</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
        </div>
        </>
    );
};

export default Header;