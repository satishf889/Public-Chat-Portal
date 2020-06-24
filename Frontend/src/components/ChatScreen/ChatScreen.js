import React from "react";
import "./ChatScreen.css";
import AvailableUsers from "../AvailableUsers/AvailableUsers";
import MainChat from "../MainChat/MainChat";

export default function ChatScreen({ users, messages }) {
  return (
    <div className="section">
      <div className="container">
        <AvailableUsers users={users} />
      </div>
      <div className="container">
        <MainChat messages={messages} />
      </div>
    </div>
  );
}
