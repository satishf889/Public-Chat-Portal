import React, { useState } from "react";
// import "./App.css";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Appbar from "./components/Appbar/Appbar";
function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  return (
    <div className="App">
      {/* <Appbar /> */}
      {userLoggedIn === false && <Login setUserLoggedIn={setUserLoggedIn} />}
      {userLoggedIn === true && <Chat />}
    </div>
  );
}

export default App;
