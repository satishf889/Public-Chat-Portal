import React, { useEffect, useState } from "react";
import socket from "socket.io-client";
import "./Chat.css";
import ChatScreen from "../ChatScreen/ChatScreen";

export default function Play() {
  const [socketConnection, setSocketConnection] = useState("");
  const [username, setUsername] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [userLogged, setUserLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    var url = "http://localhost:3030";
    const temp = socket(url);
    // temp.on("connectId", (res) => {
    //   console.log(res);
    // });
    // temp.emit("message");
    temp.on("allUsers", (res) => {
      setAvailableUsers(res.allUsers);
    });
    // temp.on("message", (res) => {
    //   console.log(res.message);
    // });
    setSocketConnection(temp);
    return () => temp.disconnect();
  }, []);

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };

  const setUserName = () => {
    setErrorMessage(null);
    if (username === "") {
      setErrorMessage("username cannot be empty");
      return;
    }
    let usernames = availableUsers.map((user) => user.username);
    if (usernames.indexOf(username) === -1) {
      socketConnection.emit("userName", { username });
      setUserLogged(true);
    } else {
      setErrorMessage("Username Already in use select some another username");
    }
  };

  const handleLogout = () => {
    socketConnection.disconnect();
    window.location.reload();
  };
  var messages = [
    "Hi",
    "Hello, How are you? , How are you?, How are you?,How are you?,How are you?",
    "How are you?",
    "Feeling Today",
    "Good",
    "BAD",
  ];
  return (
    <div>
      {userLogged === false && (
        <div className="username">
          <label htmlFor="name">
            Name:&nbsp;
            <input
              type="text"
              id={"name"}
              placeholder={"Enter your name..."}
              value={username}
              onChange={handleUserName}
            />
          </label>
          <div className="buttoncontainer">
            <button className="userbutton" onClick={setUserName}>
              START
            </button>
          </div>
        </div>
      )}
      {userLogged && (
        <>
          <div className="username">
            <span className="success">{username} Is Logged In</span>
            <div className="buttoncontainer">
              <button className="userbutton" onClick={handleLogout}>
                SIGN OUT
              </button>
            </div>
          </div>
          <ChatScreen users={availableUsers} messages={messages} />
        </>
      )}
      <p className="error">{errorMessage}</p>
      {/* <ul>
        {userLogged &&
          availableUsers.map((user) => {
            if (username !== user.username) {
              return <li key={user.id}>{user.username}</li>;
            }
            return null;
          })}
      </ul> */}
    </div>
  );
}
