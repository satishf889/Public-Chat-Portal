import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import "./Login.css";
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
    <div className="container-fluid p-0">
      <div className="row h-100">
        {/* First Half */}

        <div className="col-md-6 col-sm-12">
          <div className="card">
            <img
              className="card-img vh-100"
              src="https://www.free-mockup.com/wp-content/uploads/edd/2018/12/Vertical-Envelope-Free-Mockup-1000x750.jpg"
              alt="Card image"
            />
            <div className="card-img-overlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                class="bi bi-envelope"
                className="card-text text-white"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Second Half */}
        <div className="col-md-6 col-sm-12 vh-100">
          <div className="d-flex justify-content-center">
            <h1 className="text-danger text-align-center float-right mt-3">
              LOGIN PAGE
            </h1>
          </div>

          <div className="d-flex align-items-center vh-100">
            <form
              className="p-2 w-100"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-group">
                <label for="exampleInputEmail1">Username</label>
                <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={username}
                  onChange={handleUsernameChange}
                />
                </div>
                <small id="emailHelp" className="form-text text-muted .small">
                  "Please reach out to satish.fulwani63@gmail.com"
                </small>
              </div>
              <div className="form-group mt-4">
                <label for="exampleInputPassword1">Password</label>
                <div className="col-md-8">

                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                <small id="emailHelp" className="form-text text-muted">
                  "Please reach out to satish.fulwani63@gmail.com"
                </small>
                </div>
              </div>

              <button onClick={handleLogin} className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
