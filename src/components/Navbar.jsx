import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">       
          {/* Navigation Links */}
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/project-one" className="nav-link">
              To-Do App
            </Link>
            <Link to="/project-two" className="nav-link">
              Weather App
            </Link>
            <Link to="/project-three" className="nav-link">
              Shopping Site
            </Link>
            <Link to="/project-four" className="nav-link">
              Chess Game
            </Link>
            <Link to="/project-five" className="nav-link">
              Project 5
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button className="hamburger-btn">
              <svg className="hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}