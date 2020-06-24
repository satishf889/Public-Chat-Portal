import React, { useState } from "react";
import { IoIosPaperPlane } from "react-icons/io";
import TextField from "@material-ui/core/TextField";
import "./MainChat.css";
import ChatMessage from "../ChatMessage/ChatMessage";

export default function MainChat({ messages }) {
  const [message, setMessage] = useState("");
  const handleTextField = (event) => {
    let temp = event.target.value;
    setMessage(temp);
  };

  const handleSend = () => {};

  return (
    <>
      <div className="chat-screen">
        <span>24th June,2020</span>
        <div className="chat-box">
          {messages.map((mess, index) => {
            return <ChatMessage key={index} message={mess} />;
          })}
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
