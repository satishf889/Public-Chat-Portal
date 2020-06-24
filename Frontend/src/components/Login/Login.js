import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./Login.css";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

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

export default function Login() {
  const classes = useStyles();
  return (
    <div className="root">
      <h1>LOGIN PAGE</h1>
      <TextField
        id="outlined-full-width"
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
      />
      <TextField
        id="outlined-full-width"
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
      />
      <Button variant="contained" color="primary" className={classes.button}>
        LOGIN
      </Button>
    </div>
  );
}
