import React from "react";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">College Feedback System</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#feedback">Feedback</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;