import React, { useEffect, useState } from "react";
import { IoIosPaperPlane } from "react-icons/io";
import TextField from "@material-ui/core/TextField";
import "./MainChat.css";
import ChatMessage from "../ChatMessage/ChatMessage";
import { animateScroll } from "react-scroll";

export default function MainChat({
  messages,
  handleMessage,
  userJoinNotification,
  handleTyping,
  handleStopTyping,
  userTypeNotification,
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const scrollToBottom = () => {
      animateScroll.scrollToBottom({
        containerId: "chatBox",
      });
    };
    scrollToBottom();
  }, [messages]);

  const handleTextField = (event) => {
    handleTyping();
    let temp = event.target.value;
    setMessage(temp);
  };

  const handleSend = () => {
    handleMessage(message);
    handleStopTyping();
    setMessage("");
  };

  return (
    <>
      <div className="chat-screen">
        <span>24th June,2020</span>
        <div className="chat-box" id="chatBox">
          {messages.map((mess, index) => {
            return <ChatMessage key={index} message={mess} />;
          })}
          {userJoinNotification && (
            <span className="userUpdate">
              {userJoinNotification} joined the chat
            </span>
          )}
          {userTypeNotification && (
            <span className="userUpdate">
              {userTypeNotification} is typing...
            </span>
          )}
        </div>
        <div className="input">
          <TextField
            className="message-box"
            placeholder="Write message"
            multiline={true}
            rows="2"
            value={message}
            onChange={handleTextField}
            color="white"
            style={{
              transition: "false",
            }}
          />
          <div
            style={{
              color: "black",
              margin: "auto",
            }}>
            <IoIosPaperPlane
              size={32}
              className="send-button"
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </>
  );
}
