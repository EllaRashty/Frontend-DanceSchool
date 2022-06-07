import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  makeStyles,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Typography,
  Avatar,
} from "@material-ui/core";

import { USER_ROLES, getAvatarByRole } from "./UserServices";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
  },
  field: {
    width: "80%",
    margin: 20,
  },
  roleStyle: {},
  avatar: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 180,
    width: 56,
    height: 56,
  },
}));

const SignIn = (props) => {
  const { setUser } = props;

  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(USER_ROLES.PLAYER);
  const [avatar, setAvatar] = useState(getAvatarByRole(role));

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setAvatar(getAvatarByRole(e.target.value));
  };

  const isEmailValid = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email && re.test(email.toLowerCase());
  };

  const isUsernameValid = () => {
    return !!username;
  };

  const isInputsValid = () => {
    return isEmailValid() && isUsernameValid();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode !== 13) return;

    if (!isEmailValid()) {
      document.getElementById("email").focus();
      return;
    }

    if (!isUsernameValid()) {
      document.getElementById("username").focus();
      return;
    }

    signIn();
  };

  const signIn = async () => {
    const response = await fetch(`http://localhost:8042/twins/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        role,
        username,
        avatar: role,
      }),
    });

    if (!!response) {
      const result = await response.json();
      if (result.error) {
        alert("User already exists!\nEnter different details!");
        return;
      }
      localStorage.setItem("user", JSON.stringify(result));
      setUser(result);
      navigate("/userprofile");
    }
  };

  return (
    <div id="sign-in-component" className="user-profile-page">
      <div id="fields-wrapper">
        <Typography className={classes.title}>Create your account</Typography>

        <TextField
          className={classes.field}
          id="email"
          required
          label="Enter e-mail"
          placeholder="user@example.com"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
        />

        <TextField
          className={classes.field}
          id="username"
          required
          label="Enter username"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
          onKeyDown={handleKeyDown}
        />

        <div className={classes.field}>
          <InputLabel shrink>Role</InputLabel>
          <Select
            value={role}
            onChange={handleRoleChange}
            style={{ width: "35%", margin: 10, marginLeft: 70 }}
          >
            <MenuItem value={USER_ROLES.PLAYER}>{USER_ROLES.PLAYER}</MenuItem>
            <MenuItem value={USER_ROLES.MANAGER}>{USER_ROLES.MANAGER}</MenuItem>
            <MenuItem value={USER_ROLES.ADMIN}>{USER_ROLES.ADMIN}</MenuItem>
          </Select>
        </div>

        <div className={classes.field}>
          <InputLabel shrink>Avatar</InputLabel>
          <Avatar src={avatar} className={classes.avatar}></Avatar>
        </div>

        <Button
          disabled={!isInputsValid()}
          variant="contained"
          color="primary"
          onClick={signIn}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
