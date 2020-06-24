import React from "react";
import "./ChatMessage.css";

export default function ChatMessage(props) {
  let { message, timeOfMsg, username } = props.message;
  return (
    <div className="bot-message">
      <span className="chat-username">{username}</span>
      <span>{message}</span>
      <span className="message-time">{timeOfMsg}</span>
    </div>
  );
}
