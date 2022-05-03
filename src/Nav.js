import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  const navStyle = {
    color: "white",
  };

  return (
    <nav>
      <h3></h3>
      <ul className="nav-links">
        <Link style={navStyle} to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link style={navStyle} to="/login" className="nav-link">
          <li>Login</li>
        </Link>
        <Link style={navStyle} to="/signin" className="nav-link">
          <li>Sign In</li>
        </Link>
        <Link style={navStyle} to="/userprofile" className="nav-link">
          <li>User Profile</li>
        </Link>
        <Link style={navStyle} to="/createcourse" className="nav-link">
          <li>Create Course</li>
        </Link>
        <Link style={navStyle} to="/courseslist" className="nav-link">
          <li>Courses List</li>
        </Link>
        <Link style={navStyle} to="/course" className="nav-link">
          <li>Course</li>
        </Link>
        <Link style={navStyle} to="/updatecourse" className="nav-link">
          <li>Update Course</li>
        </Link>
        {/* <Link style={navStyle} to="/wordchoosing">
          <li>word choosing</li>
        </Link>
        <Link style={navStyle} to="/waitingview">
          <li>waiting</li>
        </Link>
        <Link style={navStyle} to="/guessingpage">
          <li>guessing page</li>
        </Link> */}
      </ul>
    </nav>
  );
}

export default Nav;
