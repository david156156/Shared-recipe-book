import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/me-book" className="navbar-logo">
          ספר המתכונים האישי
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              דף הבית
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/recipes-I-liked"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              מתכונים שאהבתי
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              אודות
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add-recipe"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              הוסף מתכון
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/profile"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              פרופיל
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link login-button"
              onClick={() => setIsMenuOpen(false)}
            >
              התחבר
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
