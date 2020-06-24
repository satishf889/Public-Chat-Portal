import React from "react";
import "./ChatMessage.css";

export default function ChatMessage({ message }) {
  return (
    <div className="bot-message">
      <span className="chat-username">satishf889</span>
      <span>{message}</span>
      <span className="message-time">19.05pm</span>
    </div>
  );
}
