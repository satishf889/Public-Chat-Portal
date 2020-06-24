import React from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Appbar from "./components/Appbar/Appbar";
function App() {
  return (
    <div className="App">
      <Appbar />
      {/* <Login /> */}
      <Chat />
    </div>
  );
}

export default App;
