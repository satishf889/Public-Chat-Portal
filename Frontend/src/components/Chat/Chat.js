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
  const [messages, setMessages] = useState([]);
  const [userJoinNotification, setUserJoinNotification] = useState("");
  const [userTypeNotification, setUserTypeNotification] = useState("");

  useEffect(() => {
    try {
      var url = "http://localhost:3030";
      const temp = socket(url);
      // temp.on("connectId", (res) => {
      //   console.log(res);
      // });
      // temp.emit("message");
      temp.on("allUsers", (res) => {
        setAvailableUsers(res.allUsers);
      });
      temp.on("userUpdate", (res) => {
        // console.log(res.username);
        if (res !== null) {
          setUserJoinNotification(res.username);
        } else {
          setUserJoinNotification(undefined);
        }
      });

      temp.on("userTypeUpdate", (res) => {
        if (res !== null) {
          setUserTypeNotification(res.username);
        } else {
          setUserTypeNotification(undefined);
        }
      });

      temp.on("newMessage", (res) => {
        console.log(res);
        let { message, username, timeOfMsg } = res.res;
        let tempMessage = {
          message,
          username,
          timeOfMsg,
        };
        setMessages((messages) => [...messages, tempMessage]);
      });
      setSocketConnection(temp);
      return () => temp.disconnect();
    } catch {
      throw new Error("Server Not responding");
    }
  }, []);

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };

  const handleTyping = () => {
    socketConnection.emit("userTyping", { username });
  };

  const handleStopTyping = () => {
    socketConnection.emit("userTypingStop", { username });
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

  const handleMessage = (usermessage) => {
    let message = {
      username,
      message: usermessage,
    };
    socketConnection.emit("message", message);
  };

  const handleLogout = () => {
    socketConnection.disconnect();
    window.location.reload();
  };
  // var messages = [
  //   { message: "Hi", timeOfMsg: "2:01 pm" },
  //   {
  //     message:
  //       "Hello,How are you? , How are you?, How are you?,How are you?,How are you?",
  //     timeOfMsg: "2:01 pm",
  //   },
  //   { message: "How are you?", timeOfMsg: "2:01 pm" },
  //   { message: "Feeling Today", timeOfMsg: "2:01 pm" },
  //   { message: "Good", timeOfMsg: "2:01 pm" },
  //   { message: "BAD", timeOfMsg: "2:01 pm" },
  // ];
  return (
    <div>
      {userLogged === false && (
        <div className="username">
          <label htmlFor="name">
            Username:&nbsp;
            <input
              type="text"
              id={"name"}
              placeholder={"Enter your username..."}
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
          <ChatScreen
            users={availableUsers}
            messages={messages}
            handleMessage={handleMessage}
            userJoinNotification={userJoinNotification}
            handleTyping={handleTyping}
            userTypeNotification={userTypeNotification}
            handleStopTyping={handleStopTyping}
          />
        </>
      )}
      <p className="error">{errorMessage}</p>
    </div>
  );
}
