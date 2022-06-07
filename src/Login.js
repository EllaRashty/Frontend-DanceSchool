import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import SignIn from "./SignIn";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    color: "#610d07",
    marginBottom: 20,
  },
  field: {
    width: "80%",
  },
  loginBotton: {
    width: 120,
    height: 37,
  },
}));

const Login = (props) => {
  const { setUser } = props;

  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const space = "DanceSchool";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isEmailValid = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email && re.test(email.toLowerCase());
  };

  const isInputsValid = () => {
    return isEmailValid();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode !== 13) return;

    if (!isEmailValid()) {
      document.getElementById("email").focus();
      return;
    }

    login();
  };

  const [user, setTempUser] = useState([]);

  const login = () => {
    axios
      .get(`http://localhost:8042/twins/users/login/${space}/${email}`)
      .then((res) => {
        console.log(res);
        setTempUser(res);
        setUser(res.data);
        navigate("/userprofile");
      })
      .catch((err) =>
        alert("User don't exists!\nPlease Enter different details!")
      );
  };

  return (
    <div id="login-component" className="login-border" style={{ padding: 6, marginTop: 0 }}>
      <div id="fields-wrapper" className="login-style" style={{ padding:4, marginBottom:0 }}>
        <Typography className={classes.title} style={{ marginTop: 4}}>
          Login to your account:
        </Typography>
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

        <Button
          className={classes.loginBotton}
          disabled={!isInputsValid()}
          variant="contained"
          color="primary"
          onClick={login}
        >
          Log In
        </Button>
        <button
          className="signin-botton"
          onClick={() => {
            <SignIn setUser={setUser} />;
            navigate("/signin");
          }}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Login;
