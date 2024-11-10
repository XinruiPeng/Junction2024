import React from "react";
import { Link } from "react-router-dom"; // For navigation between pages
import "./NavBar.css"; // You can use your CSS or inline styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/forum">
          <h2>SafeVote</h2> {/* The name or logo of your application */}
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/account" className="navbar-link">My Account</Link>
        <Link to="/activities" className="navbar-link">My Activities</Link>
      </div>
    </nav>
  );
};

export default Navbar;