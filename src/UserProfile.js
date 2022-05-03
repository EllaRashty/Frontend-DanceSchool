import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, makeStyles, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import WarnButton from "./WarnButton";
import { getAvatarByRole } from "./UserServices";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: 24,
  },
  attrName: {
    color: "#757575",
    fontSize: 18,
    fontWeight: 200,
    margin: 14,
  },
  avatar: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 70,
    width: 56,
    height: 56,
  },
  logoutBotton: {
    marginTop: 20,
    marginBottom: 16,
    width: 200,
  },
}));

const UserProfile = (props) => {
  const { user, setUser } = props;

  const { userId, username, avatar, role } = user;
  const { space, email } = userId;

  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    localStorage.setItem("user", null);
    setUser(null);
    navigate("/home");
  };

  return (
    <div id="user-profile-component">
      <Typography className={classes.header} variant="h4">
        User Profile
      </Typography>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"Username"}</Typography>
        <Typography className={classes.attrValue}>{username}</Typography>
      </div>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"E-mail"}</Typography>
        <Typography className={classes.attrValue}>{email}</Typography>
      </div>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"Space"}</Typography>
        <Typography className={classes.attrValue}>{space}</Typography>
      </div>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"Avatar"}</Typography>
        <Avatar
          src={getAvatarByRole(avatar)}
          className={classes.avatar}
        ></Avatar>
      </div>

      <div className="attr-wrapper">
        <Typography className={classes.attrName}>{"Role"}</Typography>
        <Typography className={classes.attrValue}>{role}</Typography>
      </div>

      <WarnButton
        className={classes.logoutBotton}
        startIcon={<ExitToApp />}
        variant="contained"
        onClick={logout}
      >
        Log Out
      </WarnButton>
    </div>
  );
};

export default UserProfile;

// const UserTemp = (props) => {
//   const [user, setUser] = useState([]);
//   // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

//   // const userEmail = "eli@gmail.com";
//   const fetchUser = () => {
//     //   axios
//     //     .get(`http://localhost:8042/twins/users/login/DanceSchool/${userEmail}`)
//     //     .then((res) => {
//     // console.log(res);
//     setUser(props.user.user);
//     console.log(props.user);
//     //     });
//   };
//   useEffect(() => {
//     fetchUser();
//   }, []);
//   console.log(user);
//   return (
//     <div key={user.userId} className="user-data">
//       <h2>avatar: {user.avatar}</h2>
//       <h3>user name: {user.username}</h3>
//       <h3>role: {user.role}</h3>
//     </div>
//   );
// };

// const UserProfile = (user) => {
//   return (
//     <div>
//       {/* <h1>Error</h1> */}
//       <UserTemp user={user} className={"user-data"} />
//     </div>
//   );
// };

// export default UserProfile;
