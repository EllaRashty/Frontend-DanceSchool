import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import home from "./svgs/home.svg";
import profile from "./svgs/profile.svg";
import courseIcon from "./svgs/coursesIcon.svg";
import addCourse from "./svgs/addCourse.svg";

function Nav(props) {
  const navStyle = {
    color: "white",
  };

  const { user } = props;

  const isManager = () => {
    if (!userConnect() && user.role === "MANAGER") {
      return true;
    }
    return false;
  };

  const userConnect = () => {
    if (user === null) {
      return true;
    }
    return false;
  };

  const userName = () => {
    if (!userConnect()) {
      return user.username;
    }
    return "user";
  };

  return (
    <nav className="navbar">
      <h3></h3>
      <div className="nav-links">
        <Link style={navStyle} to="/" className="nav-home">
          <img src={home} alt="course IMG" width="50" height="50"></img>
          <li style={{ padding: 20 }}> Hello , {userName()}</li>
        </Link>

        <Link style={navStyle} to="/createcourse" className="nav-link">
          <img
            hidden={!isManager()}
            src={addCourse}
            alt="course IMG"
            width="50"
            height="50"
          ></img>
        </Link>
        <Link style={navStyle} to="/courseslist" className="nav-link">
          <img src={courseIcon} alt="course IMG" width="50" height="50"></img>
        </Link>
        <Link style={navStyle} to="/userprofile" className="nav-link">
          <img
            hidden={userConnect()}
            src={profile}
            alt="course IMG"
            width="50"
            height="50"
          ></img>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
