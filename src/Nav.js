import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import home from "./svgs/home.svg";
import courseIcon from "./svgs/coursesIcon.svg";
import addCourse from "./svgs/addCourse.svg";
import { getAvatarByRole } from "./UserServices";

function Nav(props) {
  const navStyle = {
    color: "white",
    fontSize: 15,
    fontWeight: 100,
    textDecoration: "none",
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

  const getAvatar = () => {
    if (!userConnect()) {
      return getAvatarByRole(user.role);
    }
  };

  return (
    <nav className="navbar">
      <h3></h3>
      <div className="nav-links">
        <Link style={navStyle} to="/" className="nav-home">
          <img
            style={{ marginTop: 5 }}
            src={home}
            alt="course IMG"
            width="90"
            height="90"
          ></img>
          <li style={{ marginBottom: 11 }}> Hello , {userName()}</li>
        </Link>
        <Link style={navStyle} to="/createcourse" className="nav-link">
          <img
            hidden={!isManager()}
            src={addCourse}
            alt="course IMG"
            width="45"
            height="45"
          ></img>
        </Link>
        <Link style={navStyle} to="/courseslist" className="nav-link">
          <img
            style={{ marginTop: 9 }}
            hidden={userConnect()}
            src={courseIcon}
            alt="course IMG"
            width="45"
            height="45"
          ></img>
        </Link>
        <Link style={navStyle} to="/userprofile" className="nav-link">
          <img
            hidden={userConnect()}
            src={getAvatar()}
            alt="course IMG"
            width="45"
            height="45"
          ></img>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
