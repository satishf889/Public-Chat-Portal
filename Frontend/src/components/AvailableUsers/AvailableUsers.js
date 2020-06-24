import React from "react";
import User from "../User/User";
import "./AvailableUsers.css";

export default function AvailableUsers({ users }) {
  return (
    <div className="maincontainer">
      <div className="usercount">
        <b>
          <span className="availableUsers">
            Online Users are {users.length}
          </span>
        </b>
      </div>
      <div className="userlist">
        {users.map((user) => {
          return <User key={user.id} user={user.username} />;
        })}
      </div>
    </div>
  );
}
