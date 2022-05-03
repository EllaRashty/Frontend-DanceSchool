import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    color: "#610d07",
    marginBottom: 16,
  },
  field: {
    width: "80%",
  },
  loginBotton: {
    marginTop: 40,
    marginBottom: 16,
    width: 120,
  },
}));

// const LoginComponent = (props) => {
const Login = (props) => {
  const { setUser } = props;

  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  // const [space, setSpace] = useState("");
  const space = "DanceSchool";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // const handleSpaceChange = (e) => {
  //   setSpace(e.target.value);
  // };

  const isEmailValid = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email && re.test(email.toLowerCase());
  };

  // const isSpaceValid = () => {
  //   return !!space;
  // };

  const isInputsValid = () => {
    // return isEmailValid() && isSpaceValid();
    return isEmailValid();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode !== 13) return;

    if (!isEmailValid()) {
      document.getElementById("email").focus();
      return;
    }

    // if (!isSpaceValid()) {
    //   document.getElementById("space").focus();
    //   return;
    // }

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
      });
    // const result = user.json();
    // if (user.error) {
    //   alert("No user with these details!");
    //   return;
    // }
    // localStorage.setItem("user", JSON.stringify(result));
    // console.log(result);
    // setUser(result);
    // navigate("/home");
  };

  // const login = async () => {
  //   const response = await fetch(
  //     `${process.env.API_ENDPOINT}/twins/users/login/${space}/${email}`
  //   );

  //   if (!!response) {
  //     const result = await response.json();
  //     if (result.error) {
  //       alert("No user with these details!");
  //       return;
  //     }
  //     localStorage.setItem("user", JSON.stringify(result));
  //     console.log(result);
  //     // setUser(result);
  //     // navigate("/home");
  //   }
  // };

  return (
    <div id="login-component">
      <div id="fields-wrapper">
        <Typography className={classes.title}>Login to your account</Typography>
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

        {/* <TextField
          className={classes.field}
          id="space"
          required
          label="Enter space"
          placeholder="space"
          value={space}
          onChange={handleSpaceChange}
          onKeyDown={handleKeyDown}
        /> */}

        <Button
          className={classes.loginBotton}
          disabled={!isInputsValid()}
          variant="contained"
          color="primary"
          onClick={login}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Login;
