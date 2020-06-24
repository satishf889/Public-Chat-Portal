import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./Login.css";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Login({ setUserLoggedIn }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const SERVER_PATH = "/login";
  const handleUsernameChange = (event) => {
    let temp = event.target.value;
    setUsername(temp);
  };
  const handlePasswordChange = (event) => {
    let temp = event.target.value;
    setPassword(temp);
  };

  const handleLogin = async () => {
    let tempusername = username;
    let temppassword = password;
    if (tempusername.length < 1 || temppassword.length < 1) {
      setUserError("Username and Password cannot be empty");
      return;
    }
    let temp = { username: tempusername, password: temppassword };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(temp),
      redirect: "follow",
    };

    await fetch(SERVER_URL + SERVER_PATH, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.AUTH === true) {
          setUserError("");
          setUserLoggedIn(true);
        } else {
          setUserError("Wrong Credentials");
        }
      });
  };

  return (
    <div className="root">
      <h1>LOGIN PAGE</h1>
      <TextField
        label="Username"
        style={{ padding: 8 }}
        placeholder="username"
        helperText="Please reach out to satish.fulwani63@gmail.com"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        label="Password"
        style={{ padding: 8 }}
        placeholder="Password"
        helperText="Please reach out to satish.fulwani63@gmail.com"
        fullWidth
        margin="normal"
        inputProps={{
          type: "password",
        }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
      />
      <span className="user-error">{userError}</span>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleLogin}>
        LOGIN
      </Button>
    </div>
  );
}
